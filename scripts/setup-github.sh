#!/bin/bash

# GitHub 저장소 설정 스크립트
echo "🚀 GitHub 저장소 설정을 시작합니다..."

# Git 초기화 (이미 초기화되어 있지 않은 경우)
if [ ! -d ".git" ]; then
    echo "📁 Git 저장소를 초기화합니다..."
    git init
fi

# .gitignore 확인
if [ ! -f ".gitignore" ]; then
    echo "⚠️  .gitignore 파일이 없습니다. 생성합니다..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/

# Production
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity
EOF
fi

# 현재 브랜치를 main으로 설정
git branch -M main

# 모든 파일을 스테이징
echo "📦 파일들을 스테이징합니다..."
git add .

# 초기 커밋 (이미 커밋이 있는 경우 스킵)
if ! git log --oneline -1 > /dev/null 2>&1; then
    echo "💾 초기 커밋을 생성합니다..."
    git commit -m "Initial commit: Fashion Docs project setup"
fi

echo ""
echo "✅ 로컬 Git 설정이 완료되었습니다!"
echo ""
echo "다음 단계:"
echo "1. GitHub에서 새 저장소를 생성하세요"
echo "2. 아래 명령어로 원격 저장소를 연결하세요:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/fashion-docs.git"
echo "3. 코드를 푸시하세요:"
echo "   git push -u origin main"
echo ""
echo "GitHub 저장소 URL을 입력하세요 (예: https://github.com/username/fashion-docs.git):"
read -p "GitHub URL: " github_url

if [ ! -z "$github_url" ]; then
    echo "🔗 원격 저장소를 연결합니다..."
    git remote add origin "$github_url"
    
    echo "🚀 코드를 GitHub에 푸시합니다..."
    git push -u origin main
    
    echo ""
    echo "🎉 GitHub 설정이 완료되었습니다!"
    echo "이제 main 브랜치에 푸시할 때마다 자동으로 배포됩니다."
else
    echo "⚠️  GitHub URL이 입력되지 않았습니다. 수동으로 설정해주세요."
fi 