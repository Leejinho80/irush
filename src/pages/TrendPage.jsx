import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/trend.css';
import CustomCursor from '../components/CustomCursor';

// 기본 뉴스 데이터 (JSON 로드 실패 시 폴백)
const defaultTrendData = [
  { number: '01', title: '중국 딥시크(DeepSeek) R1, 글로벌 AI 시장 판도 뒤흔들다', desc: "중국 스타트업 딥시크가 공개한 AI 모델 'R1'이 GPT-4o와 대등한 성능을 600만 달러 개발비로 구현해 충격을 안겼다.", link: 'https://zdnet.co.kr/view/?no=20250205152321' },
  { number: '02', title: '엔비디아, CES 2025서 블랙웰 GPU RTX 50 시리즈 공개', desc: "젠슨 황 CEO가 CES 2025 기조연설에서 차세대 블랙웰 GPU를 공개했다.", link: 'https://www.etnews.com/20250107000331' },
  { number: '03', title: '삼성 갤럭시 S25 시리즈, 진정한 AI 스마트폰 시대 개막', desc: "삼성전자가 갤럭시 언팩 2025에서 AI 통합 플랫폼 'One UI 7'을 탑재한 갤럭시 S25 시리즈를 공개했다.", link: 'https://news.samsung.com/kr/' },
  { number: '04', title: '오픈AI GPT-5 공개, 통합 AI 모델 시대 열다', desc: '오픈AI가 GPT-5를 공개하며 GPT-4o와 o3 모델을 통합했다.', link: 'https://openai.com/' },
  { number: '05', title: 'SK하이닉스, HBM4 세계 최초 양산 돌입', desc: "SK하이닉스가 세계 최초로 HBM4 샘플을 공급하고 양산에 돌입한다.", link: 'https://www.etnews.com/' }
];

