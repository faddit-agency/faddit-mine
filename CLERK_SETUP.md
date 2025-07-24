# Clerk 인증 설정 가이드

## 🚀 Clerk 프로젝트 생성

### 1. Clerk 프로젝트 생성

1. [Clerk Dashboard](https://dashboard.clerk.com) 접속
2. **Add application** 클릭
3. 프로젝트 설정:
   - **Application name**: `Fashion Docs`
   - **Application type**: `Next.js`
4. **Create application** 클릭

### 2. 프로젝트 정보 확인

1. **API Keys** 탭 클릭
2. 다음 정보를 복사:
   - **Publishable Key**: `pk_test_...`
   - **Secret Key**: `sk_test_...`

## 🔧 환경 변수 설정

### 1. 로컬 개발 환경

`.env.local` 파일에 추가:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### 2. Vercel 환경 변수

Vercel 대시보드 → **Settings** → **Environment Variables**에서 설정:

**Production 환경:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: `pk_test_your_publishable_key_here`
- `CLERK_SECRET_KEY`: `sk_test_your_secret_key_here`

**Preview 환경:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: `pk_test_your_publishable_key_here`
- `CLERK_SECRET_KEY`: `sk_test_your_secret_key_here`

**Development 환경:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: `pk_test_your_publishable_key_here`
- `CLERK_SECRET_KEY`: `sk_test_your_secret_key_here`

## 🔄 코드 업데이트

### 1. Clerk Provider 활성화

`src/app/layout.tsx` 파일을 다음과 같이 수정:

```typescript
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fashion Docs - WiiVE",
  description: "Fashion Design Documentation System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="ko" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### 2. 컴포넌트 업데이트

`src/components/drive-page.tsx`에서 Clerk 기능 활성화:

```typescript
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";

export function DrivePage() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) {
    return <div>로딩 중...</div>;
  }
  
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Fashion Docs에 오신 것을 환영합니다</h1>
          <p className="text-muted-foreground mb-6">패션 디자인 문서화 시스템을 사용하려면 로그인해주세요.</p>
          <SignInButton>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              로그인
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }
  
  // 기존 컴포넌트 내용...
}
```

### 3. API 라우트 업데이트

환경 변수 설정 후 API 라우트들을 다시 활성화:

```typescript
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 기존 로직...
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## 🔐 인증 설정

### 1. Clerk 대시보드 설정

1. **User & Authentication** → **Email, Phone, Username**
2. **Email address** 활성화
3. **Social connections** 설정 (선택사항):
   - Google
   - GitHub
   - Apple

### 2. 사용자 관리

1. **Users** 탭에서 사용자 확인
2. **User profile** 설정
3. **Roles & permissions** 설정 (필요시)

## 🧪 테스트

### 1. 로컬 테스트

```bash
npm run dev
```

### 2. 인증 플로우 테스트

1. 애플리케이션 접속
2. 로그인 버튼 클릭
3. 이메일/비밀번호 또는 소셜 로그인 테스트
4. 로그아웃 테스트

## 📊 모니터링

### 1. Clerk 대시보드

- **Users**: 사용자 관리
- **Sessions**: 세션 관리
- **Logs**: 인증 로그 확인

### 2. Vercel 로그

- **Functions**: API 라우트 실행 로그
- **Build Logs**: 배포 시 빌드 로그

## 🔒 보안 설정

### 1. 도메인 설정

Clerk 대시보드 → **Domains**에서 허용된 도메인 설정:

**Development:**
- `http://localhost:3000`

**Production:**
- `https://faddit-mine-jay-1346s-projects.vercel.app`

### 2. 환경별 키 관리

- **Development**: `pk_test_...`, `sk_test_...`
- **Production**: `pk_live_...`, `sk_live_...`

---

**참고**: 환경 변수 설정 후 애플리케이션을 재시작해야 변경사항이 적용됩니다. 