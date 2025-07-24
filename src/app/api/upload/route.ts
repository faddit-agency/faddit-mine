import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Supabase 클라이언트가 설정되지 않은 경우
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const workOrderId = formData.get('workOrderId') as string;

    if (!file || !workOrderId) {
      return NextResponse.json({ error: 'File and workOrderId are required' }, { status: 400 });
    }

    // 파일을 Supabase Storage에 업로드
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('work-order-files')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
    }

    // 파일 정보를 데이터베이스에 저장
    const { data: fileRecord, error: dbError } = await supabase
      .from('files')
      .insert({
        work_order_id: workOrderId,
        file_name: file.name,
        file_path: uploadData.path,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: userId
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Failed to save file record' }, { status: 500 });
    }

    // Supabase URL이 설정되어 있는지 확인
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const fileUrl = supabaseUrl 
      ? `${supabaseUrl}/storage/v1/object/public/work-order-files/${fileName}`
      : null;

    return NextResponse.json({ 
      success: true, 
      file: fileRecord,
      url: fileUrl
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 