"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
  User
} from "lucide-react";

export function DrivePage() {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [activeNav, setActiveNav] = useState('홈');
  const router = useRouter();

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

  const handleFileClick = () => {
    router.push('/work-order/1');
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        {/* User Profile */}
        <div className="p-5 border-b border-border">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl mb-3">
            U
          </div>
          <div className="text-lg font-semibold text-foreground mb-1">
            사용자
          </div>
          <div className="text-sm text-muted-foreground">
            user@example.com
          </div>
          <button className="mt-3 w-full px-3 py-2 border border-border rounded-md hover:bg-muted">
            로그아웃
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-5">
          <div className="space-y-1">
            {[
              { icon: Home, label: '홈', active: activeNav === '홈' },
              { icon: FileText, label: '작업지시서', active: activeNav === '작업지시서' },
              { icon: Folder, label: '내 드라이브', active: activeNav === '내 드라이브' },
              { icon: Star, label: '즐겨찾기', active: activeNav === '즐겨찾기' },
              { icon: Trash2, label: '휴지통', active: activeNav === '휴지통' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                  item.active 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Storage Section */}
        <div className="p-5 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">저장용량</h3>
          <div className="text-xs text-muted-foreground mb-4">1GB 중 80MB 사용</div>
          <div className="w-full h-1.5 bg-muted rounded-full mb-4 overflow-hidden">
            <div className="w-[8%] h-full bg-primary rounded-full"></div>
          </div>
          <button className="w-full mb-3 px-3 py-2 border border-border rounded-md hover:bg-muted flex items-center justify-center">
            <Plus size={12} className="mr-2" />
            저장공간 10GB 사용하기
          </button>
          <div className="text-xs text-muted-foreground leading-relaxed">
            Pro 요금제로 업그레이드하면 10GB 의 저장 공간을 사용할 수 있습니다.<br/>
            Pro 요금제 업그레이드 (출시 예정)
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                placeholder="파일 제목을 검색하세요" 
                className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border border-border rounded-md hover:bg-muted">
              <Sun size={16} />
            </button>
            <button className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center">
              <Plus size={16} className="mr-2" />
              새 항목 추가
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto">
          {/* Banner */}
          <div className="mb-8 p-10 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">WiiVE, Creative한 발상의 전환</h2>
            <button className="px-4 py-2 bg-white/20 border border-white/30 text-white rounded-md hover:bg-white/30">
              출시 예정 기능 보기
            </button>
          </div>

          {/* Recent Designs */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-5">최근 디자인</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {folders.map((folder, index) => (
                <div key={index} className="p-5 text-center relative border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <button className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
                    <MoreVertical size={16} />
                  </button>
                  <div className="text-4xl mb-4">📁</div>
                  <div className="font-medium text-foreground mb-1">{folder.name}</div>
                  <div className="text-sm text-muted-foreground">{folder.count}개</div>
                </div>
              ))}
            </div>
          </section>

          {/* All Files */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-foreground">전체</h3>
              <div className="flex gap-1">
                <button
                  className={`px-3 py-2 rounded-md ${
                    activeView === 'list' ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-muted'
                  }`}
                  onClick={() => setActiveView('list')}
                >
                  <List size={16} />
                </button>
                <button
                  className={`px-3 py-2 rounded-md ${
                    activeView === 'grid' ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-muted'
                  }`}
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={16} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {files.map((file, index) => (
                <div key={index} className="p-5 relative border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={handleFileClick}>
                  <button className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
                    <MoreVertical size={16} />
                  </button>
                  <div className="w-full h-32 bg-muted rounded-md mb-4 flex items-center justify-center relative">
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      {file.type}
                    </div>
                    <div className="absolute top-2 right-2 bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                      {file.extension}
                    </div>
                    <div className="text-center">
                      <div className="text-2xl mb-1">👖</div>
                      <div className="text-sm text-muted-foreground">도식화</div>
                    </div>
                  </div>
                  <div className="font-medium text-foreground mb-1 text-left">{file.name}</div>
                  <div className="text-sm text-muted-foreground text-left">{file.type} • {file.extension}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 