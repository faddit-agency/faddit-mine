#!/bin/bash

# 환경 변수 설정 스크립트
echo "🔧 환경 변수 설정을 시작합니다..."

# .env 파일 생성
if [ ! -f ".env.local" ]; then
    echo "📝 .env.local 파일을 생성합니다..."
    cp env.example .env.local
    echo "✅ .env.local 파일이 생성되었습니다."
    echo ""
    echo "⚠️  다음 단계:"
    echo "1. .env.local 파일을 열어서 실제 값들을 입력하세요"
    echo "2. Supabase 프로젝트에서 URL과 API 키를 가져오세요"
    echo "3. Clerk 프로젝트에서 키들을 가져오세요"
    echo ""
else
    echo "✅ .env.local 파일이 이미 존재합니다."
fi

# Vercel 환경 변수 설정
echo ""
echo "🚀 Vercel 환경 변수 설정..."
echo "Vercel 대시보드에서 다음 환경 변수들을 설정하세요:"
echo ""
echo "Production 환경:"
echo "- NEXT_PUBLIC_SUPABASE_URL"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "- CLERK_SECRET_KEY"
echo ""
echo "Preview 환경:"
echo "- NEXT_PUBLIC_SUPABASE_URL"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "- CLERK_SECRET_KEY"
echo ""
echo "Development 환경:"
echo "- NEXT_PUBLIC_SUPABASE_URL"
echo "- NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "- CLERK_SECRET_KEY"

echo ""
echo "📋 설정 완료 후 다음 명령어로 테스트하세요:"
echo "npm run dev"
echo ""
echo "🌐 Vercel 대시보드: https://vercel.com/jay-1346s-projects/faddit-mine/settings/environment-variables" 