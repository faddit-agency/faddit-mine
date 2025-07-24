# GitHub 저장소 설정 가이드

## 🚀 GitHub 저장소 생성 및 연결

### 1. GitHub에서 새 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. **New repository** 클릭
3. 저장소 설정:
   - **Repository name**: `fashion-docs`
   - **Description**: Fashion Design Documentation System
   - **Visibility**: Public 또는 Private (선택)
   - **Initialize with**: 체크하지 않음 (이미 로컬에 있음)

### 2. 자동 설정 스크립트 실행

```bash
# 스크립트 실행
./scripts/setup-github.sh
```

또는 수동 설정:

```bash
# GitHub 저장소 URL을 원격 저장소로 추가
git remote add origin https://github.com/YOUR_USERNAME/fashion-docs.git

# 메인 브랜치를 main으로 설정
git branch -M main

# 코드를 GitHub에 푸시
git push -u origin main
```

## 🔐 GitHub Secrets 설정

### Vercel 배포를 위한 Secrets 설정

1. **Vercel 토큰 생성**:
   - [Vercel 대시보드](https://vercel.com/account/tokens) 접속
   - **Create Token** 클릭
   - 토큰 이름: `GitHub Actions`
   - 권한: `Full Account` 선택
   - 토큰 복사

2. **GitHub Secrets 설정**:
   - GitHub 저장소 → **Settings** → **Secrets and variables** → **Actions**
   - **New repository secret** 클릭하여 다음 Secrets 추가:

   ```
   VERCEL_TOKEN: [Vercel에서 생성한 토큰]
   VERCEL_ORG_ID: [Vercel 조직 ID]
   VERCEL_PROJECT_ID: [Vercel 프로젝트 ID]
   ```

### Vercel 정보 찾기

**Vercel 조직 ID와 프로젝트 ID 찾기**:
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 프로젝트 정보 확인
vercel project ls
```

또는 Vercel 대시보드에서:
1. 프로젝트 설정 → **General**
2. **Project ID** 확인
3. **Team ID** (조직 ID) 확인

## 🔄 자동 배포 설정

### GitHub Actions 자동 배포
- `main` 브랜치에 푸시할 때마다 자동 배포
- Pull Request마다 Preview 배포 생성
- 환경 변수는 모든 환경에 자동 적용

### 배포 환경
- **Production**: `main` 브랜치
- **Preview**: Pull Request
- **Development**: `dev` 브랜치 (선택사항)

## 📋 브랜치 전략

### 권장 브랜치 구조
```
main          # 프로덕션 배포
├── develop   # 개발 브랜치
├── feature/* # 기능 개발
└── hotfix/*  # 긴급 수정
```

### 브랜치 생성 예시
```bash
# 개발 브랜치 생성
git checkout -b develop
git push -u origin develop

# 기능 브랜치 생성
git checkout -b feature/user-authentication
git push -u origin feature/user-authentication
```

## 🔧 GitHub Actions CI/CD

### 자동화된 워크플로우
`.github/workflows/ci.yml` 파일이 자동으로:
- 코드 린팅
- 빌드 테스트
- 자동 배포 (main 브랜치)

### 워크플로우 트리거
- `main` 브랜치 푸시 → 자동 배포
- `develop` 브랜치 푸시 → 테스트만 실행
- Pull Request → 테스트 및 빌드 검증

## 🚀 배포 확인

### 배포 상태 확인
1. **GitHub Actions** 탭에서 워크플로우 상태 확인
2. **Vercel 대시보드**에서 배포 상태 확인
3. **배포 URL**에서 실제 배포 확인

### 문제 해결
- **Secrets 설정 확인**: GitHub 저장소 Settings → Secrets
- **Vercel 토큰 권한**: Full Account 권한 필요
- **브랜치 보호**: main 브랜치 보호 규칙 설정 권장

## 📊 GitHub 기능 활용

### 1. Issues
- 버그 리포트
- 기능 요청
- 작업 할당

### 2. Pull Requests
- 코드 리뷰
- 자동 테스트
- 배포 전 검증

### 3. Projects
- 작업 관리
- 스프린트 계획
- 진행 상황 추적

## 🎯 다음 단계

1. **GitHub 저장소 생성**
2. **자동 설정 스크립트 실행** (`./scripts/setup-github.sh`)
3. **GitHub Secrets 설정**
4. **Vercel과 GitHub 연동**
5. **자동 배포 테스트**

---

**GitHub 저장소 URL**: `https://github.com/YOUR_USERNAME/fashion-docs`
**Vercel 대시보드**: https://vercel.com/jay-1346s-projects/faddit-mine

## 🔧 추가 설정

### 브랜치 보호 규칙 설정
1. GitHub 저장소 → **Settings** → **Branches**
2. **Add rule** 클릭
3. **Branch name pattern**: `main`
4. **Require a pull request before merging** 체크
5. **Require status checks to pass before merging** 체크

### 환경 변수 설정
Vercel 대시보드에서 환경 변수 설정:
1. 프로젝트 → **Settings** → **Environment Variables**
2. 필요한 환경 변수 추가
3. **Production**, **Preview**, **Development** 환경 선택 