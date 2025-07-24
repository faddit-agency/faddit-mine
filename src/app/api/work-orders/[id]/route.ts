import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 임시 응답 - 환경 변수 설정 후 실제 구현으로 교체
    return NextResponse.json({
      message: 'Work order detail endpoint ready - environment variables need to be configured',
      status: 'pending',
      id: params.id
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 임시 응답 - 환경 변수 설정 후 실제 구현으로 교체
    return NextResponse.json({
      message: 'Work order update endpoint ready - environment variables need to be configured',
      status: 'pending',
      id: params.id
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 임시 응답 - 환경 변수 설정 후 실제 구현으로 교체
    return NextResponse.json({
      message: 'Work order deletion endpoint ready - environment variables need to be configured',
      status: 'pending',
      id: params.id
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 