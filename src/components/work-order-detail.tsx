"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  X, 
  Plus, 
  Minus, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  MoreVertical, 
  Share, 
  Calendar, 
  Cloud,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkOrderDetailProps {
  id: string;
}

export function WorkOrderDetail({ id }: WorkOrderDetailProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(true);
  const [activeTab, setActiveTab] = useState('2025 F/W 프라다 여성 신상');

  const tabs = [
    '[wiive] 위브 팀웨어_v1',
    '[stitch] 스티치 여성 하의 라인_v1',
    '[stitch] 스티치 여성 하의 라인_v2',
    '2025 F/W 프라다 여성 신상'
  ];

  const [basicInfo, setBasicInfo] = useState({
    brand: '프라다',
    item: '남성자켓',
    gender: '남성',
    category: '상의',
    apparel: '셔츠',
    season: '2025',
    seasonType: 'S/S'
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    productName: '',
    sampleNumber: '',
    productNumber: '',
    manufacturer: '',
    requestDate: '',
    deliveryDate: '',
    contact1: '',
    contact2: '',
    contact3: '',
    contactInfo: ''
  });

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Browser Header */}
      <div className="flex items-center justify-between px-5 py-2 bg-card border-b border-border h-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-sm text-muted-foreground">○ 세부정보</span>
        </div>
        <div className="flex items-center gap-2">
          <Download size={14} className="text-muted-foreground" />
          <Plus size={14} className="text-muted-foreground" />
          <div className="w-4 h-4 border border-border"></div>
        </div>
      </div>

      {/* Browser Tabs */}
      <div className="flex bg-card border-b border-border">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`px-5 py-3 border-r border-border cursor-pointer relative min-w-[200px] ${
              tab === activeTab 
                ? 'bg-background text-foreground' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <button className="absolute top-2 right-2 text-muted-foreground hover:text-foreground text-xs">
              ×
            </button>
          </div>
        ))}
      </div>

      {/* App Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-foreground">2025 F/W 프라다</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Cloud size={14} />
            드라이브에 저장됨
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Edit3 size={14} className="mr-2" />
            화면 편집
          </Button>
          <Button size="sm">
            <Share size={14} className="mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-96 bg-card border-r border-border overflow-y-auto p-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-foreground">세부정보</span>
            <Switch 
              checked={showDetails} 
              onCheckedChange={setShowDetails}
            />
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">기본 정보</h3>
                <Button variant="outline" size="sm">
                  <Plus size={12} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="brand" className="text-sm text-muted-foreground">브랜드</Label>
                  <Input 
                    id="brand"
                    value={basicInfo.brand}
                    onChange={(e) => setBasicInfo({...basicInfo, brand: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="item" className="text-sm text-muted-foreground">아이템</Label>
                  <Select value={basicInfo.item} onValueChange={(value) => setBasicInfo({...basicInfo, item: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="남성자켓">남성자켓</SelectItem>
                      <SelectItem value="여성자켓">여성자켓</SelectItem>
                      <SelectItem value="남성셔츠">남성셔츠</SelectItem>
                      <SelectItem value="여성셔츠">여성셔츠</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="gender" className="text-sm text-muted-foreground">성별</Label>
                  <Select value={basicInfo.gender} onValueChange={(value) => setBasicInfo({...basicInfo, gender: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="남성">남성</SelectItem>
                      <SelectItem value="여성">여성</SelectItem>
                      <SelectItem value="공용">공용</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category" className="text-sm text-muted-foreground">카테고리</Label>
                  <Select value={basicInfo.category} onValueChange={(value) => setBasicInfo({...basicInfo, category: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="상의">상의</SelectItem>
                      <SelectItem value="하의">하의</SelectItem>
                      <SelectItem value="아우터">아우터</SelectItem>
                      <SelectItem value="신발">신발</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="apparel" className="text-sm text-muted-foreground">의류</Label>
                  <Select value={basicInfo.apparel} onValueChange={(value) => setBasicInfo({...basicInfo, apparel: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="셔츠">셔츠</SelectItem>
                      <SelectItem value="자켓">자켓</SelectItem>
                      <SelectItem value="코트">코트</SelectItem>
                      <SelectItem value="니트">니트</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">시즌</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      value={basicInfo.season}
                      onChange={(e) => setBasicInfo({...basicInfo, season: e.target.value})}
                      className="flex-1"
                    />
                    <Select value={basicInfo.seasonType} onValueChange={(value) => setBasicInfo({...basicInfo, seasonType: value})}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="S/S">S/S</SelectItem>
                        <SelectItem value="F/W">F/W</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">추가 정보</h3>
                <Button variant="outline" size="sm">
                  <Plus size={12} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="productName" className="text-sm text-muted-foreground">품명</Label>
                  <Input 
                    id="productName"
                    value={additionalInfo.productName}
                    onChange={(e) => setAdditionalInfo({...additionalInfo, productName: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="sampleNumber" className="text-sm text-muted-foreground">샘플 번호</Label>
                  <Input 
                    id="sampleNumber"
                    value={additionalInfo.sampleNumber}
                    onChange={(e) => setAdditionalInfo({...additionalInfo, sampleNumber: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="productNumber" className="text-sm text-muted-foreground">제품 번호</Label>
                  <Input 
                    id="productNumber"
                    value={additionalInfo.productNumber}
                    onChange={(e) => setAdditionalInfo({...additionalInfo, productNumber: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="manufacturer" className="text-sm text-muted-foreground">생산처</Label>
                  <Input 
                    id="manufacturer"
                    value={additionalInfo.manufacturer}
                    onChange={(e) => setAdditionalInfo({...additionalInfo, manufacturer: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="requestDate" className="text-sm text-muted-foreground">의뢰일</Label>
                  <div className="relative mt-1">
                    <Input 
                      id="requestDate"
                      type="date"
                      value={additionalInfo.requestDate}
                      onChange={(e) => setAdditionalInfo({...additionalInfo, requestDate: e.target.value})}
                    />
                    <Calendar size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="deliveryDate" className="text-sm text-muted-foreground">납기일</Label>
                  <div className="relative mt-1">
                    <Input 
                      id="deliveryDate"
                      type="date"
                      value={additionalInfo.deliveryDate}
                      onChange={(e) => setAdditionalInfo({...additionalInfo, deliveryDate: e.target.value})}
                    />
                    <Calendar size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact1" className="text-sm text-muted-foreground">담당자 1</Label>
                  <Input 
                    id="contact1"
                    value={additionalInfo.contact1}
                    onChange={(e) => setAdditionalInfo({...additionalInfo, contact1: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contact2" className="text-sm text-muted-foreground">담당자 2</Label>
                  <Input 
                    id="contact2"
                    value={additionalInfo.contact2}
                    onChange={(e) => setAdditionalInfo({...additionalInfo, contact2: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contact3" className="text-sm text-muted-foreground">담당자 3</Label>
                  <Input 
                    id="contact3"
                    value={additionalInfo.contact3}
                    onChange={(e) => setAdditionalInfo({...additionalInfo, contact3: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contactInfo" className="text-sm text-muted-foreground">연락처</Label>
                  <Input 
                    id="contactInfo"
                    value={additionalInfo.contactInfo}
                    onChange={(e) => setAdditionalInfo({...additionalInfo, contactInfo: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Technical Drawing */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">도식화</CardTitle>
                <Button variant="ghost" size="sm">
                  <X size={14} />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <Upload size={24} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">도식화 이미지를 업로드하세요</p>
                </div>
                <Button variant="outline" size="sm" className="mt-3">
                  <Edit3 size={14} className="mr-2" />
                  Edit Mode
                </Button>
              </CardContent>
            </Card>

            {/* Work Notes */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">작업 시 주의사항</CardTitle>
                <Button variant="ghost" size="sm">
                  <X size={14} />
                </Button>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="작업 시 주의사항을 입력하세요"
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>

            {/* Size Spec */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Size Spec cm/단면</CardTitle>
                <Button variant="ghost" size="sm">
                  <X size={14} />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">XS</TableHead>
                      <TableHead className="text-xs">S</TableHead>
                      <TableHead className="text-xs">M</TableHead>
                      <TableHead className="text-xs">L</TableHead>
                      <TableHead className="text-xs">XL</TableHead>
                      <TableHead className="text-xs">+</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">100</TableCell>
                      <TableCell className="text-xs">300</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">200</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus size={12} className="mr-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Quantity by Color/Size */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">색상/사이즈 별 수량</CardTitle>
                <Button variant="ghost" size="sm">
                  <X size={14} />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">XS</TableHead>
                      <TableHead className="text-xs">S</TableHead>
                      <TableHead className="text-xs">M</TableHead>
                      <TableHead className="text-xs">L</TableHead>
                      <TableHead className="text-xs">XL</TableHead>
                      <TableHead className="text-xs">2XL</TableHead>
                      <TableHead className="text-xs">+</TableHead>
                      <TableHead className="text-xs">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">100</TableCell>
                      <TableCell className="text-xs">300</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">200</TableCell>
                      <TableCell className="text-xs">200</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">600</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">100</TableCell>
                      <TableCell className="text-xs">300</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">200</TableCell>
                      <TableCell className="text-xs">200</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">600</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">100</TableCell>
                      <TableCell className="text-xs">300</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">200</TableCell>
                      <TableCell className="text-xs">200</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">600</TableCell>
                    </TableRow>
                    <TableRow className="font-bold">
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">400</TableCell>
                      <TableCell className="text-xs">1,200</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">800</TableCell>
                      <TableCell className="text-xs">800</TableCell>
                      <TableCell className="text-xs">-</TableCell>
                      <TableCell className="text-xs">2,400</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus size={12} className="mr-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Label Position */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">라벨위치</CardTitle>
                <Button variant="ghost" size="sm">
                  <X size={14} />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <Upload size={24} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">라벨 위치 이미지를 업로드하세요</p>
                </div>
              </CardContent>
            </Card>

            {/* Fabric */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">원단</CardTitle>
                <Button variant="ghost" size="sm">
                  <X size={14} />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <Upload size={24} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">원단 이미지를 업로드하세요</p>
                </div>
              </CardContent>
            </Card>

            {/* Pattern */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">패턴</CardTitle>
                <Button variant="ghost" size="sm">
                  <X size={14} />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                  <Upload size={24} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">패턴 파일을 업로드하세요</p>
                </div>
              </CardContent>
            </Card>

            {/* Sub-materials */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">부자재</CardTitle>
                <Button variant="ghost" size="sm">
                  <X size={14} />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">품명</TableHead>
                      <TableHead className="text-xs">컬러</TableHead>
                      <TableHead className="text-xs">규격</TableHead>
                      <TableHead className="text-xs">수량</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs">주원단</TableCell>
                      <TableCell className="text-xs">그레이</TableCell>
                      <TableCell className="text-xs">9/16 in</TableCell>
                      <TableCell className="text-xs">4</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus size={12} className="mr-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Fabric Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">원단 정보</CardTitle>
                <Button variant="ghost" size="sm">
                  <X size={14} />
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">위치</TableHead>
                      <TableHead className="text-xs">업체/품명</TableHead>
                      <TableHead className="text-xs">색상</TableHead>
                      <TableHead className="text-xs">사이즈/단가</TableHead>
                      <TableHead className="text-xs">혼용률</TableHead>
                      <TableHead className="text-xs">요척</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-xs">앞쪽 포켓</TableCell>
                      <TableCell className="text-xs">패딧</TableCell>
                      <TableCell className="text-xs">화이트</TableCell>
                      <TableCell className="text-xs">60/6"/7,800</TableCell>
                      <TableCell className="text-xs">C|면</TableCell>
                      <TableCell className="text-xs">4y</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button variant="outline" size="sm" className="mt-3">
                  <Plus size={12} className="mr-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 