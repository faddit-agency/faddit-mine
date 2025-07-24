import React, { useState } from 'react';

import styled from 'styled-components';
import { FiPlus, FiDownload, FiCloud, FiEdit3, FiShare, FiCalendar } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const BrowserHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  height: 40px;
`;

const BrowserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BrowserButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const BrowserNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: center;
`;

const BrowserTabs = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 0 20px;
`;

const Tab = styled.div`
  padding: 12px 20px;
  background-color: ${props => props.active ? props.theme.colors.background : 'transparent'};
  color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textSecondary};
  cursor: pointer;
  border-right: 1px solid ${props => props.theme.colors.border};
  font-size: 14px;
  position: relative;
  min-width: 200px;

  &:hover {
    background-color: ${props => props.active ? props.theme.colors.background : props.theme.colors.surfaceSecondary};
  }
`;

const TabClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textTertiary};
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
  font-size: 12px;

  &:hover {
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.surfaceSecondary};
  }
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const AppTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceSecondary};
    color: ${props => props.theme.colors.text};
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 350px;
  background-color: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  overflow-y: auto;
  padding: 20px;
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: ${props => props.theme.colors.surfaceSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textTertiary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background-color: ${props => props.theme.colors.surfaceSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceSecondary};
    color: ${props => props.theme.colors.text};
  }
`;

const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const Toggle = styled.div`
  width: 40px;
  height: 20px;
  background-color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surfaceSecondary};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '22px' : '2px'};
    width: 16px;
    height: 16px;
    background-color: #ffffff;
    border-radius: 50%;
    transition: all 0.2s;
  }
`;

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
`;

const Panel = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  position: relative;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const PanelTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const PanelClose = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textTertiary};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.surfaceSecondary};
  }
`;

const UploadArea = styled.div`
  border: 2px dashed ${props => props.theme.colors.border};
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  background-color: ${props => props.theme.colors.surfaceSecondary};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.surface};
  }
`;

const UploadText = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 14px;
  margin-bottom: 10px;
`;

const UploadIcon = styled.div`
  font-size: 24px;
  color: ${props => props.theme.colors.textTertiary};
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  background-color: ${props => props.theme.colors.surfaceSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textTertiary};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  background-color: ${props => props.theme.colors.surfaceSecondary};
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-size: 12px;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  font-size: 12px;
`;

const DateInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DateIcon = styled.div`
  position: absolute;
  right: 12px;
  color: ${props => props.theme.colors.textTertiary};
