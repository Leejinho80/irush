import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/about.css';
import clientLogo from '../assets/images/client_logo.png';
import brochurePdf from '../assets/(주)아이러시 회사소개서.pdf';
import researchImg from '../assets/images/reserch.png';
import conceptImg from '../assets/images/concept.png';
import designImg from '../assets/images/design.png';
import CustomCursor from '../components/CustomCursor';

function AboutPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);

  const sectionIds = ['hero', 'section1', 'section2', 'section3', 'research', 'concept', 'design', 'footer'];

  // Set body data-page attribute
  useEffect(() => {
    document.body.dataset.page = 'about';
    return () => {
      delete document.body.dataset.page;
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      // window.innerHeight 사용하여 모바일 브라우저 동적 뷰포트 대응
      const sectionHeight = window.innerHeight;
      containerRef.current.style.transform = `translateY(-${currentSection * sectionHeight}px)`;
    }

    // Trigger animations for current section
    const currentSectionElement = document.querySelectorAll('section')[currentSection];
    if (currentSectionElement) {
      const animatedElements = currentSectionElement.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right, .scale-up, .stagger-item');
      animatedElements.forEach(el => {
        if (!el.classList.contains('active')) {
          el.classList.add('active');
        }
      });
    }

    // Update scroll progress
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
      const progress = (currentSection / (sectionIds.length - 1)) * 100;
      scrollProgress.style.width = progress + '%';
    }
  }, [currentSection]);

  // 화면 크기 변경 시 섹션 위치 재계산
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

  const scrollToSection = (index) => {
    if (index < 0 || index >= sectionIds.length || isScrolling) return;

    setIsScrolling(true);
    setCurrentSection(index);

    setTimeout(() => {
      setIsScrolling(false);
    }, 1200);
  };

  const handleWheel = (e) => {
    if (isScrolling) return;

    // section2 (index 2)에서 내부 스크롤 처리
    if (currentSection === 2) {
      const section2 = document.getElementById('section2');
      if (section2) {
        const isAtBottom = section2.scrollTop + section2.clientHeight >= section2.scrollHeight - 10;
        const isAtTop = section2.scrollTop <= 10;

        // 아래로 스크롤하는데 아직 바닥에 도달하지 않았으면 내부 스크롤
        if (e.deltaY > 0 && !isAtBottom) {
          return; // 기본 스크롤 허용
        }
        // 위로 스크롤하는데 아직 맨 위에 도달하지 않았으면 내부 스크롤
        if (e.deltaY < 0 && !isAtTop) {
          return; // 기본 스크롤 허용
        }
      }
    }

    if (e.deltaY > 0) {
      scrollToSection(currentSection + 1);
    } else {
      scrollToSection(currentSection - 1);
    }
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

    // section2 (index 2)에서 내부 스크롤 처리
    if (currentSection === 2) {
      const section2 = document.getElementById('section2');
      if (section2) {
        const isAtBottom = section2.scrollTop + section2.clientHeight >= section2.scrollHeight - 10;
        const isAtTop = section2.scrollTop <= 10;

        if (swipeDistance > 0 && !isAtBottom) {
          return;
        }
        if (swipeDistance < 0 && !isAtTop) {
          return;
        }
      }
    }

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
    document.body.classList.add('loaded');
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isScrolling]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    scrollToSection(sectionIds.length - 1);
  };

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <div className="scroll-progress"></div>

      {/* Navigation */}
      <nav>
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
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
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
      <div className="scroll-indicator">
        {sectionIds.map((_, index) => (
          <div
            key={index}
            className={`scroll-dot ${currentSection === index ? 'active' : ''}`}
            data-section={index}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </div>

      {/* Main Container */}
      <div
        className="container"
        id="main-container"
        ref={containerRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Hero Section */}
        <section id="hero">
          <div className="triangle-float" style={{ width: '300px', height: '260px', background: 'var(--yellow)', top: '10%', left: '5%', animationDelay: '0s' }}></div>
          <div className="triangle-float" style={{ width: '200px', height: '173px', background: 'var(--pink)', bottom: '15%', right: '10%', animationDelay: '2s' }}></div>
          <div className="triangle-float" style={{ width: '250px', height: '217px', background: 'var(--orange)', top: '50%', right: '5%', animationDelay: '4s' }}></div>

          <div className="triangle-border" style={{ animationDelay: '0s' }}>
            <svg viewBox="0 0 100 87" fill="none">
              <polygon points="50,5 95,82 5,82" stroke="var(--yellow)" strokeWidth="0.5" fill="none"/>
            </svg>
          </div>
          <div className="triangle-border" style={{ animationDelay: '1.5s' }}>
            <svg viewBox="0 0 100 87" fill="none">
              <polygon points="50,5 95,82 5,82" stroke="var(--orange)" strokeWidth="0.5" fill="none"/>
            </svg>
          </div>
          <div className="triangle-border" style={{ animationDelay: '3s' }}>
            <svg viewBox="0 0 100 87" fill="none">
              <polygon points="50,5 95,82 5,82" stroke="var(--pink)" strokeWidth="0.5" fill="none"/>
            </svg>
          </div>

          <div className="hero-content">
            <h1 className="hero-title fade-up">
              Spark your brand's<br/>
              <span className="highlight">imaginative flair</span>
              with us
            </h1>
            <p className="hero-subtitle fade-up">
              우리의 오랜 경험을 통한 전략, 디자인, 기술로<br/>
              당신의 브랜드에 새로운 가치를 만들어보세요.
            </p>
          </div>
          <div className="scroll-down-icon">
            <span>Scroll</span>
            <div className="scroll-mouse"></div>
          </div>
        </section>

        {/* Section 1: Platform Challenge */}
        <section id="section1">
          <div className="triangle-float" style={{ width: '280px', height: '243px', background: 'var(--yellow)', top: '5%', right: '5%', animationDelay: '1s' }}></div>
          <div className="triangle-float" style={{ width: '220px', height: '191px', background: 'var(--orange)', bottom: '10%', left: '8%', animationDelay: '3s' }}></div>

          <div className="section-content">
            <h2 className="section-title fade-up">20+</h2>
            <p className="section-text fade-up">
              우리는 2002년에 설립된 24년차 에어전시입니다.<br/>
              <strong>최고의 디지털 경험 제공을 위해 아직도 성장중입니다.</strong>
            </p>

            <div className="experience-badge fade-up">
              <div className="experience-symbol">
                <div className="badge-sparkle"></div>
                <div className="badge-sparkle"></div>
                <div className="badge-sparkle"></div>
                <div className="badge-ring"></div>
                <div className="badge-ring-inner"></div>
                <div className="badge-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="48" width="10" height="12" fill="var(--yellow)" opacity="0.6" className="bar bar-1"/>
                    <rect x="22" y="38" width="10" height="22" fill="var(--yellow)" opacity="0.8" className="bar bar-2"/>
                    <rect x="36" y="26" width="10" height="34" fill="var(--orange)" className="bar bar-3"/>
                    <rect x="50" y="12" width="10" height="48" fill="var(--pink)" className="bar bar-4"/>
                    <path d="M12 44L28 32L42 20L56 8" stroke="var(--yellow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="growth-line"/>
                    <path d="M48 8H56V16" stroke="var(--yellow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="growth-arrow"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Solution */}
        <section id="section2">
          <div className="triangle-float" style={{ width: '240px', height: '208px', background: 'var(--pink)', top: '10%', left: '5%', animationDelay: '0s' }}></div>
          <div className="triangle-float" style={{ width: '180px', height: '156px', background: 'var(--yellow)', bottom: '15%', right: '10%', animationDelay: '2s' }}></div>

          <div className="section-content">
            <h2 className="section-title fade-up">500+</h2>
            <p className="section-text fade-up">
              500개 이상의 프로젝트 경험을 가진 에이전시입니다.<br/>
              <strong>더 이상 고민하지 말고 전문가들에게 맡기세요.</strong>
            </p>

            <div className="feature-grid">
              <div className="feature-item stagger-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" stroke="var(--yellow)" strokeWidth="2" fill="none"/>
                    <path d="M32 16L32 48M32 16L24 24M32 16L40 24" stroke="var(--yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="32" cy="44" r="4" fill="var(--yellow)"/>
                    <circle cx="20" cy="36" r="3" fill="var(--yellow)" opacity="0.6"/>
                    <circle cx="44" cy="36" r="3" fill="var(--yellow)" opacity="0.6"/>
                  </svg>
                </div>
                <h3 className="feature-title">Strategy</h3>
                <p className="feature-text">데이터 기반 접근을 통한 브랜드 강화</p>
              </div>
              <div className="feature-item stagger-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="12" width="48" height="36" rx="2" stroke="var(--pink)" strokeWidth="2" fill="none"/>
                    <line x1="8" y1="22" x2="56" y2="22" stroke="var(--pink)" strokeWidth="2"/>
                    <rect x="14" y="28" width="16" height="14" fill="var(--pink)" opacity="0.3"/>
                    <line x1="36" y1="30" x2="50" y2="30" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="36" y1="36" x2="46" y2="36" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="36" y1="42" x2="48" y2="42" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="feature-title">Contents</h3>
                <p className="feature-text">청중의 공감을 이끄는 매력적인 스토리</p>
              </div>
              <div className="feature-item stagger-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 52L12 32L22 32L22 52" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="var(--orange)" fillOpacity="0.3"/>
                    <path d="M27 52L27 24L37 24L37 52" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="var(--orange)" fillOpacity="0.3"/>
                    <path d="M42 52L42 12L52 12L52 52" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="var(--orange)" fillOpacity="0.3"/>
                    <path d="M8 20L24 28L40 16L56 8" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polygon points="56,8 50,6 52,12" fill="var(--orange)"/>
                  </svg>
                </div>
                <h3 className="feature-title">Growth</h3>
                <p className="feature-text">모든 플랫폼에서의 지속 가능한 확장</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Clients */}
        <section id="section3">
          <div className="triangle-float" style={{ width: '260px', height: '225px', background: 'var(--orange)', top: '10%', right: '8%', animationDelay: '0.5s' }}></div>
          <div className="triangle-float" style={{ width: '200px', height: '173px', background: 'var(--yellow)', bottom: '15%', left: '5%', animationDelay: '2.5s' }}></div>

          <div className="section-content">
            <h2 className="section-title fade-up">100%</h2>
            <p className="section-text fade-up">
              최상의 고객 만족을 위해 언제나 노력하고 있습니다.<br/>
              <strong>신뢰를 바탕으로 한 파트너십을 지향합니다.</strong>
            </p>

            <div className="client-logo-wrapper fade-up">
              <div className="client-logo-track">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="client-logo-item">
                    <img src={clientLogo} alt="Client Logo"/>
                  </div>
                ))}
              </div>
            </div>

            <div className="client-logo-wrapper fade-up">
              <div className="client-logo-track reverse">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="client-logo-item">
                    <img src={clientLogo} alt="Client Logo"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Research */}
        <section className="process-section" id="research">
          <div className="triangle-float" style={{ width: '260px', height: '225px', background: 'var(--yellow)', top: '10%', right: '5%', animationDelay: '0s' }}></div>
          <div className="process-image">
            <img src={researchImg} alt="Research & Analysis"/>
          </div>

          <div className="process-number slide-left">01</div>
          <div className="process-content slide-right">
            <span className="process-number-inline">01</span>
            <h2 className="process-title">Research & Analysis</h2>
            <p className="process-text">
              리서치 중심의 비즈니스 환경 및 타겟 분석으로<br/>
              <strong>고객의 마음을 움직이는 차별화된 솔루션을 제공합니다.</strong>
            </p>
          </div>
        </section>

        {/* Section 5: Concept */}
        <section className="process-section" id="concept">
          <div className="triangle-float" style={{ width: '200px', height: '173px', background: 'var(--pink)', bottom: '10%', left: '10%', animationDelay: '1s' }}></div>
          <div className="process-image">
            <img src={conceptImg} alt="Concept Development"/>
          </div>

          <div className="process-number slide-left">02</div>
          <div className="process-content slide-right">
            <span className="process-number-inline">02</span>
            <h2 className="process-title">Concept development</h2>
            <p className="process-text">
              리서치된 자료를 바탕으로 아이디어를 도출하고<br/>
              <strong>콘셉트는 공유와 피드백을 거쳐 더욱 발전시켜 나갑니다.</strong>
            </p>
          </div>
        </section>

        {/* Section 6: Design */}
        <section className="process-section" id="design">
          <div className="triangle-float" style={{ width: '230px', height: '199px', background: 'var(--orange)', top: '15%', right: '10%', animationDelay: '0.5s' }}></div>
          <div className="process-image">
            <img src={designImg} alt="Design and Execution"/>
          </div>

          <div className="process-number slide-left">03</div>
          <div className="process-content slide-right">
            <span className="process-number-inline">03</span>
            <h2 className="process-title">Design and execution</h2>
            <p className="process-text">
              완성된 콘셉트는 우리의 전문가들을 통해<br/>
              <strong>청중의 공감을 얻을 수 있는 최적의 솔루션을 제공합니다.</strong>
            </p>
          </div>
        </section>

        {/* Footer Section */}
        <section id="footer" className="fullpage-footer">
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
              ></iframe>
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
        </section>
      </div>
    </>
  );
}

export default AboutPage;
