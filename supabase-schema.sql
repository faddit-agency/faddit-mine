-- 사용자 테이블 (Clerk와 연동)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 작업 주문 테이블
CREATE TABLE IF NOT EXISTS work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to UUID REFERENCES users(id),
  created_by UUID REFERENCES users(id),
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 파일 테이블
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- 사용자 정책
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- 작업 주문 정책
CREATE POLICY "Users can view work orders they created or are assigned to" ON work_orders
  FOR SELECT USING (
    created_by IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
    OR assigned_to IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
  );

CREATE POLICY "Users can create work orders" ON work_orders
  FOR INSERT WITH CHECK (
    created_by IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
  );

CREATE POLICY "Users can update work orders they created or are assigned to" ON work_orders
  FOR UPDATE USING (
    created_by IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
    OR assigned_to IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
  );

-- 파일 정책
CREATE POLICY "Users can view files for work orders they have access to" ON files
  FOR SELECT USING (
    work_order_id IN (
      SELECT id FROM work_orders WHERE 
        created_by IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
        OR assigned_to IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
    )
  );

CREATE POLICY "Users can upload files to work orders they have access to" ON files
  FOR INSERT WITH CHECK (
    work_order_id IN (
      SELECT id FROM work_orders WHERE 
        created_by IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
        OR assigned_to IN (SELECT id FROM users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')
    )
  );

-- Storage 버킷 생성
INSERT INTO storage.buckets (id, name, public) VALUES ('work-order-files', 'work-order-files', true);

-- Storage 정책
CREATE POLICY "Users can view files in work-order-files bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'work-order-files');

CREATE POLICY "Users can upload files to work-order-files bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'work-order-files');

CREATE POLICY "Users can update files in work-order-files bucket" ON storage.objects
  FOR UPDATE USING (bucket_id = 'work-order-files');

CREATE POLICY "Users can delete files in work-order-files bucket" ON storage.objects
  FOR DELETE USING (bucket_id = 'work-order-files'); 