`;

function WorkOrderDetail() {
  const theme = useTheme();
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
    <Container theme={theme}>
      <BrowserHeader theme={theme}>
        <BrowserControls>
          <BrowserButton color="#ff5f57" />
          <BrowserButton color="#febc2e" />
          <BrowserButton color="#28c840" />
        </BrowserControls>
        <BrowserNavigation>
          <span style={{ color: theme.colors.textSecondary }}>○ 세부정보</span>
        </BrowserNavigation>
        <div style={{ display: 'flex', gap: '10px' }}>
          <FiDownload size={16} color={theme.colors.textSecondary} />
          <FiPlus size={16} color={theme.colors.textSecondary} />
          <div style={{ width: '16px', height: '16px', border: `1px solid ${theme.colors.border}` }} />
        </div>
      </BrowserHeader>

      <BrowserTabs theme={theme}>
        {tabs.map((tab, index) => (
          <Tab 
            key={index}
            theme={theme}
            active={tab === activeTab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <TabClose theme={theme}>×</TabClose>
          </Tab>
        ))}
      </BrowserTabs>

      <AppHeader theme={theme}>
        <AppTitle>
          <Title theme={theme}>2025 F/W 프라다</Title>
          <Status theme={theme}>
            <FiCloud size={14} />
            드라이브에 저장됨
          </Status>
        </AppTitle>
        <HeaderActions>
          <ActionButton theme={theme}>
            <FiEdit3 size={14} />
            화면 편집
          </ActionButton>
          <ShareButton theme={theme}>
            <FiShare size={14} />
            Share
          </ShareButton>
        </HeaderActions>
      </AppHeader>

      <Content>
        <Sidebar theme={theme}>
          <ToggleSwitch>
            <ToggleLabel theme={theme}>세부정보</ToggleLabel>
            <Toggle active={showDetails} onClick={() => setShowDetails(!showDetails)} />
          </ToggleSwitch>

          <Section>
            <SectionTitle theme={theme}>
              기본 정보
              <AddButton theme={theme}>
                <FiPlus size={12} />
              </AddButton>
            </SectionTitle>
            
            <FormGroup>
              <Label theme={theme}>브랜드</Label>
              <Input 
                theme={theme}
                value={basicInfo.brand} 
                onChange={(e) => setBasicInfo({...basicInfo, brand: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>아이템</Label>
              <Select 
                theme={theme}
                value={basicInfo.item} 
                onChange={(e) => setBasicInfo({...basicInfo, item: e.target.value})}
              >
                <option value="남성자켓">남성자켓</option>
                <option value="여성자켓">여성자켓</option>
                <option value="남성셔츠">남성셔츠</option>
                <option value="여성셔츠">여성셔츠</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>성별</Label>
              <Select 
                theme={theme}
                value={basicInfo.gender} 
                onChange={(e) => setBasicInfo({...basicInfo, gender: e.target.value})}
              >
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="공용">공용</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>카테고리</Label>
              <Select 
                theme={theme}
                value={basicInfo.category} 
                onChange={(e) => setBasicInfo({...basicInfo, category: e.target.value})}
              >
                <option value="상의">상의</option>
                <option value="하의">하의</option>
                <option value="아우터">아우터</option>
                <option value="신발">신발</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>의류</Label>
              <Select 
                theme={theme}
                value={basicInfo.apparel} 
                onChange={(e) => setBasicInfo({...basicInfo, apparel: e.target.value})}
              >
                <option value="셔츠">셔츠</option>
                <option value="자켓">자켓</option>
                <option value="코트">코트</option>
                <option value="니트">니트</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>시즌</Label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Input 
                  theme={theme}
                  value={basicInfo.season} 
                  onChange={(e) => setBasicInfo({...basicInfo, season: e.target.value})}
                  style={{ flex: 1 }}
                />
                <Select 
                  theme={theme}
                  value={basicInfo.seasonType} 
                  onChange={(e) => setBasicInfo({...basicInfo, seasonType: e.target.value})}
                  style={{ width: '80px' }}
                >
                  <option value="S/S">S/S</option>
                  <option value="F/W">F/W</option>
                </Select>
              </div>
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle theme={theme}>
              추가 정보
              <AddButton theme={theme}>
                <FiPlus size={12} />
              </AddButton>
            </SectionTitle>
            
            <FormGroup>
              <Label theme={theme}>품명</Label>
              <Input 
                theme={theme}
                value={additionalInfo.productName} 
                onChange={(e) => setAdditionalInfo({...additionalInfo, productName: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>샘플 번호</Label>
              <Input 
                theme={theme}
                value={additionalInfo.sampleNumber} 
                onChange={(e) => setAdditionalInfo({...additionalInfo, sampleNumber: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>제품 번호</Label>
              <Input 
                theme={theme}
                value={additionalInfo.productNumber} 
                onChange={(e) => setAdditionalInfo({...additionalInfo, productNumber: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>생산처</Label>
              <Input 
                theme={theme}
                value={additionalInfo.manufacturer} 
                onChange={(e) => setAdditionalInfo({...additionalInfo, manufacturer: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>의뢰일</Label>
              <DateInput>
                <Input 
                  theme={theme}
                  type="date"
                  value={additionalInfo.requestDate} 
                  onChange={(e) => setAdditionalInfo({...additionalInfo, requestDate: e.target.value})}
                />
                <DateIcon theme={theme}>
                  <FiCalendar size={14} />
                </DateIcon>
              </DateInput>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>납기일</Label>
              <DateInput>
                <Input 
                  theme={theme}
                  type="date"
                  value={additionalInfo.deliveryDate} 
                  onChange={(e) => setAdditionalInfo({...additionalInfo, deliveryDate: e.target.value})}
                />
                <DateIcon theme={theme}>
                  <FiCalendar size={14} />
                </DateIcon>
              </DateInput>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>담당자 1</Label>
              <Input 
                theme={theme}
                value={additionalInfo.contact1} 
                onChange={(e) => setAdditionalInfo({...additionalInfo, contact1: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>담당자 2</Label>
              <Input 
                theme={theme}
                value={additionalInfo.contact2} 
                onChange={(e) => setAdditionalInfo({...additionalInfo, contact2: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>담당자 3</Label>
              <Input 
                theme={theme}
                value={additionalInfo.contact3} 
                onChange={(e) => setAdditionalInfo({...additionalInfo, contact3: e.target.value})}
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>연락처</Label>
              <Input 
                theme={theme}
                value={additionalInfo.contactInfo} 
                onChange={(e) => setAdditionalInfo({...additionalInfo, contactInfo: e.target.value})}
              />
            </FormGroup>
          </Section>
        </Sidebar>

        <MainContent>
          <PanelGrid>
            <Panel theme={theme}>
              <PanelHeader>
                <PanelTitle theme={theme}>도식화</PanelTitle>
                <PanelClose theme={theme}>×</PanelClose>
              </PanelHeader>
              <UploadArea theme={theme}>
                <UploadIcon>+</UploadIcon>
                <UploadText theme={theme}>도식화 이미지를 업로드하세요</UploadText>
              </UploadArea>
              <ActionButton theme={theme} style={{ marginTop: '10px' }}>
                <FiEdit3 size={14} />
                Edit Mode
              </ActionButton>
            </Panel>

            <Panel theme={theme}>
              <PanelHeader>
                <PanelTitle theme={theme}>작업 시 주의사항</PanelTitle>
                <PanelClose theme={theme}>×</PanelClose>
              </PanelHeader>
              <TextArea 
                theme={theme}
                placeholder="작업 시 주의사항을 입력하세요"
              />
            </Panel>

            <Panel theme={theme}>
              <PanelHeader>
                <PanelTitle theme={theme}>Size Spec cm/단면</PanelTitle>
                <PanelClose theme={theme}>×</PanelClose>
              </PanelHeader>
              <Table>
                <thead>
                  <tr>
                    <Th theme={theme}>XS</Th>
                    <Th theme={theme}>S</Th>
                    <Th theme={theme}>M</Th>
                    <Th theme={theme}>L</Th>
                    <Th theme={theme}>XL</Th>
                    <Th theme={theme}>+</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>100</Td>
                    <Td theme={theme}>300</Td>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>200</Td>
                    <Td theme={theme}>-</Td>
                  </tr>
                </tbody>
              </Table>
              <AddButton theme={theme} style={{ marginTop: '10px' }}>
                <FiPlus size={12} />
              </AddButton>
            </Panel>

            <Panel theme={theme}>
              <PanelHeader>
                <PanelTitle theme={theme}>색상/사이즈 별 수량</PanelTitle>
                <PanelClose theme={theme}>×</PanelClose>
              </PanelHeader>
              <Table>
                <thead>
                  <tr>
                    <Th theme={theme}>XS</Th>
                    <Th theme={theme}>S</Th>
                    <Th theme={theme}>M</Th>
                    <Th theme={theme}>L</Th>
                    <Th theme={theme}>XL</Th>
                    <Th theme={theme}>2XL</Th>
                    <Th theme={theme}>+</Th>
                    <Th theme={theme}>Total</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>100</Td>
                    <Td theme={theme}>300</Td>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>200</Td>
                    <Td theme={theme}>200</Td>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>600</Td>
                  </tr>
                  <tr>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>100</Td>
                    <Td theme={theme}>300</Td>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>200</Td>
                    <Td theme={theme}>200</Td>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>600</Td>
                  </tr>
                  <tr>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>100</Td>
                    <Td theme={theme}>300</Td>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>200</Td>
                    <Td theme={theme}>200</Td>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>600</Td>
                  </tr>
                  <tr style={{ fontWeight: 'bold', color: theme.colors.text }}>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>400</Td>
                    <Td theme={theme}>1,200</Td>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>800</Td>
                    <Td theme={theme}>800</Td>
                    <Td theme={theme}>-</Td>
                    <Td theme={theme}>2,400</Td>
                  </tr>
                </tbody>
              </Table>
              <AddButton theme={theme} style={{ marginTop: '10px' }}>
                <FiPlus size={12} />
              </AddButton>
            </Panel>

            <Panel theme={theme}>
              <PanelHeader>
                <PanelTitle theme={theme}>라벨위치</PanelTitle>
                <PanelClose theme={theme}>×</PanelClose>
              </PanelHeader>
              <UploadArea theme={theme}>
                <UploadIcon>+</UploadIcon>
                <UploadText theme={theme}>라벨 위치 이미지를 업로드하세요</UploadText>
              </UploadArea>
            </Panel>

            <Panel theme={theme}>
              <PanelHeader>
                <PanelTitle theme={theme}>원단</PanelTitle>
                <PanelClose theme={theme}>×</PanelClose>
              </PanelHeader>
              <UploadArea theme={theme}>
                <UploadIcon>+</UploadIcon>
                <UploadText theme={theme}>원단 이미지를 업로드하세요</UploadText>
              </UploadArea>
            </Panel>

            <Panel theme={theme}>
              <PanelHeader>
                <PanelTitle theme={theme}>패턴</PanelTitle>
                <PanelClose theme={theme}>×</PanelClose>
              </PanelHeader>
              <UploadArea theme={theme}>
                <UploadIcon>+</UploadIcon>
                <UploadText theme={theme}>패턴 파일을 업로드하세요</UploadText>
              </UploadArea>
            </Panel>

            <Panel theme={theme}>
              <PanelHeader>
                <PanelTitle theme={theme}>부자재</PanelTitle>
                <PanelClose theme={theme}>×</PanelClose>
              </PanelHeader>
              <Table>
                <thead>
                  <tr>
                    <Th theme={theme}>품명</Th>
                    <Th theme={theme}>컬러</Th>
                    <Th theme={theme}>규격</Th>
                    <Th theme={theme}>수량</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td theme={theme}>주원단</Td>
                    <Td theme={theme}>그레이</Td>
                    <Td theme={theme}>9/16 in</Td>
                    <Td theme={theme}>4</Td>
                  </tr>
                </tbody>
              </Table>
              <AddButton theme={theme} style={{ marginTop: '10px' }}>
                <FiPlus size={12} />
              </AddButton>
            </Panel>

            <Panel theme={theme}>
              <PanelHeader>
                <PanelTitle theme={theme}>원단 정보</PanelTitle>
                <PanelClose theme={theme}>×</PanelClose>
              </PanelHeader>
              <Table>
                <thead>
                  <tr>
                    <Th theme={theme}>위치</Th>
                    <Th theme={theme}>업체/품명</Th>
                    <Th theme={theme}>색상</Th>
                    <Th theme={theme}>사이즈/단가</Th>
                    <Th theme={theme}>혼용률</Th>
                    <Th theme={theme}>요척</Th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <Td theme={theme}>앞쪽 포켓</Td>
                    <Td theme={theme}>패딧</Td>
                    <Td theme={theme}>화이트</Td>
                    <Td theme={theme}>60/6&quot;/7,800</Td>
                    <Td theme={theme}>C|면</Td>
                    <Td theme={theme}>4y</Td>
                  </tr>
                </tbody>
              </Table>
              <AddButton theme={theme} style={{ marginTop: '10px' }}>
                <FiPlus size={12} />
              </AddButton>
            </Panel>
          </PanelGrid>
        </MainContent>
      </Content>
    </Container>
  );
}

export default WorkOrderDetail; 