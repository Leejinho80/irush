import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/work-detail.css';
import helloViewImg from '../assets/images/hello_view.png';
import brochurePdf from '../assets/(주)아이러시 회사소개서.pdf';
import CustomCursor from '../components/CustomCursor';

function WorkDetailPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navMode, setNavMode] = useState('light'); // work-detail은 light 배경으로 시작
  const shapesRef = useRef([]);
  const scrollYRef = useRef(0);
  const currentScrollYRef = useRef(0);
  const rafIdRef = useRef(null);
  const footerRef = useRef(null);

  // 메뉴 토글
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Contact 클릭 핸들러
  const handleContactClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  // body에 work-detail-page 클래스 추가 (스크롤 활성화)
  useEffect(() => {
    document.body.classList.add('is-work-detail-page');
    document.body.dataset.page = 'work-detail';
    return () => {
      document.body.classList.remove('is-work-detail-page');
      delete document.body.dataset.page;
    };
  }, []);

  // IntersectionObserver를 이용한 스크롤 페이드 효과
  useEffect(() => {
    const scrollElements = document.querySelectorAll('.scroll-fade, .content-section');

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    scrollElements.forEach(el => {
      scrollObserver.observe(el);
    });

    return () => {
      scrollElements.forEach(el => {
        scrollObserver.unobserve(el);
      });
    };
  }, []);

  // Floating Background Shapes Animation
  useEffect(() => {
    const shapes = document.querySelectorAll('.bg-shape');
    const shape1 = document.querySelector('.shape-1');
    const shape2 = document.querySelector('.shape-2');
    const shape3 = document.querySelector('.shape-3');

    if (shapes.length === 0) return;

    shapesRef.current = shapes;

    const updateShapes = () => {
      // Smooth interpolation
      currentScrollYRef.current += (scrollYRef.current - currentScrollYRef.current) * 0.1;

      const scrollPercent = currentScrollYRef.current / (document.documentElement.scrollHeight - window.innerHeight);

      // Shape 1: moves down and scales
      if (shape1) {
        const y1 = currentScrollYRef.current * 0.3;
        const x1 = Math.sin(scrollPercent * Math.PI * 2) * 50;
        shape1.style.transform = `translate(${x1}px, ${y1}px) scale(${1 + scrollPercent * 0.3})`;
      }

      // Shape 2: moves up and changes blur
      if (shape2) {
        const y2 = -currentScrollYRef.current * 0.2;
        const x2 = Math.cos(scrollPercent * Math.PI * 2) * 80;
        shape2.style.transform = `translate(${x2}px, ${y2}px) scale(${1 - scrollPercent * 0.2})`;
      }

      // Shape 3: diagonal movement
      if (shape3) {
        const y3 = currentScrollYRef.current * 0.15;
        const x3 = -currentScrollYRef.current * 0.1;
        shape3.style.transform = `translate(${x3}px, ${y3}px) rotate(${scrollPercent * 180}deg)`;
      }

      // Update blur and opacity based on scroll position
      shapes.forEach((shape, index) => {
        const blurBase = 80;
        const blurVariation = Math.sin(scrollPercent * Math.PI + index) * 40;
        const blur = blurBase + blurVariation;
        const opacity = 0.3 + Math.abs(Math.sin(scrollPercent * Math.PI * 2 + index)) * 0.2;

        shape.style.filter = `blur(${blur}px)`;
        shape.style.opacity = opacity;
      });

      rafIdRef.current = requestAnimationFrame(updateShapes);
    };

    // Start animation loop
    updateShapes();

    // Update scroll position
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mouse parallax effect (subtle) - only on desktop
    let mouseX = 0;
    let mouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let mouseRafId = null;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.02;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.02;
    };

    const updateMouseParallax = () => {
      currentMouseX += (mouseX - currentMouseX) * 0.05;
      currentMouseY += (mouseY - currentMouseY) * 0.05;

      shapes.forEach((shape, index) => {
        const factor = (index + 1) * 0.5;
        const currentTransform = shape.style.transform || '';
        if (!currentTransform.includes('translateX')) {
          shape.style.transform = currentTransform + ` translateX(${currentMouseX * factor}px) translateY(${currentMouseY * factor}px)`;
        }
      });

      mouseRafId = requestAnimationFrame(updateMouseParallax);
    };

    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', handleMouseMove);
      updateMouseParallax();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (mouseRafId) {
        cancelAnimationFrame(mouseRafId);
      }
    };
  }, []);

  return (
    <div className="work-detail-page">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Background Shapes */}
      <div className="bg-shapes">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      {/* Navigation */}
      <nav className={navMode === 'dark' ? 'dark-mode' : 'light-mode'}>
        <Link to="/" className="logo">iRUSH</Link>
        <div className="nav-right">
          <ul className="nav-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/work">Our Work</Link></li>
            <li><Link to="/trend">Trend Desk</Link></li>
          </ul>
          <div className="nav-buttons">
            <a href={brochurePdf} download="아이러시 회사소개서.pdf" className="nav-btn">Company Brochure</a>
            <a href="#footer" className="nav-btn primary" onClick={handleContactClick}>Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hamburger Button */}
      <div
        className={`hamburger ${navMode === 'dark' ? 'dark-mode' : 'light-mode'} ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/work" onClick={() => setMenuOpen(false)}>Our Work</Link></li>
          <li><Link to="/trend" onClick={() => setMenuOpen(false)}>Trend Desk</Link></li>
          <li><a href={brochurePdf} download="아이러시 회사소개서.pdf" className="mobile-btn">Company Brochure</a></li>
          <li><a href="#footer" className="mobile-btn primary" onClick={handleContactClick}>Contact Us</a></li>
        </ul>
      </div>

      {/* Back Button - Outside main for proper z-index */}
      <Link to="/work" className="back-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back to List</span>
      </Link>

      {/* Main Content */}
      <main className="detail-content">
        {/* Hero Section */}
        <section className="detail-hero">
          <h1 className="detail-title fade-up">LG헬로비전 모바일 직영몰 고도화</h1>
        </section>

        {/* Project Overview */}
        <section className="content-section scroll-fade">
          <div className="section-header">
            <span className="section-tag">Project Overview</span>
          </div>
          <div className="overview-content">
            <p className="overview-desc">
              LG헬로비전의 모바일 직영몰 고도화 프로젝트는 기존 모바일 서비스의 사용자 경험을 전면적으로 개선하고,
              최신 트렌드에 맞는 UI/UX를 적용하여 고객 만족도를 높이는 것을 목표로 진행되었습니다.
            </p>
            <p className="overview-desc">
              특히 모바일 환경에서의 직관적인 네비게이션과 간편한 결제 프로세스를 구현하여,
              고객이 원하는 상품을 빠르게 찾고 구매할 수 있도록 최적화하였습니다.
            </p>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="content-section scroll-fade">
          <div className="section-header">
            <span className="section-tag">Challenge</span>
          </div>
          <div className="challenge-grid">
            <div className="challenge-item">
              <h3 className="challenge-title">결제율+수익율<br/>문제+원인</h3>
              <p className="challenge-desc">기존 결제 프로세스의 복잡성으로 인한 이탈률 증가</p>
            </div>
            <div className="challenge-item">
              <h3 className="challenge-title">필요 정보는<br/>많지만 더보기</h3>
              <p className="challenge-desc">정보 과다로 인한 사용자 혼란 및 핵심 정보 접근성 저하</p>
            </div>
            <div className="challenge-item">
              <h3 className="challenge-title">선택을 어렵게만드는<br/>복잡한 상품 구성</h3>
              <p className="challenge-desc">다양한 요금제와 옵션으로 인한 의사결정 지연</p>
            </div>
            <div className="challenge-item">
              <h3 className="challenge-title">기존 고객의<br/>반복성 부족</h3>
              <p className="challenge-desc">재방문 유도 요소 부재로 인한 고객 유지율 하락</p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="content-section scroll-fade">
          <div className="section-header">
            <span className="section-tag">Solution</span>
          </div>
          <div className="challenge-grid">
            <div className="challenge-item">
              <h3 className="challenge-title">Dual Main</h3>
              <p className="challenge-desc">고객 니즈에 따라 직관적인 Dual Main 구조로 요금제 탐색과 가입을 동시에 진행</p>
            </div>
            <div className="challenge-item">
              <h3 className="challenge-title">Quick</h3>
              <p className="challenge-desc">빠른 상단 인터페이스로 핵심 정보에 즉시 접근 가능</p>
            </div>
            <div className="challenge-item">
              <h3 className="challenge-title">Empower</h3>
              <p className="challenge-desc">고객이 원하는 상품의 최적 옵션을 심플하게 구성</p>
            </div>
            <div className="challenge-item">
              <h3 className="challenge-title">Self-Driven</h3>
              <p className="challenge-desc">고객 스스로 가입 여정을 완수할 수 있도록 가이드 제공</p>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="content-section full-width scroll-fade">
          <div className="detail-image-wrapper">
            <img src={helloViewImg} alt="LG헬로비전 모바일 직영몰 상세" />
          </div>
        </section>

        {/* Customer Voice Section */}
        <section className="content-section dark-section scroll-fade">
          <div className="customer-voice">
            <span className="voice-tag">Customer Voice</span>
            <h2 className="voice-title">고객을 만나다.</h2>
            <p className="voice-desc">
              실제 사용자들의 피드백을 통해 서비스를 지속적으로 개선하고,<br/>
              고객 중심의 경험을 제공하기 위해 노력하고 있습니다.
            </p>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer id="footer" className="normal-footer">
        <div className="footer-content-main">
          <h2 className="footer-headline fade-up">Contact us anytime</h2>
          <p className="footer-subheadline fade-up">Write to us anytime for an instant response.</p>

          <div className="map-container scale-up">
            <iframe
              src="https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC+%EC%98%81%EC%8B%A0%EB%A1%9C+220+KNK%EB%94%94%EC%A7%80%ED%84%B8%ED%83%80%EC%9B%8C&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="iRush Location"
            />
          </div>

          <div className="contact-info fade-up">
            <div className="contact-item">
              <span className="contact-label">ADDRESS</span>
              <span className="contact-value">서울 영등포구 영신로 220 KnK디지털타워 604호</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">PHONE</span>
              <span className="contact-value">02-323-9030</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">E-MAIL</span>
              <span className="contact-value">info@irush.co.kr</span>
            </div>
          </div>

          <div className="footer-bottom fade-in">
            <p className="copyright">COPYRIGHT 2026. IRUSH. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default WorkDetailPage;
