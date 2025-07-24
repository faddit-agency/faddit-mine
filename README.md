# Fashion Docs - WiiVE

패션 디자인 문서화 시스템으로, Next.js, Supabase, Clerk, Vercel을 활용한 현대적인 웹 애플리케이션입니다.

## 🚀 기술 스택

### Frontend
- **Next.js 14** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **next-themes** - 다크/라이트 모드 지원

### Backend & Database
- **Supabase** - PostgreSQL 기반 백엔드 서비스
  - 실시간 데이터베이스
  - 파일 스토리지
  - 인증 및 권한 관리
- **Clerk** - 사용자 인증 및 관리
- **Vercel** - 배포 및 호스팅

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **TypeScript** - 정적 타입 검사

## 📁 프로젝트 구조

```
fashion-docs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 라우트
│   │   │   ├── work-orders/   # 작업지시서 API
│   │   │   └── upload/        # 파일 업로드 API
│   │   ├── work-order/        # 작업지시서 페이지
│   │   ├── globals.css        # 전역 스타일
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   └── page.tsx           # 메인 페이지
│   ├── components/            # 재사용 컴포넌트
│   │   ├── ui/               # shadcn/ui 컴포넌트
│   │   ├── drive-page.tsx    # 드라이브 페이지
│   │   ├── work-order-detail.tsx # 작업지시서 상세
│   │   └── theme-provider.tsx # 테마 프로바이더
│   └── lib/                  # 유틸리티
│       └── supabase.ts       # Supabase 클라이언트
├── public/                   # 정적 파일
├── .env.local               # 환경 변수 (로컬)
├── package.json             # 프로젝트 설정
├── tailwind.config.js       # Tailwind 설정
├── tsconfig.json           # TypeScript 설정
└── README.md               # 프로젝트 문서
```

## 🛠️ 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd fashion-docs
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Clerk 설정
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Vercel 설정 (배포 시)
NEXT_PUBLIC_VERCEL_URL=your_vercel_url
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 🎯 주요 기능

### 🔐 인증 시스템
- **Clerk**를 통한 소셜 로그인 (Google, GitHub 등)
- 사용자 프로필 관리
- 세션 관리 및 보안

### 📁 드라이브 시스템
- 파일 및 폴더 관리
- 그리드/리스트 뷰 전환
- 파일 검색 및 필터링
- 드래그 앤 드롭 업로드

### 📋 작업지시서 관리
- 작업지시서 생성 및 편집
- 파일 첨부 기능
- 상태 관리 (진행 중, 완료 등)
- 카테고리별 분류

### 🎨 UI/UX 특징
- **다크/라이트 모드** 지원
- 반응형 디자인
- 모던한 UI 컴포넌트
- 직관적인 네비게이션

### 📊 데이터 관리
- **Supabase** 실시간 데이터베이스
- 파일 스토리지 (Supabase Storage)
- 자동 백업 및 복구
- 확장 가능한 아키텍처

## 🚀 배포

### Vercel 배포
1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포 활성화

### 환경 변수 설정 (Vercel)
- Supabase URL 및 API 키
- Clerk Publishable Key 및 Secret Key
- 기타 필요한 환경 변수

## 🔧 개발 가이드

### 코드 스타일
- TypeScript 사용
- ESLint 규칙 준수
- Prettier 자동 포맷팅
- 컴포넌트 기반 아키텍처

### 데이터베이스 스키마
```sql
-- 작업지시서 테이블
CREATE TABLE work_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  brand TEXT,
  item TEXT,
  category TEXT,
  status TEXT DEFAULT 'draft',
  basic_info JSONB,
  additional_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 파일 테이블
CREATE TABLE files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  work_order_id UUID REFERENCES work_orders(id),
  file_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### API 엔드포인트
- `GET /api/work-orders` - 작업지시서 목록 조회
- `POST /api/work-orders` - 작업지시서 생성
- `GET /api/work-orders/[id]` - 작업지시서 상세 조회
- `PUT /api/work-orders/[id]` - 작업지시서 수정
- `DELETE /api/work-orders/[id]` - 작업지시서 삭제
- `POST /api/upload` - 파일 업로드

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 링크: [https://github.com/your-username/fashion-docs](https://github.com/your-username/fashion-docs)

---

**Fashion Docs** - WiiVE의 창의적인 발상의 전환을 위한 패션 디자인 문서화 시스템입니다. 