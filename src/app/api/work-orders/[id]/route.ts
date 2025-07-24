import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Supabase 클라이언트가 설정되지 않은 경우
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // 사용자 정보 가져오기
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 작업 주문 상세 정보 가져오기
    const { data: workOrder, error } = await supabase
      .from('work_orders')
      .select(`
        *,
        created_by_user:users!work_orders_created_by_fkey(id, full_name, email),
        assigned_to_user:users!work_orders_assigned_to_fkey(id, full_name, email),
        files(id, file_name, file_path, file_size, mime_type, created_at)
      `)
      .eq('id', params.id)
      .or(`created_by.eq.${user.id},assigned_to.eq.${user.id}`)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Work order not found' }, { status: 404 });
    }

    return NextResponse.json(workOrder);

  } catch (error) {
    console.error('GET work order detail error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Supabase 클라이언트가 설정되지 않은 경우
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { title, description, status, priority, assigned_to, due_date } = body;

    // 사용자 정보 가져오기
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 작업 주문 업데이트
    const { data: workOrder, error } = await supabase
      .from('work_orders')
      .update({
        title,
        description,
        status,
        priority,
        assigned_to,
        due_date: due_date ? new Date(due_date).toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .or(`created_by.eq.${user.id},assigned_to.eq.${user.id}`)
      .select(`
        *,
        created_by_user:users!work_orders_created_by_fkey(id, full_name, email),
        assigned_to_user:users!work_orders_assigned_to_fkey(id, full_name, email)
      `)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to update work order' }, { status: 500 });
    }

    return NextResponse.json(workOrder);

  } catch (error) {
    console.error('PUT work order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Supabase 클라이언트가 설정되지 않은 경우
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // 사용자 정보 가져오기
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 작업 주문 삭제 (생성자만 삭제 가능)
    const { error } = await supabase
      .from('work_orders')
      .delete()
      .eq('id', params.id)
      .eq('created_by', user.id);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to delete work order' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('DELETE work order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 