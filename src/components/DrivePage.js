import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiFileText, FiFolder, FiStar, FiTrash2, FiSearch, FiPlus, FiGrid, FiList, FiMoreVertical, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const DriveContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const Sidebar = styled.div`
  width: 280px;
  background-color: ${props => props.theme.colors.surface};
  border-right: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: column;
`;

const UserProfile = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 5px;
`;

const UserType = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textTertiary};
`;

const Navigation = styled.nav`
  flex: 1;
  padding: 20px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
  padding-left: 8px;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceSecondary};
    color: ${props => props.theme.colors.text};
  }

  &.active {
    background-color: ${props => props.theme.colors.primary};
    color: #ffffff;
  }
`;

const NavIcon = styled.div`
  font-size: 18px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const StorageSection = styled.div`
  padding: 20px;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const StorageTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 10px;
`;

const StorageInfo = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textTertiary};
  margin-bottom: 15px;
`;

const StorageBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${props => props.theme.colors.surfaceSecondary};
  border-radius: 3px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const StorageProgress = styled.div`
  width: 8%;
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 3px;
`;

const UpgradeButton = styled.button`
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
  margin-bottom: 10px;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceSecondary};
    color: ${props => props.theme.colors.text};
  }
`;

const UpgradeText = styled.div`
  font-size: 11px;
  color: ${props => props.theme.colors.textTertiary};
  line-height: 1.4;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.theme.colors.surfaceSecondary};
  border-radius: 6px;
  padding: 10px 15px;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 14px;
  flex: 1;

  &::placeholder {
    color: ${props => props.theme.colors.textTertiary};
  }

  &:focus {
    outline: none;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceSecondary};
    color: ${props => props.theme.colors.text};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Banner = styled.div`
  background: ${props => props.theme.colors.accentGradient};
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
`;

const BannerText = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
`;

const BannerButton = styled.button`
  background-color: ${props => props.theme.colors.overlay};
  border: 1px solid ${props => props.theme.colors.overlayHover};
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.overlayHover};
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 5px;
`;

const ViewButton = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.surfaceSecondary};
  border: none;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primaryHover : props.theme.colors.border};
  }
`;

const FolderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const FolderItem = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    background-color: ${props => props.theme.colors.surfaceSecondary};
  }
`;

const FolderIcon = styled.div`
  font-size: 48px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
`;

const FolderName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 5px;
`;

const FolderInfo = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textTertiary};
`;

const FolderMenu = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
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

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const FileItem = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    background-color: ${props => props.theme.colors.surfaceSecondary};
  }
`;

const FileThumbnail = styled.div`
  width: 100%;
  height: 120px;
  background-color: ${props => props.theme.colors.surfaceSecondary};
  border-radius: 6px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textTertiary};
  font-size: 14px;
  position: relative;
`;

const FileType = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: ${props => props.theme.colors.primary};
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
`;

const FileExtension = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${props => props.theme.colors.surfaceSecondary};
  color: ${props => props.theme.colors.textTertiary};
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
`;

const FileName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: 5px;
  text-align: left;
`;

const FileInfo = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.textTertiary};
  text-align: left;
