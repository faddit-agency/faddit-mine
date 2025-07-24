'use client';

import { useState, useEffect } from 'react';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { 
  Home, 
  FileText, 
  Folder, 
  Star, 
  Trash2, 
  Search, 
  Plus, 
  Grid, 
  List, 
  MoreVertical, 
  Download, 
  Eye, 
  Sun, 
  Moon,
  Cloud,
  User,
  ChevronRight,
  Settings,
  ArrowLeft,
  ArrowRight,
  RotateCcw
} from "lucide-react";

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
  const [activeNav, setActiveNav] = useState('홈');
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [showNewWorkOrderForm, setShowNewWorkOrderForm] = useState(false);
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
        setShowNewWorkOrderForm(false);
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

  const folders = [
    { name: '2025 S/S 신상', count: 0 },
    { name: '2025 S/S 신상', count: 0 },
    { name: '2025 S/S 신상', count: 0 },
    { name: '2025 S/S 신상', count: 0 },
    { name: '2025 S/S 신상', count: 0 },
    { name: '2025 S/S 신상', count: 0 },
  ];

  const files = [
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
    { name: '[wiive] 위브 팀웨어_v1', type: '작업지시서', extension: '.pdf' },
  ];

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* User Profile */}
        <div className="p-5 border-b border-gray-200">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl mb-3">
            {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress?.charAt(0) || 'U'}
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-1">
            김한재
          </div>
          <div className="text-sm text-gray-500 mb-2">
            카카오 로그인
          </div>
          <SignOutButton>
            <button className="text-sm text-gray-600 hover:text-gray-800">
              로그아웃
            </button>
          </SignOutButton>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5">
          <div className="space-y-1">
            {[
              { icon: Home, label: '홈', active: activeNav === '홈' },
              { icon: FileText, label: '작업지시서', active: activeNav === '작업지시서' },
              { icon: Folder, label: '내 드라이브', active: activeNav === '내 드라이브' },
              { icon: Star, label: '☆ 즐겨찾기', active: activeNav === '☆ 즐겨찾기' },
              { icon: Trash2, label: '휴지통', active: activeNav === '휴지통' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                  item.active 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Storage Section */}
        <div className="p-5 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">저장용량</h3>
          <div className="text-xs text-gray-500 mb-4">1GB 중 80MB 사용</div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-4 overflow-hidden">
            <div className="w-[8%] h-full bg-purple-600 rounded-full"></div>
          </div>
          <button className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center text-xs text-gray-700">
            <Plus size={12} className="mr-2" />
            저장공간 10GB 사용하기
          </button>
          <div className="text-xs text-gray-500 leading-relaxed">
            Pro 요금제로 업그레이드하면 10GB 의 저장 공간을 사용할 수 있습니다.<br/>
            Pro 요금제 업그레이드 (출시 예정)
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-5 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input 
                placeholder="파일 제목을 검색하세요" 
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Sun size={16} className="text-gray-600" />
            </button>
            <button 
              className="px-3 py-2 bg-black text-white rounded-md hover:bg-gray-800 flex items-center"
              onClick={() => setShowNewWorkOrderForm(true)}
            >
              <Plus size={16} className="mr-2" />
              새 항목 추가
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto bg-white">
          {/* Banner */}
          <div className="mb-8 p-10 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">WiiVE, Creative한 발상의 전환</h2>
              <button className="px-4 py-2 bg-white/20 border border-white/30 text-white rounded-md hover:bg-white/30">
                출시 예정 기능 보기
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>

          {/* Recent Designs */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">최근 디자인</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {folders.map((folder, index) => (
                <div key={index} className="p-5 text-center relative border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer bg-white">
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                  <div className="text-4xl mb-4">📁</div>
                  <div className="font-medium text-gray-900 mb-1">{folder.name}</div>
                  <div className="text-sm text-gray-500">{folder.count}개</div>
                </div>
              ))}
            </div>
          </section>

          {/* All Files */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900">전체</h3>
              <div className="flex gap-1">
                <button
                  className={`px-3 py-2 rounded-md ${
                    activeView === 'list' ? 'bg-purple-100 text-purple-700' : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveView('list')}
                >
                  <List size={16} />
                </button>
                <button
                  className={`px-3 py-2 rounded-md ${
                    activeView === 'grid' ? 'bg-purple-100 text-purple-700' : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {files.map((file, index) => (
                <div key={index} className="p-5 relative border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer bg-white">
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                  <div className="w-full h-32 bg-gray-100 rounded-md mb-4 flex items-center justify-center relative">
                    <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {file.type}
                    </div>
                    <div className="absolute top-2 right-2 bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                      {file.extension}
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">👖</div>
                      <div className="text-sm text-gray-500">도식화</div>
                    </div>
                  </div>
                  <div className="font-medium text-gray-900 mb-1 text-left">{file.name}</div>
                  <div className="text-sm text-gray-500 text-left">{file.type} • {file.extension}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* New Work Order Modal */}
      {showNewWorkOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">새 작업 주문</h2>
            <form onSubmit={createWorkOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">제목</label>
                <input
                  type="text"
                  value={newWorkOrder.title}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, title: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">우선순위</label>
                <select
                  value={newWorkOrder.priority}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, priority: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                >
                  <option value="low">낮음</option>
                  <option value="medium">보통</option>
                  <option value="high">높음</option>
                  <option value="urgent">긴급</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">설명</label>
                <textarea
                  value={newWorkOrder.description}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, description: e.target.value})}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">마감일</label>
                <input
                  type="date"
                  value={newWorkOrder.due_date}
                  onChange={(e) => setNewWorkOrder({...newWorkOrder, due_date: e.target.value})}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewWorkOrderForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  생성
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 