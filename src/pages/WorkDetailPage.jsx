import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/common.css';
import '../styles/work-detail.css';
import CustomCursor from '../components/CustomCursor';
import { projectDetails } from '../data/projectData';

function WorkDetailPage() {
  const { id } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navMode, setNavMode] = useState('light');
  const shapesRef = useRef([]);
  const scrollYRef = useRef(0);
  const currentScrollYRef = useRef(0);
  const rafIdRef = useRef(null);
  const footerRef = useRef(null);

  // 현재 프로젝트 데이터 가져오기
  const project = projectDetails[id] || projectDetails[1];

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

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/아이러시_회사소개서.pdf';
    link.download = '아이러시 회사소개서.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  }, [id]);

  // Floating Background Shapes Animation
  useEffect(() => {
    const shapes = document.querySelectorAll('.bg-shape');
    const shape1 = document.querySelector('.shape-1');
    const shape2 = document.querySelector('.shape-2');
    const shape3 = document.querySelector('.shape-3');

    if (shapes.length === 0) return;

    shapesRef.current = shapes;

    const updateShapes = () => {
      currentScrollYRef.current += (scrollYRef.current - currentScrollYRef.current) * 0.1;

      const scrollPercent = currentScrollYRef.current / (document.documentElement.scrollHeight - window.innerHeight);

      if (shape1) {
        const y1 = currentScrollYRef.current * 0.3;
        const x1 = Math.sin(scrollPercent * Math.PI * 2) * 50;
        shape1.style.transform = `translate(${x1}px, ${y1}px) scale(${1 + scrollPercent * 0.3})`;
      }

      if (shape2) {
        const y2 = -currentScrollYRef.current * 0.2;
        const x2 = Math.cos(scrollPercent * Math.PI * 2) * 80;
        shape2.style.transform = `translate(${x2}px, ${y2}px) scale(${1 - scrollPercent * 0.2})`;
      }

      if (shape3) {
        const y3 = currentScrollYRef.current * 0.15;
        const x3 = -currentScrollYRef.current * 0.1;
        shape3.style.transform = `translate(${x3}px, ${y3}px) rotate(${scrollPercent * 180}deg)`;
      }

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

    updateShapes();

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

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
            <a href="/아이러시_회사소개서.pdf" onClick={handleDownload} className="nav-btn">Company Brochure</a>
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
          <li><a href="/아이러시_회사소개서.pdf" onClick={handleDownload} className="mobile-btn">Company Brochure</a></li>
          <li><a href="#footer" className="mobile-btn primary" onClick={handleContactClick}>Contact Us</a></li>
        </ul>
      </div>

      {/* Back Button */}
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
          <h1 className="detail-title fade-up">{project.title}</h1>
        </section>

        {/* Project Overview */}
        <section className="content-section scroll-fade">
          <div className="section-header">
            <span className="section-tag">Project Overview</span>
          </div>
          <div className="overview-content">
            {project.overview.map((paragraph, index) => (
              <p key={index} className="overview-desc">{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Challenge Section */}
        <section className="content-section scroll-fade">
          <div className="section-header">
            <span className="section-tag">Challenge</span>
          </div>
          <div className="challenge-grid">
            {project.challenges.map((challenge, index) => (
              <div key={index} className="challenge-item">
                <h3 className="challenge-title" dangerouslySetInnerHTML={{ __html: challenge.title.replace(/\n/g, '<br/>') }} />
                <p className="challenge-desc">{challenge.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solution Section */}
        <section className="content-section scroll-fade">
          <div className="section-header">
            <span className="section-tag">Solution</span>
          </div>
          <div className="challenge-grid">
            {project.solutions.map((solution, index) => (
              <div key={index} className="challenge-item">
                <h3 className="challenge-title">{solution.title}</h3>
                <p className="challenge-desc">{solution.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Image Section */}
        <section className="content-section full-width scroll-fade">
          <div className="detail-image-wrapper">
            <img src={project.viewImage} alt={project.title} />
          </div>
        </section>

        {/* Customer Voice Section */}
        <section className="content-section dark-section scroll-fade">
          <div className="customer-voice">
            <span className="voice-tag">Customer Voice</span>
            <h2 className="voice-title">{project.customerVoice.title}</h2>
            <p className="voice-desc" dangerouslySetInnerHTML={{ __html: project.customerVoice.desc.replace(/\n/g, '<br/>') }} />
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

          <div className="footer-bottom">
            <p className="copyright">COPYRIGHT 2026. IRUSH. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default WorkDetailPage;
