import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/work.css';

// 프로젝트 슬라이드 데이터
const projectSlides = [
  {
    id: 1,
    title: 'LG헬로비전 모바일 직영몰 고도화',
    desc: '기존 모바일 서비스의 사용자 경험을 전면 개선하고 최신 트렌드에 맞는 UI/UX를 적용',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop',
    link: '/work-detail'
  },
  {
    id: 2,
    title: '삼성 리움미술관 온라인 예약시스템',
    desc: '온라인 예약 및 티켓 발권 시스템 구축으로 방문객 편의성 극대화',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop',
    link: '/work-detail'
  },
  {
    id: 3,
    title: '신한 SOL 캄보디아 UI/UX 컨설팅',
    desc: '캄보디아 법인 모바일 뱅킹 앱 UI/UX 컨설팅 및 디자인',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=1080&fit=crop',
    link: '/work-detail'
  },
  {
    id: 4,
    title: 'LUNA BREWERY HOPPY APP',
    desc: '수제맥주 주문 및 멤버십 애플리케이션 구축',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    link: '/work-detail'
  }
];

// 프로젝트 히스토리 데이터
const historyItems = [
  {
    title: 'LG헬로비전 MYLGID 회원 통합',
    desc: 'LG헬로비전 다이렉트몰 온라인 신청 시스템 UI/UX 개선 및 셀프개통 프로세스 추가',
    client: 'LG헬로비전',
    launching: '2021.12',
    url: 'https://www.lghellovision.net/main.do'
  },
  {
    title: '삼성 리움미술관 온라인 예약시스템 구축',
    desc: '삼성 리움미술관 온라인 예약 및 티켓 발권 시스템 구축',
    client: '삼성문화재단',
    launching: '2022.03',
    url: ''
  },
  {
    title: '신한 SOL 캄보디아 UI/UX 컨설팅',
    desc: '신한은행 캄보디아 법인 모바일 뱅킹 앱 UI/UX 컨설팅 및 디자인',
    client: '신한은행',
    launching: '2022.06',
    url: ''
  },
  {
    title: 'LUNA BREWERY HOPPY APPLICATION 구축',
    desc: '루나 브루어리 수제맥주 주문 및 멤버십 애플리케이션 구축',
    client: 'LUNA BREWERY',
    launching: '2022.09',
    url: ''
  },
  {
    title: 'LG헬로비전 온라인 신청 시스템 개선',
    desc: 'LG헬로비전 다이렉트몰 온라인 신청 시스템 UI/UX 개선 및 셀프개통 프로세스 추가',
    client: 'LG헬로비전',
    launching: '2021.12',
    url: 'https://www.lghellovision.net/main.do'
  },
  {
    title: '국립암센터 국가 암검진 정보시스템 개선',
    desc: '국가 암검진 정보시스템 사용자 경험 개선 및 관리자 시스템 고도화',
    client: '국립암센터',
    launching: '2023.01',
    url: ''
  },
  {
    title: 'LG헬로비전 멀티호스팅 웹통합',
    desc: '멀티호스팅 서비스 웹사이트 통합 및 사용자 경험 개선',
    client: 'LG헬로비전',
    launching: '2023.04',
    url: ''
  },
  {
    title: '하나제약 인사평가시스템',
    desc: '하나제약 인사평가 및 성과관리 시스템 구축',
    client: '하나제약',
    launching: '2023.06',
    url: ''
  },
  {
    title: '삼성전자 BESPOKE 서비스 개선',
    desc: '삼성전자 BESPOKE 가전 커스터마이징 서비스 UX 개선',
    client: '삼성전자',
    launching: '2023.09',
    url: ''
  },
  {
    title: 'CJ헬로 사명변경에 따른 CI/BI 교체',
    desc: 'CJ헬로에서 LG헬로비전으로 사명 변경에 따른 전사 CI/BI 교체 작업',
    client: 'LG헬로비전',
    launching: '2020.06',
    url: ''
  }
];

