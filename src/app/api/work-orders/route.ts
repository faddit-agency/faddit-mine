import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    // 작업 주문 목록 가져오기
    const { data: workOrders, error } = await supabase
      .from('work_orders')
      .select(`
        *,
        created_by_user:users!work_orders_created_by_fkey(id, full_name, email),
        assigned_to_user:users!work_orders_assigned_to_fkey(id, full_name, email)
      `)
      .or(`created_by.eq.${user.id},assigned_to.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch work orders' }, { status: 500 });
    }

    return NextResponse.json(workOrders);

  } catch (error) {
    console.error('GET work orders error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, status, priority, assigned_to, due_date } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
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

    // 새 작업 주문 생성
    const { data: workOrder, error } = await supabase
      .from('work_orders')
      .insert({
        title,
        description,
        status: status || 'pending',
        priority: priority || 'medium',
        assigned_to,
        created_by: user.id,
        due_date: due_date ? new Date(due_date).toISOString() : null
      })
      .select(`
        *,
        created_by_user:users!work_orders_created_by_fkey(id, full_name, email),
        assigned_to_user:users!work_orders_assigned_to_fkey(id, full_name, email)
      `)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to create work order' }, { status: 500 });
    }

    return NextResponse.json(workOrder, { status: 201 });

  } catch (error) {
    console.error('POST work order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 