import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/main.css';
import brochurePdf from '../assets/(주)아이러시 회사소개서.pdf';
import CustomCursor from '../components/CustomCursor';

function MainPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navMode, setNavMode] = useState('dark-mode');
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const touchStartY = useRef(0);

  const sections = ['hero', 'fever', 'bliss', 'faith', 'footer'];

  // Set body styles for Main page
  useEffect(() => {
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.body.style.overflow = 'hidden';
    document.body.style.background = '#000';
    document.body.style.color = '';
    document.body.dataset.page = 'main';

    return () => {
      document.body.style.fontFamily = '';
      document.body.style.overflow = '';
      document.body.style.background = '';
      delete document.body.dataset.page;
    };
  }, []);

  useEffect(() => {
    // Create particles
    createParticles('fever-particles', 80);
    createParticles('bliss-particles', 80, 'var(--cyan)');
    createParticles('faith-particles', 80, 'var(--purple)');
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      // 모바일 브라우저의 동적 뷰포트를 고려하여 실제 높이 사용
      const sectionHeight = window.innerHeight;
      containerRef.current.style.transform = `translateY(-${currentSection * sectionHeight}px)`;
    }

    // Update nav mode based on section
    if (currentSection === 4) {
      setNavMode('light-mode');
    } else {
      setNavMode('dark-mode');
    }
  }, [currentSection]);

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length || isScrolling) return;

    setIsScrolling(true);
    setCurrentSection(index);

    setTimeout(() => {
      setIsScrolling(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToSection(currentSection - 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = (e) => {
    if (isScrolling) return;

    const touchEndY = e.changedTouches[0].screenY;
    const swipeDistance = touchStartY.current - touchEndY;
    const swipeThreshold = 50;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        scrollToSection(currentSection + 1);
      } else {
        scrollToSection(currentSection - 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isScrolling]);

  // 창 크기 변경 시 섹션 위치 재조정
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const sectionHeight = window.innerHeight;
        containerRef.current.style.transform = `translateY(-${currentSection * sectionHeight}px)`;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [currentSection]);

  // Wheel 이벤트 리스너 (passive: false로 설정하여 preventDefault 가능)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wheelHandler = (e) => {
      // Footer 섹션이 아닐 때만 기본 스크롤 막기
      if (currentSection !== 4) {
        e.preventDefault();
      }

      if (isScrolling) return;

      if (e.deltaY > 0) {
        scrollToSection(currentSection + 1);
      } else {
        scrollToSection(currentSection - 1);
      }
    };

    container.addEventListener('wheel', wheelHandler, { passive: false });
    return () => container.removeEventListener('wheel', wheelHandler);
  }, [currentSection, isScrolling]);

  const createParticles = (containerId, count, color) => {
    const container = document.getElementById(containerId);
    if (!container || container.children.length > 0) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const angle = Math.random() * Math.PI * 2;
      const distance = 200 + Math.random() * 400;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.animationDelay = `${Math.random() * 4}s`;

      if (color) {
        particle.style.background = color;
      }

      container.appendChild(particle);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    scrollToSection(4);
  };

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <nav className={navMode}>
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
      <div className={`hamburger ${isMenuOpen ? 'active' : ''} ${navMode}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/work" onClick={() => setIsMenuOpen(false)}>Our Work</Link></li>
          <li><Link to="/trend" onClick={() => setIsMenuOpen(false)}>Trend Desk</Link></li>
          <li><a href={brochurePdf} download="아이러시 회사소개서.pdf" className="mobile-btn">Company Brochure</a></li>
          <li><a href="#footer" className="mobile-btn primary" onClick={handleContactClick}>Contact Us</a></li>
        </ul>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" data-current-section={sections[currentSection]}>
        {sections.map((section, index) => (
          <div
            key={index}
            className={`scroll-dot ${currentSection === index ? 'active' : ''}`}
            data-section={section}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </div>

      {/* Main Container */}
      <div
        className="container"
        id="main-container"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Section 1: Hero */}
        <section id="hero" className="main-hero">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="triangle triangle-1"></div>
          <div className="triangle triangle-2"></div>

          <div className="hero-content">
            <h1 className="hero-title">
              <span><span className="highlight highlight-fever">FEVER</span> TO CREATE</span>
              <span><span className="highlight highlight-bliss">BLISS</span> TO DELIVER</span>
              <span><span className="highlight highlight-faith">FAITH</span> TO SUCCEED</span>
            </h1>
          </div>
          <div className="scroll-down-icon" onClick={() => scrollToSection(1)}>
            <span>Scroll</span>
            <div className="scroll-mouse"></div>
          </div>
        </section>

        {/* Section 2: Fever */}
        <section id="fever">
          <div className="fever-float-triangle fever-float-triangle-1"></div>
          <div className="fever-float-triangle fever-float-triangle-2"></div>
          <div className="fever-float-triangle fever-float-triangle-3"></div>
          <div className="fever-float-triangle fever-float-triangle-4"></div>
          <div className="fever-float-triangle fever-float-triangle-5"></div>
          <div className="fever-float-triangle fever-float-triangle-6"></div>

          <div className="fever-orbit">
            <div className="fever-orbit-dot fever-orbit-dot-1"></div>
            <div className="fever-orbit-dot fever-orbit-dot-2"></div>
            <div className="fever-orbit-dot fever-orbit-dot-3"></div>
            <div className="fever-orbit-dot fever-orbit-dot-4"></div>
          </div>
          <div className="fever-orbit fever-orbit-2">
            <div className="fever-orbit-dot fever-orbit-dot-1"></div>
            <div className="fever-orbit-dot fever-orbit-dot-2"></div>
            <div className="fever-orbit-dot fever-orbit-dot-3"></div>
            <div className="fever-orbit-dot fever-orbit-dot-4"></div>
          </div>

          <div className="fever-border fever-border-1">
            <svg viewBox="0 0 100 87" fill="none">
              <polygon points="50,5 95,82 5,82" stroke="var(--yellow)" strokeWidth="0.5" fill="none"/>
            </svg>
          </div>
          <div className="fever-border fever-border-2">
            <svg viewBox="0 0 100 87" fill="none">
              <polygon points="50,5 95,82 5,82" stroke="var(--yellow)" strokeWidth="0.5" fill="none"/>
            </svg>
          </div>
          <div className="fever-border fever-border-3">
            <svg viewBox="0 0 100 87" fill="none">
              <polygon points="50,5 95,82 5,82" stroke="var(--yellow)" strokeWidth="0.5" fill="none"/>
            </svg>
          </div>
          <div className="fever-border fever-border-4">
            <svg viewBox="0 0 100 87" fill="none">
              <polygon points="50,5 95,82 5,82" stroke="var(--yellow)" strokeWidth="0.5" fill="none"/>
            </svg>
          </div>

          <div id="fever-particles"></div>

          <div className="section-content">
            <div className="section-icon">
              <svg viewBox="0 0 100 100" fill="none">
                <polygon points="50,10 90,80 10,80" fill="var(--yellow)"/>
                <polygon points="50,30 75,70 25,70" fill="var(--orange)"/>
              </svg>
            </div>
            <h2 className="section-title">Fever</h2>
            <p className="section-subtitle">Over 20 Years of Passion</p>
            <div className="section-stat">20+</div>
          </div>
        </section>

        {/* Section 3: Bliss */}
        <section id="bliss">
          <div className="bliss-circle bliss-circle-1"></div>
          <div className="bliss-circle bliss-circle-2"></div>
          <div className="bliss-circle bliss-circle-3"></div>
          <div className="bliss-circle bliss-circle-4"></div>
          <div className="bliss-circle bliss-circle-5"></div>
          <div className="bliss-circle bliss-circle-6"></div>

          <div className="bliss-orbit">
            <div className="orbit-dot orbit-dot-1"></div>
            <div className="orbit-dot orbit-dot-2"></div>
            <div className="orbit-dot orbit-dot-3"></div>
            <div className="orbit-dot orbit-dot-4"></div>
          </div>
          <div className="bliss-orbit bliss-orbit-2">
            <div className="orbit-dot orbit-dot-1"></div>
            <div className="orbit-dot orbit-dot-2"></div>
            <div className="orbit-dot orbit-dot-3"></div>
            <div className="orbit-dot orbit-dot-4"></div>
          </div>

          <div className="bliss-ring bliss-ring-1"></div>
          <div className="bliss-ring bliss-ring-2"></div>
          <div className="bliss-ring bliss-ring-3"></div>
          <div className="bliss-ring bliss-ring-4"></div>

          <div id="bliss-particles"></div>

          <div className="section-content">
            <div className="section-icon">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="35" fill="var(--cyan)" opacity="0.8"/>
                <circle cx="50" cy="50" r="25" fill="var(--cyan-light)"/>
              </svg>
            </div>
            <h2 className="section-title">Bliss</h2>
            <p className="section-subtitle">Pure Bliss Through 500+ Challenges</p>
            <div className="section-stat">500+</div>
          </div>
        </section>

        {/* Section 4: Faith */}
        <section id="faith">
          <div className="faith-float-square faith-float-square-1"></div>
          <div className="faith-float-square faith-float-square-2"></div>
          <div className="faith-float-square faith-float-square-3"></div>
          <div className="faith-float-square faith-float-square-4"></div>
          <div className="faith-float-square faith-float-square-5"></div>
          <div className="faith-float-square faith-float-square-6"></div>

          <div className="faith-orbit">
            <div className="faith-orbit-dot faith-orbit-dot-1"></div>
            <div className="faith-orbit-dot faith-orbit-dot-2"></div>
            <div className="faith-orbit-dot faith-orbit-dot-3"></div>
            <div className="faith-orbit-dot faith-orbit-dot-4"></div>
          </div>
          <div className="faith-orbit faith-orbit-2">
            <div className="faith-orbit-dot faith-orbit-dot-1"></div>
            <div className="faith-orbit-dot faith-orbit-dot-2"></div>
            <div className="faith-orbit-dot faith-orbit-dot-3"></div>
            <div className="faith-orbit-dot faith-orbit-dot-4"></div>
          </div>

          <div className="faith-border faith-border-1"></div>
          <div className="faith-border faith-border-2"></div>
          <div className="faith-border faith-border-3"></div>
          <div className="faith-border faith-border-4"></div>

          <div id="faith-particles"></div>

          <div className="section-content">
            <div className="section-icon">
              <svg viewBox="0 0 100 100" fill="none">
                <rect x="20" y="20" width="60" height="60" stroke="var(--purple)" strokeWidth="3" fill="none" transform="rotate(45 50 50)"/>
                <rect x="30" y="30" width="40" height="40" fill="var(--purple-light)" transform="rotate(45 50 50)"/>
              </svg>
            </div>
            <h2 className="section-title">Faith</h2>
            <p className="section-subtitle">100% Faith Delivers Proven Satisfaction</p>
            <div className="section-stat">100%</div>
          </div>
        </section>

        {/* Section 5: Footer */}
        <section id="footer" className="fullpage-footer">
          <div className="footer-content-main">
            <h2 className="footer-headline">Contact us anytime</h2>
            <p className="footer-subheadline">Write to us anytime for an instant response.</p>

            <div className="map-container">
              <iframe
                src="https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC+%EC%98%81%EC%8B%A0%EB%A1%9C+220+KNK%EB%94%94%EC%A7%80%ED%84%B8%ED%83%80%EC%9B%8C&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="contact-info">
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
        </section>
      </div>
    </>
  );
}

export default MainPage;
