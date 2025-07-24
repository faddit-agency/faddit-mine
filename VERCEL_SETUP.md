# Vercel 설정 가이드

## 🚀 배포 완료!

프로젝트가 성공적으로 Vercel에 배포되었습니다.

### 📍 배포 URL
- **Production**: https://faddit-mine-jay-1346-jay-1346s-projects.vercel.app
- **Dashboard**: https://vercel.com/jay-1346s-projects/faddit-mine

## 🔧 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수들을 설정해야 합니다:

### 1. Vercel 대시보드 접속
1. https://vercel.com/jay-1346s-projects/faddit-mine 접속
2. **Settings** 탭 클릭
3. **Environment Variables** 섹션으로 이동

### 2. Supabase 환경 변수 추가

#### NEXT_PUBLIC_SUPABASE_URL
- **Value**: `https://your-project-ref.supabase.co`
- **Environment**: Production, Preview, Development

#### NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Value**: `your-supabase-anon-key`
- **Environment**: Production, Preview, Development

### 3. Clerk 환경 변수 추가

#### NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- **Value**: `pk_test_...` 또는 `pk_live_...`
- **Environment**: Production, Preview, Development

#### CLERK_SECRET_KEY
- **Value**: `sk_test_...` 또는 `sk_live_...`
- **Environment**: Production, Preview, Development

## 📋 설정 단계

### 1. Supabase 설정 확인
1. Supabase 프로젝트 대시보드 접속
2. **Settings** > **API** 메뉴로 이동
3. **Project URL**과 **anon public** 키 복사

### 2. Clerk 설정 확인
1. Clerk 대시보드 접속
2. **API Keys** 섹션에서 키들 확인
3. **Publishable Key**와 **Secret Key** 복사

### 3. Vercel 환경 변수 설정
1. Vercel 대시보드에서 **Environment Variables** 추가
2. 각 변수를 **Production**, **Preview**, **Development** 환경에 모두 추가
3. **Save** 클릭

### 4. 재배포
환경 변수 설정 후 자동으로 재배포됩니다. 만약 수동으로 재배포하려면:

```bash
vercel --prod
```

## 🔍 문제 해결

### 환경 변수가 적용되지 않는 경우
1. Vercel 대시보드에서 **Deployments** 탭 확인
2. 최신 배포를 **Redeploy** 클릭
3. 환경 변수가 올바르게 설정되었는지 확인

### 빌드 오류가 발생하는 경우
1. **Functions** 탭에서 오류 로그 확인
2. 환경 변수 이름과 값이 정확한지 확인
3. Supabase와 Clerk 설정이 올바른지 확인

## 📊 모니터링

### Vercel 대시보드 기능
- **Analytics**: 트래픽 및 성능 모니터링
- **Functions**: 서버리스 함수 로그
- **Settings**: 도메인, 환경 변수, 빌드 설정 관리

### 자동 배포
- GitHub 저장소와 연결하면 자동 배포 활성화
- `main` 브랜치에 푸시할 때마다 자동 배포
- Pull Request마다 Preview 배포 생성

## 🎯 다음 단계

1. **환경 변수 설정 완료**
2. **도메인 설정** (선택사항)
3. **GitHub 연동** (자동 배포)
4. **모니터링 설정**

---

**배포 URL**: https://faddit-mine-jay-1346-jay-1346s-projects.vercel.app
**대시보드**: https://vercel.com/jay-1346s-projects/faddit-mine 