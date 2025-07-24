# Supabase 설정 가이드

## 🚀 Supabase 프로젝트 생성

### 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 접속
2. **New Project** 클릭
3. 프로젝트 설정:
   - **Name**: `fashion-docs`
   - **Database Password**: 안전한 비밀번호 설정
   - **Region**: `Asia Pacific (Singapore)` 또는 가까운 지역
4. **Create new project** 클릭

### 2. 프로젝트 정보 확인

1. **Settings** → **API** 클릭
2. 다음 정보를 복사:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 📊 데이터베이스 스키마 설정

### 1. SQL 에디터에서 테이블 생성

```sql
-- 사용자 테이블 (Clerk과 연동)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 작업지시서 테이블
CREATE TABLE work_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  category TEXT,
  brand TEXT,
  item TEXT,
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 파일 테이블
CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  work_order_id UUID REFERENCES work_orders(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT,
  file_size INTEGER,
  mime_type TEXT,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 설정
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- 사용자별 데이터 접근 정책
CREATE POLICY "Users can view own data" ON users
  FOR ALL USING (clerk_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can view own work orders" ON work_orders
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
  ));

CREATE POLICY "Users can view own files" ON files
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
  ));
```

### 2. Storage 버킷 생성

1. **Storage** → **Buckets** 클릭
2. **New bucket** 클릭
3. 설정:
   - **Name**: `fashion-docs`
   - **Public bucket**: 체크
   - **File size limit**: `50MB`
   - **Allowed MIME types**: `image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`

## 🔧 환경 변수 설정

### 1. 로컬 개발 환경

`.env.local` 파일에 추가:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Vercel 환경 변수

Vercel 대시보드 → **Settings** → **Environment Variables**에서 설정:

**Production 환경:**
- `NEXT_PUBLIC_SUPABASE_URL`: `https://your-project-id.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `your_anon_key_here`

**Preview 환경:**
- `NEXT_PUBLIC_SUPABASE_URL`: `https://your-project-id.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `your_anon_key_here`

**Development 환경:**
- `NEXT_PUBLIC_SUPABASE_URL`: `https://your-project-id.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `your_anon_key_here`

## 🔄 코드 업데이트

### 1. Supabase 클라이언트 활성화

`src/lib/supabase.ts` 파일을 다음과 같이 수정:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 2. API 라우트 활성화

환경 변수 설정 후 API 라우트들을 다시 활성화:

- `src/app/api/upload/route.ts`
- `src/app/api/work-orders/route.ts`
- `src/app/api/work-orders/[id]/route.ts`

## 🧪 테스트

### 1. 로컬 테스트

```bash
npm run dev
```

### 2. 데이터베이스 연결 테스트

Supabase 대시보드 → **Table Editor**에서 데이터 확인

## 📊 모니터링

### 1. Supabase 대시보드

- **Database**: 테이블 및 데이터 확인
- **Storage**: 파일 업로드 확인
- **Logs**: API 호출 로그 확인

### 2. Vercel 로그

- **Functions**: API 라우트 실행 로그
- **Build Logs**: 배포 시 빌드 로그

---

**참고**: 환경 변수 설정 후 애플리케이션을 재시작해야 변경사항이 적용됩니다. 