"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Download, 
  Share, 
  Edit, 
  MoreVertical,
  FileText,
  Calendar,
  User,
  Tag
} from "lucide-react";

export function WorkOrderDetail() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const workOrder = {
    id: '1',
    title: '[wiive] 위브 팀웨어_v1',
    status: '진행중',
    category: '팀웨어',
    brand: 'WiiVE',
    item: '상의',
    description: '2025 S/S 시즌 위브 팀웨어 컬렉션의 상의 디자인 작업지시서입니다.',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    assignedTo: '김디자이너',
    priority: '높음',
    files: [
      { name: '디자인_스케치.pdf', type: '스케치', size: '2.3MB' },
      { name: '색상_팔레트.pdf', type: '색상', size: '1.1MB' },
      { name: '패턴_도안.pdf', type: '패턴', size: '3.7MB' }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-muted rounded-md"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{workOrder.title}</h1>
              <p className="text-muted-foreground">작업지시서 #{workOrder.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-border rounded-md hover:bg-muted flex items-center gap-2">
              <Download size={16} />
              내보내기
            </button>
            <button className="px-4 py-2 border border-border rounded-md hover:bg-muted flex items-center gap-2">
              <Share size={16} />
              공유
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2">
              <Edit size={16} />
              편집
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Status Banner */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-900">진행중</span>
              <span className="text-blue-700">• 마지막 업데이트: {workOrder.updatedAt}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex border-b border-border">
              {[
                { id: 'overview', label: '개요' },
                { id: 'files', label: '파일' },
                { id: 'history', label: '히스토리' },
                { id: 'comments', label: '댓글' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 border-b-2 font-medium ${
                    activeTab === tab.id 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">제목</label>
                    <p className="text-lg font-semibold">{workOrder.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">설명</label>
                    <p className="text-foreground">{workOrder.description}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">브랜드</label>
                    <p className="text-foreground">{workOrder.brand}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">카테고리</label>
                    <p className="text-foreground">{workOrder.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">아이템</label>
                    <p className="text-foreground">{workOrder.item}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">우선순위</label>
                    <p className="text-foreground">{workOrder.priority}</p>
                  </div>
                </div>
              </div>

              {/* Files */}
              <div>
                <h3 className="text-lg font-semibold mb-4">첨부 파일</h3>
                <div className="space-y-2">
                  {workOrder.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.type} • {file.size}</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-muted rounded-md">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">파일 관리</h3>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  파일 추가
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workOrder.files.map((file, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <FileText size={20} className="text-muted-foreground" />
                      <button className="p-1 hover:bg-muted rounded">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <h4 className="font-medium mb-1">{file.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{file.type} • {file.size}</p>
                    <button className="w-full px-3 py-2 border border-border rounded-md hover:bg-muted text-sm">
                      다운로드
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">작업 히스토리</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-border rounded-md">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">작업지시서 생성</p>
                    <p className="text-sm text-muted-foreground">{workOrder.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border rounded-md">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">파일 업로드</p>
                    <p className="text-sm text-muted-foreground">디자인_스케치.pdf</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border rounded-md">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">상태 변경</p>
                    <p className="text-sm text-muted-foreground">진행중으로 변경</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">댓글</h3>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                      K
                    </div>
                    <div>
                      <p className="font-medium">김디자이너</p>
                      <p className="text-sm text-muted-foreground">2024-01-20 14:30</p>
                    </div>
                  </div>
                  <p className="text-foreground">색상 팔레트 검토 완료했습니다. 다음 단계로 진행하겠습니다.</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      P
                    </div>
                    <div>
                      <p className="font-medium">박매니저</p>
                      <p className="text-sm text-muted-foreground">2024-01-19 16:45</p>
                    </div>
                  </div>
                  <p className="text-foreground">디자인 방향성에 대해 논의가 필요합니다. 미팅 일정 조율해주세요.</p>
                </div>
              </div>
              <div className="mt-6">
                <textarea 
                  placeholder="댓글을 입력하세요..."
                  className="w-full p-3 border border-border rounded-md resize-none"
                  rows={3}
                ></textarea>
                <button className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  댓글 작성
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">작업 정보</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">생성일</p>
                <p className="text-sm text-muted-foreground">{workOrder.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">담당자</p>
                <p className="text-sm text-muted-foreground">{workOrder.assignedTo}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Tag size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">상태</p>
                <p className="text-sm text-muted-foreground">{workOrder.status}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium mb-3">작업</h4>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 border border-border rounded-md hover:bg-muted text-left">
                상태 변경
              </button>
              <button className="w-full px-3 py-2 border border-border rounded-md hover:bg-muted text-left">
                담당자 변경
              </button>
              <button className="w-full px-3 py-2 border border-border rounded-md hover:bg-muted text-left">
                복사
              </button>
              <button className="w-full px-3 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 text-left">
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 