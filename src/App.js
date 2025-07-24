import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from './contexts/ThemeContext';
import DrivePage from './components/DrivePage';
import WorkOrderDetail from './components/WorkOrderDetail';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/" element={<DrivePage />} />
            <Route path="/work-order/:id" element={<WorkOrderDetail />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App; 