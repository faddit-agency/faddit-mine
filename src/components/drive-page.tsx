'use client';

import { useState, useEffect } from 'react';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';

interface WorkOrder {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  created_at: string;
  due_date?: string;
  created_by_user?: {
    full_name: string;
    email: string;
  };
  assigned_to_user?: {
    full_name: string;
    email: string;
  };
}

export default function DrivePage() {
  const { user, isLoaded } = useUser();
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [newWorkOrder, setNewWorkOrder] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: ''
  });

  useEffect(() => {
    if (isLoaded && user) {
      fetchWorkOrders();
    }
  }, [isLoaded, user]);

  const fetchWorkOrders = async () => {
    try {
      const response = await fetch('/api/work-orders');
      if (response.ok) {
        const data = await response.json();
        setWorkOrders(data);
      }
    } catch (error) {
      console.error('Error fetching work orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createWorkOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkOrder.title.trim()) return;

    try {
      const response = await fetch('/api/work-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkOrder),
      });

      if (response.ok) {
        setNewWorkOrder({ title: '', description: '', priority: 'medium', due_date: '' });
        fetchWorkOrders();
      }
    } catch (error) {
      console.error('Error creating work order:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Fashion Docs
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            작업 주문 관리 시스템에 로그인하세요
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <SignInButton mode="modal">
              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                로그인
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fashion Docs</h1>
              <p className="mt-1 text-sm text-gray-500">
                안녕하세요, {user.firstName || user.emailAddresses[0]?.emailAddress}님
              </p>
            </div>
            <SignOutButton>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                로그아웃
              </button>
            </SignOutButton>
          </div>
        </div>

        {/* New Work Order Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">새 작업 주문</h2>
          <form onSubmit={createWorkOrder} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">제목</label>
                <input
                  type="text"
                  value={newWorkOrder.title}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, title: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">우선순위</label>
                <select
                  value={newWorkOrder.priority}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, priority: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="low">낮음</option>
                  <option value="medium">보통</option>
                  <option value="high">높음</option>
                  <option value="urgent">긴급</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">설명</label>
              <textarea
                value={newWorkOrder.description}
                onChange={(e) => setNewWorkOrder({...newWorkOrder, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">마감일</label>
              <input
                type="date"
                value={newWorkOrder.due_date}
                onChange={(e) => setNewWorkOrder({...newWorkOrder, due_date: e.target.value})}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                작업 주문 생성
              </button>
            </div>
          </form>
        </div>

        {/* Work Orders List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">작업 주문 목록</h2>
            {loading ? (
              <div className="text-center py-4">로딩 중...</div>
            ) : workOrders.length === 0 ? (
              <div className="text-center py-4 text-gray-500">작업 주문이 없습니다.</div>
            ) : (
              <div className="space-y-4">
                {workOrders.map((workOrder) => (
                  <div key={workOrder.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{workOrder.title}</h3>
                        {workOrder.description && (
                          <p className="mt-1 text-sm text-gray-600">{workOrder.description}</p>
                        )}
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>생성자: {workOrder.created_by_user?.full_name || 'Unknown'}</span>
                          {workOrder.assigned_to_user && (
                            <span>담당자: {workOrder.assigned_to_user.full_name}</span>
                          )}
                          <span>생성일: {new Date(workOrder.created_at).toLocaleDateString()}</span>
                          {workOrder.due_date && (
                            <span>마감일: {new Date(workOrder.due_date).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workOrder.status)}`}>
                          {workOrder.status === 'pending' && '대기중'}
                          {workOrder.status === 'in_progress' && '진행중'}
                          {workOrder.status === 'completed' && '완료'}
                          {workOrder.status === 'cancelled' && '취소'}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(workOrder.priority)}`}>
                          {workOrder.priority === 'low' && '낮음'}
                          {workOrder.priority === 'medium' && '보통'}
                          {workOrder.priority === 'high' && '높음'}
                          {workOrder.priority === 'urgent' && '긴급'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 