import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 임시 응답 - 환경 변수 설정 후 실제 구현으로 교체
    return NextResponse.json({
      message: 'Work orders endpoint ready - environment variables need to be configured',
      status: 'pending',
      data: []
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 임시 응답 - 환경 변수 설정 후 실제 구현으로 교체
    return NextResponse.json({
      message: 'Work order creation endpoint ready - environment variables need to be configured',
      status: 'pending'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 