function WorkPage() {
  // UI 렌더링용 상태
  const [currentSlide, setCurrentSlide] = useState(0);
  const [navMode, setNavMode] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHistory, setActiveHistory] = useState(null);
  const [slideClasses, setSlideClasses] = useState([]);

  const totalSlides = projectSlides.length;
  const heroSectionRef = useRef(null);
  const historySectionRef = useRef(null);

  // 이벤트 핸들러용 ref (클로저 문제 해결)
  const isAnimatingRef = useRef(false);
  const accumulatedDelta = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);

  // Set body data-page attribute
  useEffect(() => {
    document.body.dataset.page = 'work';
    return () => {
      delete document.body.dataset.page;
    };
  }, []);

  // 슬라이드 클래스 초기화
  useEffect(() => {
    const classes = projectSlides.map((_, index) => index === 0 ? 'active' : '');
    setSlideClasses(classes);
  }, []);

  // 슬라이드 이동
  const goToSlide = (index, direction = 'next') => {
    // DOM에서 현재 슬라이드 인덱스 확인
    const activeSlide = document.querySelector('.project-slide.active');
    const currentIndex = activeSlide ? parseInt(activeSlide.dataset.index) : 0;

    if (isAnimatingRef.current || index === currentIndex) return;
    if (index < 0 || index >= totalSlides) return;

    isAnimatingRef.current = true;

    // DOM에서 현재 슬라이드 클래스 배열 가져오기
    const slides = document.querySelectorAll('.project-slide');
    const newClasses = Array.from(slides).map(slide => {
      const classList = slide.className.replace('project-slide', '').trim();
      return classList;
    });

    if (direction === 'next') {
      newClasses[currentIndex] = 'slide-stay';
      newClasses[index] = 'slide-cover-up';
    } else {
      newClasses[index] = 'slide-reveal active';
      newClasses[currentIndex] = 'slide-uncover-down';
    }

    setSlideClasses(newClasses);

    setTimeout(() => {
      const resetClasses = projectSlides.map((_, i) => i === index ? 'active' : '');
      setSlideClasses(resetClasses);
      setCurrentSlide(index);
      isAnimatingRef.current = false;
    }, 1000);
  };

  const nextSlide = () => {
    const activeSlide = document.querySelector('.project-slide.active');
    const currentIndex = activeSlide ? parseInt(activeSlide.dataset.index) : 0;

    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1, 'next');
      return true;
    }
    return false;
  };

  const prevSlide = () => {
    const activeSlide = document.querySelector('.project-slide.active');
    const currentIndex = activeSlide ? parseInt(activeSlide.dataset.index) : 0;

    if (currentIndex > 0) {
      goToSlide(currentIndex - 1, 'prev');
      return true;
    }
    return false;
  };

  // 스크롤 잠금/해제
  const lockScroll = () => {
    document.body.classList.add('scroll-locked');
  };

  const unlockScroll = () => {
    document.body.classList.remove('scroll-locked');
  };

  const isLocked = () => {
    return document.body.classList.contains('scroll-locked');
  };

  // body에 work-page 클래스 추가 (about.css 전역 스타일 방지)
  useEffect(() => {
    document.body.classList.add('is-work-page');
    return () => {
      document.body.classList.remove('is-work-page');
    };
  }, []);

  // 휠 및 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleWheel = (e) => {
      const scrollY = window.scrollY;
      const currentlyLocked = isLocked();

      if (currentlyLocked && scrollY <= 10) {
        e.preventDefault();

        if (isAnimatingRef.current) return;

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        accumulatedDelta.current += e.deltaY;

        scrollTimeoutRef.current = setTimeout(() => {
          accumulatedDelta.current = 0;
        }, 150);

        const threshold = 50;

        if (accumulatedDelta.current > threshold) {
          if (!nextSlide()) {
            unlockScroll();
          }
          accumulatedDelta.current = 0;
        } else if (accumulatedDelta.current < -threshold) {
          prevSlide();
          accumulatedDelta.current = 0;
        }
        return;
      }

      if (!currentlyLocked && scrollY <= 10 && e.deltaY < 0) {
        lockScroll();
        const activeSlide = document.querySelector('.project-slide.active');
        const currentIndex = activeSlide ? parseInt(activeSlide.dataset.index) : 0;
        if (currentIndex !== totalSlides - 1) {
          goToSlide(totalSlides - 1, 'prev');
        }
        e.preventDefault();
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (!isLocked() && scrollY <= 0) {
        lockScroll();
        window.scrollTo(0, 0);
      }

      // GNB 모드 변경
      if (historySectionRef.current) {
        const historyRect = historySectionRef.current.getBoundingClientRect();
        if (historyRect.top <= 100) {
          setNavMode('light');
        } else {
          setNavMode('dark');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 스크롤 잠금
    lockScroll();

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      unlockScroll();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []); // 의존성 배열 비움 - 모든 상태를 DOM/ref로 관리

  // 터치 이벤트 핸들러
  const handleTouchStart = (e) => {
    touchStartY.current = e.changedTouches[0].screenY;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e) => {
    if (isLocked()) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!isLocked() || isAnimatingRef.current) return;

    const touchEndY = e.changedTouches[0].screenY;
    const touchDuration = Date.now() - touchStartTime.current;
    const swipeDistance = touchStartY.current - touchEndY;

    if (touchDuration > 500) return;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        if (!nextSlide()) {
          unlockScroll();
        }
      } else {
        prevSlide();
      }
    }
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLocked()) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (!nextSlide()) {
          unlockScroll();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []); // 의존성 배열 비움

  // 히스토리 아코디언 토글
  const toggleHistory = (index) => {
    setActiveHistory(activeHistory === index ? null : index);
  };

  // 메뉴 토글
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Contact 클릭 핸들러
  const handleContactClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    unlockScroll();
    setTimeout(() => {
      document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="work-page">
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
            <a href="#" className="nav-btn">Company Brochure</a>
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
          <li><a href="#" className="mobile-btn">Company Brochure</a></li>
          <li><a href="#footer" className="mobile-btn primary" onClick={handleContactClick}>Contact Us</a></li>
        </ul>
      </div>

      {/* Hero Section - Fullscreen Project Slides */}
      <section
        className="hero-section"
        ref={heroSectionRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="hero-container">
          {/* Project Slides */}
          <div className="project-slides">
            {projectSlides.map((project, index) => (
              <div
                key={project.id}
                className={`project-slide ${slideClasses[index] || ''}`}
                data-index={index}
              >
                <div
                  className="project-slide-bg"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="project-slide-content">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-desc">{project.desc}</p>
                  <Link to={project.link} className="project-link">
                    <span>View Project</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Project Counter */}
          <div className="project-counter">
            <span className="counter-current">{String(currentSlide + 1).padStart(2, '0')}</span>
            <span className="counter-divider">/</span>
            <span className="counter-total">{String(totalSlides).padStart(2, '0')}</span>
          </div>

          {/* Navigation Arrows */}
          <div className="project-nav">
            <button
              className="project-nav-btn prev"
              aria-label="Previous Project"
              onClick={prevSlide}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              className="project-nav-btn next"
              aria-label="Next Project"
              onClick={() => { if (!nextSlide()) unlockScroll(); }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Project History Section */}
      <section className="project-history-section" ref={historySectionRef}>
        <div className="section-inner">
          <h2 className="section-label">PROJECT HISTORY</h2>

          <div className="project-history-list">
            {historyItems.map((item, index) => (
              <div key={index} className={`history-item ${activeHistory === index ? 'active' : ''}`}>
                <button className="history-header" onClick={() => toggleHistory(index)}>
                  <h3 className="history-title">{item.title}</h3>
                  <span className="history-toggle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </span>
                </button>
                <div className="history-content">
                  <p className="history-desc">{item.desc}</p>
                  <div className="history-meta">
                    <div className="meta-item">
                      <span className="meta-label">CLIENT</span>
                      <span className="meta-value">{item.client}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">LAUNCHING</span>
                      <span className="meta-value">{item.launching}</span>
                    </div>
                    {item.url && (
                      <div className="meta-item">
                        <span className="meta-label">SITE URL</span>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="meta-link">{item.url}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Button */}
          <div className="more-button-wrapper">
            <button className="more-btn">MORE +</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="normal-footer">
        <div className="footer-content-main">
          <h2 className="footer-headline">We are waiting for you to contact us</h2>
          <p className="footer-subheadline">You can write to us at any time and get an instant response.</p>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1582.4434942359923!2d126.89562207639486!3d37.51548197204086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9ec78f66e777%3A0x9c6e5c8e6a3b0e1a!2sKnK%EB%94%94%EC%A7%80%ED%84%B8%ED%83%80%EC%9B%8C!5e0!3m2!1sko!2skr!4v1704934800000!5m2!1sko!2skr"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="iRush Location"
            />
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
      </footer>
    </div>
  );
}

export default WorkPage;
