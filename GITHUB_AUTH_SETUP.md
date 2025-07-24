# GitHub 인증 설정 가이드

## 🔐 GitHub Personal Access Token 생성

### 1. GitHub Personal Access Token 생성

1. [GitHub Settings](https://github.com/settings/tokens) 접속
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)** 클릭
4. 토큰 설정:
   - **Note**: `GitHub CLI and Git Operations`
   - **Expiration**: `90 days` (권장)
   - **Scopes**: 다음 항목들 체크
     - ✅ `repo` (전체 저장소 접근)
     - ✅ `workflow` (GitHub Actions)
     - ✅ `write:packages` (패키지 업로드)
     - ✅ `delete:packages` (패키지 삭제)

5. **Generate token** 클릭
6. **토큰을 안전한 곳에 복사** (한 번만 표시됨)

### 2. Git Credential 설정

#### 방법 1: Git Credential Manager 사용 (권장)

```bash
# macOS의 경우
git config --global credential.helper osxkeychain

# Windows의 경우
git config --global credential.helper manager-core

# Linux의 경우
git config --global credential.helper store
```

#### 방법 2: URL에 토큰 포함

```bash
# 기존 원격 저장소 제거
git remote remove origin

# 토큰을 포함한 URL로 다시 추가
git remote add origin https://YOUR_TOKEN@github.com/faddit-agency/faddit-mine.git

# 푸시 시도
git push -u origin main
```

#### 방법 3: GitHub CLI 사용

```bash
# GitHub CLI 설치
brew install gh

# 로그인
gh auth login

# 저장소 클론 (새로 시작하는 경우)
gh repo clone faddit-agency/faddit-mine

# 또는 기존 저장소에 원격 추가
gh repo set-default faddit-agency/faddit-mine
```

### 3. SSH 키 설정 (대안)

#### SSH 키 생성
```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH 에이전트 시작
eval "$(ssh-agent -s)"

# SSH 키 추가
ssh-add ~/.ssh/id_ed25519

# 공개 키 복사
cat ~/.ssh/id_ed25519.pub
```

#### GitHub에 SSH 키 추가
1. [GitHub SSH Settings](https://github.com/settings/keys) 접속
2. **New SSH key** 클릭
3. **Title**: `MacBook Pro` (또는 원하는 이름)
4. **Key**: 위에서 복사한 공개 키 붙여넣기
5. **Add SSH key** 클릭

#### SSH URL로 변경
```bash
# HTTPS URL 제거
git remote remove origin

# SSH URL 추가
git remote add origin git@github.com:faddit-agency/faddit-mine.git

# 푸시
git push -u origin main
```

## 🔧 현재 상태 확인

### Git 설정 확인
```bash
# 현재 원격 저장소 확인
git remote -v

# Git 사용자 설정 확인
git config --global user.name
git config --global user.email

# Git 사용자 설정 (필요한 경우)
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

### 권한 테스트
```bash
# GitHub API 테스트
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user

# 또는 SSH 연결 테스트
ssh -T git@github.com
```

## 🚀 푸시 및 배포

### 코드 푸시
```bash
# 변경사항 커밋
git add .
git commit -m "Setup GitHub Actions and CI/CD"

# GitHub에 푸시
git push -u origin main
```

### 배포 확인
1. **GitHub Actions** 탭에서 워크플로우 상태 확인
2. **Vercel 대시보드**에서 배포 상태 확인
3. **배포 URL**에서 실제 배포 확인

## 🔒 보안 주의사항

### 토큰 보안
- Personal Access Token을 절대 코드에 하드코딩하지 마세요
- 토큰은 정기적으로 갱신하세요 (90일 권장)
- 토큰이 노출된 경우 즉시 삭제하고 새로 생성하세요

### 환경 변수 사용
```bash
# .env 파일에 토큰 저장 (개발용)
echo "GITHUB_TOKEN=your_token_here" >> .env

# .gitignore에 .env 추가 확인
echo ".env" >> .gitignore
```

## 🆘 문제 해결

### 403 Forbidden 오류
- 토큰 권한 확인
- 저장소 접근 권한 확인
- 토큰 만료 여부 확인

### 인증 실패
```bash
# Git 자격 증명 캐시 삭제
git config --global --unset credential.helper

# 또는 macOS Keychain에서 삭제
security delete-internet-password -s github.com
```

### SSH 연결 실패
```bash
# SSH 디버그 모드
ssh -vT git@github.com

# SSH 키 확인
ssh-add -l
```

---

**참고**: 이 가이드를 따라 설정하면 GitHub에 안전하게 푸시할 수 있고, 자동 배포가 활성화됩니다. 