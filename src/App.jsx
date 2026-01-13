import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import WorkPage from './pages/WorkPage';
import WorkDetailPage from './pages/WorkDetailPage';
import TrendPage from './pages/TrendPage';

// 페이지 전환 시 초기화를 담당하는 컴포넌트
function PageReset() {
  const location = useLocation();

  useEffect(() => {
    // 페이지 전환 시 body 클래스 및 스크롤 초기화
    document.body.classList.remove('scroll-locked', 'is-work-page', 'is-work-detail-page', 'is-trend-page');
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <PageReset />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work-detail" element={<WorkDetailPage />} />
        <Route path="/trend" element={<TrendPage />} />
      </Routes>
    </Router>
  );
}

export default App;
