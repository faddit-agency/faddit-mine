# Vercel Secrets 설정 가이드

## 🔐 Vercel 토큰 생성

### 1. Vercel Personal Access Token 생성

1. [Vercel Account Tokens](https://vercel.com/account/tokens) 접속
2. **Create Token** 클릭
3. 토큰 설정:
   - **Token Name**: `GitHub Actions`
   - **Expiration**: `No expiration` (또는 90일)
   - **Scope**: `Full Account` 선택
4. **Create** 클릭
5. **토큰을 안전한 곳에 복사** (한 번만 표시됨)

## 🔧 GitHub Secrets 설정

### 1. GitHub 저장소 Secrets 설정

1. [GitHub 저장소](https://github.com/faddit-agency/faddit-mine) 접속
2. **Settings** 탭 클릭
3. **Secrets and variables** → **Actions** 클릭
4. **New repository secret** 클릭하여 다음 Secrets 추가:

#### 필수 Secrets

```
VERCEL_TOKEN: [Vercel에서 생성한 토큰]
VERCEL_ORG_ID: jay-1346s-projects
VERCEL_PROJECT_ID: prj_kaYfWoQfIHG228ciAyRZyG1TUAqY
```

#### Supabase 환경 변수
```
NEXT_PUBLIC_SUPABASE_URL: [Supabase 프로젝트 URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY: [Supabase Anon Key]
```

#### Clerk 환경 변수
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: [Clerk Publishable Key]
CLERK_SECRET_KEY: [Clerk Secret Key]
```

#### 기타 환경 변수
```
NEXT_PUBLIC_APP_URL: https://faddit-mine-jay-1346s-projects.vercel.app
```

### 2. Secrets 추가 방법

1. **VERCEL_TOKEN**:
   - Name: `VERCEL_TOKEN`
   - Value: Vercel에서 생성한 Personal Access Token

2. **VERCEL_ORG_ID**:
   - Name: `VERCEL_ORG_ID`
   - Value: `jay-1346s-projects`

3. **VERCEL_PROJECT_ID**:
   - Name: `VERCEL_PROJECT_ID`
   - Value: `prj_kaYfWoQfIHG228ciAyRZyG1TUAqY`

4. **NEXT_PUBLIC_SUPABASE_URL**:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Supabase 프로젝트 설정에서 확인

5. **NEXT_PUBLIC_SUPABASE_ANON_KEY**:
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Supabase 프로젝트 설정에서 확인

6. **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**:
   - Name: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Value: Clerk 대시보드에서 확인

7. **CLERK_SECRET_KEY**:
   - Name: `CLERK_SECRET_KEY`
   - Value: Clerk 대시보드에서 확인

8. **NEXT_PUBLIC_APP_URL**:
   - Name: `NEXT_PUBLIC_APP_URL`
   - Value: `https://faddit-mine-jay-1346s-projects.vercel.app`

## 🔍 Vercel 프로젝트 정보 확인

### 프로젝트 정보
- **프로젝트 이름**: `faddit-mine`
- **프로젝트 ID**: `prj_kaYfWoQfIHG228ciAyRZyG1TUAqY`
- **조직 ID**: `jay-1346s-projects`
- **배포 URL**: https://faddit-mine-jay-1346s-projects.vercel.app

### 확인 명령어
```bash
# 프로젝트 목록 확인
npx vercel project ls

# 프로젝트 상세 정보 확인
npx vercel project inspect faddit-mine
```

## 🚀 자동 배포 테스트

### 1. 테스트 커밋 생성

```bash
# 테스트 파일 생성
echo "# Test Deployment" > test-deployment.md

# 커밋 및 푸시
git add test-deployment.md
git commit -m "Test: GitHub Actions deployment"
git push origin main
```

### 2. 배포 상태 확인

1. **GitHub Actions** 탭에서 워크플로우 상태 확인
2. **Vercel 대시보드**에서 배포 상태 확인
3. **배포 URL**: https://faddit-mine-jay-1346s-projects.vercel.app

## 🔍 문제 해결

### GitHub Actions 실패 시

#### 1. Secrets 확인
- GitHub 저장소 → Settings → Secrets and variables → Actions
- 모든 필수 Secrets가 올바르게 설정되었는지 확인

#### 2. Vercel 토큰 권한 확인
- [Vercel Account Tokens](https://vercel.com/account/tokens)에서 토큰 상태 확인
- 토큰이 만료되지 않았는지 확인

#### 3. 프로젝트 ID 확인
```bash
# Vercel CLI로 프로젝트 정보 확인
vercel project ls
vercel project inspect faddit-mine
```

### 배포 실패 시

#### 1. 빌드 로그 확인
- GitHub Actions → 워크플로우 → 빌드 단계 로그 확인
- Vercel 대시보드 → Deployments → 빌드 로그 확인

#### 2. 환경 변수 확인
- Vercel 대시보드 → Settings → Environment Variables
- 필요한 환경 변수가 설정되었는지 확인

## 📊 배포 모니터링

### GitHub Actions 모니터링
- **워크플로우 실행**: main 브랜치 푸시 시 자동 실행
- **테스트 단계**: 린팅, 빌드 테스트
- **배포 단계**: main 브랜치에서만 실행

### Vercel 배포 모니터링
- **Production**: main 브랜치 푸시 시 자동 배포
- **Preview**: Pull Request 시 자동 배포
- **Analytics**: 배포 성능 및 오류 모니터링

## 🔄 배포 워크플로우

### 자동 배포 프로세스
1. **코드 푸시** → GitHub 저장소
2. **GitHub Actions** → 자동 테스트 및 빌드
3. **Vercel 배포** → 자동 배포 실행
4. **배포 완료** → 새로운 버전 라이브

### 수동 배포 (필요시)
```bash
# Vercel CLI로 수동 배포
vercel --prod

# 또는 특정 환경으로 배포
vercel --prod --env production
```

## 🎯 완료 확인

### ✅ 설정 완료 체크리스트

- [ ] GitHub 저장소 생성 및 연결
- [ ] GitHub Actions 워크플로우 설정
- [ ] Vercel Personal Access Token 생성
- [ ] GitHub Secrets 설정 (8개)
- [ ] Supabase 프로젝트 설정
- [ ] Clerk 프로젝트 설정
- [ ] 테스트 배포 성공
- [ ] 자동 배포 확인

### 🚀 배포 URL
- **Production**: https://faddit-mine-jay-1346s-projects.vercel.app
- **GitHub 저장소**: https://github.com/faddit-agency/faddit-mine
- **Vercel 대시보드**: https://vercel.com/jay-1346s-projects/faddit-mine

---

**참고**: 이 설정이 완료되면 main 브랜치에 푸시할 때마다 자동으로 배포됩니다. 