function TrendPage() {
  const [trendData, setTrendData] = useState(defaultTrendData);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navMode, setNavMode] = useState('dark-mode');
  const [activeTrend, setActiveTrend] = useState(null);
  const [todayDate, setTodayDate] = useState('');
  const [visibleItems, setVisibleItems] = useState(new Set());
  const particlesRef = useRef(null);

  // 뉴스 데이터 로드
  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetch('/data/news.json');
        if (response.ok) {
          const data = await response.json();
          if (data.news && data.news.length > 0) {
            setTrendData(data.news);
            if (data.lastUpdated) {
              const date = new Date(data.lastUpdated);
              setLastUpdated(date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }));
            }
          }
        }
      } catch (error) {
        console.log('Using default trend data');
      }
    }
    loadNews();
  }, []);

  // body에 trend-page 클래스 추가 (스크롤 활성화)
  useEffect(() => {
    document.body.classList.add('is-trend-page');
    document.body.dataset.page = 'trend';
    return () => {
      document.body.classList.remove('is-trend-page');
      delete document.body.dataset.page;
    };
  }, []);

  useEffect(() => {
    // Set today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const weekday = weekdays[today.getDay()];
    setTodayDate(`${year}.${month}.${day} ${weekday}`);

    // Create particles
    createParticles();

    // Scroll fade-in effect for non-trend-item elements
    const fadeElements = document.querySelectorAll('.fade-in:not(.trend-item)');
    const checkFadeIn = () => {
      fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.85) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', checkFadeIn);
    checkFadeIn();

    return () => {
      window.removeEventListener('scroll', checkFadeIn);
    };
  }, []);

  // Separate effect for trend items to persist visible state
  useEffect(() => {
    const checkTrendItemsVisible = () => {
      const trendItems = document.querySelectorAll('.trend-item');
      trendItems.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.85) {
          setVisibleItems(prev => new Set([...prev, index]));
        }
      });
    };

    window.addEventListener('scroll', checkTrendItemsVisible);
    checkTrendItemsVisible();

    return () => {
      window.removeEventListener('scroll', checkTrendItemsVisible);
    };
  }, []);

  // Nav mode update based on scroll
  useEffect(() => {
    const updateNavMode = () => {
      const footer = document.getElementById('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top <= 100) {
          setNavMode('light-mode');
        } else {
          setNavMode('dark-mode');
        }
      }
    };

    window.addEventListener('scroll', updateNavMode);
    return () => window.removeEventListener('scroll', updateNavMode);
  }, []);

  const createParticles = () => {
    const container = particlesRef.current;
    if (!container || container.children.length > 0) return;

    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const angle = Math.random() * Math.PI * 2;
      const distance = 150 + Math.random() * 350;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.animationDelay = `${Math.random() * 4}s`;
      particle.style.background = 'var(--purple)';

      container.appendChild(particle);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrendClick = (index) => {
    setActiveTrend(activeTrend === index ? null : index);
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
            <a href="/아이러시_회사소개서.pdf" download="아이러시 회사소개서.pdf" className="nav-btn">Company Brochure</a>
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
          <li><a href="/아이러시_회사소개서.pdf" download="아이러시 회사소개서.pdf" className="mobile-btn">Company Brochure</a></li>
          <li><a href="#footer" className="mobile-btn primary" onClick={handleContactClick}>Contact Us</a></li>
        </ul>
      </div>

      {/* Trend Desk Section */}
      <section className="trend-section">
        {/* Faith-inspired Background Elements */}
        <div className="trend-float-square trend-float-square-1"></div>
        <div className="trend-float-square trend-float-square-2"></div>
        <div className="trend-float-square trend-float-square-3"></div>
        <div className="trend-float-square trend-float-square-4"></div>
        <div className="trend-float-square trend-float-square-5"></div>
        <div className="trend-float-square trend-float-square-6"></div>

        {/* Orbital Squares */}
        <div className="trend-orbit">
          <div className="trend-orbit-dot trend-orbit-dot-1"></div>
          <div className="trend-orbit-dot trend-orbit-dot-2"></div>
          <div className="trend-orbit-dot trend-orbit-dot-3"></div>
          <div className="trend-orbit-dot trend-orbit-dot-4"></div>
        </div>
        <div className="trend-orbit trend-orbit-2">
          <div className="trend-orbit-dot trend-orbit-dot-1"></div>
          <div className="trend-orbit-dot trend-orbit-dot-2"></div>
          <div className="trend-orbit-dot trend-orbit-dot-3"></div>
          <div className="trend-orbit-dot trend-orbit-dot-4"></div>
        </div>

        {/* Expanding Square Borders */}
        <div className="trend-border trend-border-1"></div>
        <div className="trend-border trend-border-2"></div>
        <div className="trend-border trend-border-3"></div>
        <div className="trend-border trend-border-4"></div>

        <div id="trend-particles" ref={particlesRef}></div>

        <div className="section-inner">
          <h2 className="section-label fade-in">IT TREND DESK</h2>
          <h3 className="trend-title fade-in">
            TODAY'S IT TREND<br/>
            <span id="today-date">{todayDate}</span>
          </h3>

          <div className="trend-list">
            {trendData.map((item, index) => (
              <div key={index} className={`trend-item fade-in ${visibleItems.has(index) ? 'visible' : ''} ${activeTrend === index ? 'active' : ''}`}>
                <button className="trend-header" onClick={() => handleTrendClick(index)}>
                  <span className="trend-number">{item.number}</span>
                  <h3 className="trend-news-title">{item.title}</h3>
                  <span className="trend-toggle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </span>
                </button>
                <div className="trend-content">
                  <p className="trend-desc">{item.desc}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="trend-link">
                    <span>자세히 보기</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="trend-notice">
              * IT 트렌드는 매일 오전 8시에 자동으로 업데이트됩니다.
              {lastUpdated && <span className="last-updated"> (최근 업데이트: {lastUpdated})</span>}
            </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="normal-footer">
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
      </footer>
    </>
  );
}

export default TrendPage;