`;

const FileMenu = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
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

function DrivePage() {
  const [activeView, setActiveView] = useState('grid');
  const [activeNav, setActiveNav] = useState('홈');
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

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
    navigate('/work-order/1');
  };

  return (
    <DriveContainer theme={theme}>
      <Sidebar theme={theme}>
        <UserProfile theme={theme}>
          <Avatar theme={theme}>김</Avatar>
          <UserName theme={theme}>김한재</UserName>
          <UserType theme={theme}>카카오 로그인</UserType>
        </UserProfile>

        <Navigation>
          <NavItem 
            theme={theme}
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => setActiveNav('홈')}
          >
            <NavIcon>
              <FiHome />
            </NavIcon>
            <NavText>홈</NavText>
          </NavItem>
          <NavItem 
            theme={theme}
            className={location.pathname.includes('/work-order') ? 'active' : ''}
            onClick={() => setActiveNav('작업지시서')}
          >
            <NavIcon>
              <FiFileText />
            </NavIcon>
            <NavText>작업지시서</NavText>
          </NavItem>
          <NavItem 
            theme={theme}
            className={activeNav === '내 드라이브' ? 'active' : ''}
            onClick={() => setActiveNav('내 드라이브')}
          >
            <NavIcon>
              <FiFolder />
            </NavIcon>
            <NavText>내 드라이브</NavText>
          </NavItem>
          <NavItem 
            theme={theme}
            className={activeNav === '즐겨찾기' ? 'active' : ''}
            onClick={() => setActiveNav('즐겨찾기')}
          >
            <NavIcon>
              <FiStar />
            </NavIcon>
            <NavText>즐겨찾기</NavText>
          </NavItem>
          <NavItem 
            theme={theme}
            className={activeNav === '휴지통' ? 'active' : ''}
            onClick={() => setActiveNav('휴지통')}
          >
            <NavIcon>
              <FiTrash2 />
            </NavIcon>
            <NavText>휴지통</NavText>
          </NavItem>
        </Navigation>

        <StorageSection theme={theme}>
          <StorageTitle theme={theme}>저장용량</StorageTitle>
          <StorageInfo theme={theme}>1GB 중 80MB 사용</StorageInfo>
          <StorageBar theme={theme}>
            <StorageProgress theme={theme} />
          </StorageBar>
          <UpgradeButton theme={theme}>
            <FiPlus size={12} />
            저장공간 10GB 사용하기
          </UpgradeButton>
          <UpgradeText theme={theme}>
            Pro 요금제로 업그레이드하면 10GB 의 저장 공간을 사용할 수 있습니다.<br/>
            Pro 요금제 업그레이드 (출시 예정)
          </UpgradeText>
        </StorageSection>
      </Sidebar>

      <MainContent>
        <Header theme={theme}>
          <SearchBar theme={theme}>
            <FiSearch size={16} color={theme.colors.textTertiary} />
            <SearchInput theme={theme} placeholder="파일 제목을 검색하세요" />
          </SearchBar>
          <HeaderActions>
            <ThemeToggle theme={theme} onClick={theme.toggleTheme}>
              {theme.isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </ThemeToggle>
            <AddButton theme={theme}>
              <FiPlus size={16} />
              새 항목 추가
            </AddButton>
          </HeaderActions>
        </Header>

        <Content>
          <Banner theme={theme}>
            <BannerText>WiiVE, Creative한 발상의 전환</BannerText>
            <BannerButton theme={theme}>출시 예정 기능 보기</BannerButton>
          </Banner>

          <Section>
            <SectionHeader>
              <SectionTitle theme={theme}>최근 디자인</SectionTitle>
            </SectionHeader>
            <FolderGrid>
              {folders.map((folder, index) => (
                <FolderItem key={index} theme={theme}>
                  <FolderMenu theme={theme}>
                    <FiMoreVertical size={16} />
                  </FolderMenu>
                  <FolderIcon theme={theme}>📁</FolderIcon>
                  <FolderName theme={theme}>{folder.name}</FolderName>
                  <FolderInfo theme={theme}>{folder.count}개</FolderInfo>
                </FolderItem>
              ))}
            </FolderGrid>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle theme={theme}>전체</SectionTitle>
              <ViewToggle>
                <ViewButton 
                  theme={theme}
                  active={activeView === 'list'}
                  onClick={() => setActiveView('list')}
                >
                  <FiList size={16} />
                </ViewButton>
                <ViewButton 
                  theme={theme}
                  active={activeView === 'grid'}
                  onClick={() => setActiveView('grid')}
                >
                  <FiGrid size={16} />
                </ViewButton>
              </ViewToggle>
            </SectionHeader>
            <FileGrid>
              {files.map((file, index) => (
                <FileItem key={index} onClick={handleFileClick} theme={theme}>
                  <FileMenu theme={theme}>
                    <FiMoreVertical size={16} />
                  </FileMenu>
                  <FileThumbnail theme={theme}>
                    <FileType theme={theme}>{file.type}</FileType>
                    <FileExtension theme={theme}>{file.extension}</FileExtension>
                    <div style={{ fontSize: '24px', marginBottom: '5px' }}>👖</div>
                    <div>도식화</div>
                  </FileThumbnail>
                  <FileName theme={theme}>{file.name}</FileName>
                  <FileInfo theme={theme}>{file.type} • {file.extension}</FileInfo>
                </FileItem>
              ))}
            </FileGrid>
          </Section>
        </Content>
      </MainContent>
    </DriveContainer>
  );
}

export default DrivePage; 