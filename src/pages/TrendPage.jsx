import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/trend.css';
import brochurePdf from '../assets/(주)아이러시 회사소개서.pdf';
import CustomCursor from '../components/CustomCursor';

const trendData = [
  { number: '01', title: '중국 딥시크(DeepSeek) R1, 글로벌 AI 시장 판도 뒤흔들다', desc: "중국 스타트업 딥시크가 공개한 AI 모델 'R1'이 GPT-4o와 대등한 성능을 600만 달러 개발비로 구현해 충격을 안겼다. 발표 직후 엔비디아 시가총액 850조 원이 증발하며 '딥시크 쇼크'가 발생했고, 미국 앱스토어에서 ChatGPT를 제치고 1위를 기록했다.", link: 'https://zdnet.co.kr/view/?no=20250205152321' },
  { number: '02', title: '엔비디아, CES 2025서 블랙웰 GPU RTX 50 시리즈 공개', desc: "젠슨 황 CEO가 CES 2025 기조연설에서 차세대 블랙웰 GPU를 공개했다. RTX 5090(1999달러)부터 RTX 5070(549달러)까지 4개 라인업을 발표했으며, RTX 4090 대비 3~4배 성능 향상을 달성했다. 개인용 AI 슈퍼컴퓨터 '프로젝트 디지트'도 함께 공개됐다.", link: 'https://www.etnews.com/20250107000331' },
  { number: '03', title: '삼성 갤럭시 S25 시리즈, 진정한 AI 스마트폰 시대 개막', desc: "삼성전자가 갤럭시 언팩 2025에서 AI 통합 플랫폼 'One UI 7'을 탑재한 갤럭시 S25 시리즈를 공개했다. 멀티모달 AI와 '나우 브리프' 개인 비서 기능이 탑재되었으며, 스냅드래곤 8 엘리트 칩으로 역대 최강 성능을 구현하면서도 전작과 동일한 가격을 유지했다.", link: 'https://news.samsung.com/kr/삼성전자-갤럭시-s25-시리즈-공개' },
  { number: '04', title: '오픈AI GPT-5 공개, 통합 AI 모델 시대 열다', desc: '오픈AI가 GPT-5를 공개하며 GPT-4o와 o3 모델을 통합했다. 오류 발생률이 최대 70% 감소했으며, 입력 토큰 비용도 절반으로 낮아졌다. 암젠은 임상데이터 분석에, 우버는 고객지원 자동화에 GPT-5를 적용 중이다.', link: 'https://openai.com/index/introducing-gpt-5-2/' },
  { number: '05', title: 'SK하이닉스, HBM4 세계 최초 양산 돌입', desc: "SK하이닉스가 세계 최초로 HBM4 샘플을 공급하고 양산에 돌입한다. TSMC와 협력해 12nm 로직 공정을 도입, 대역폭 2배 확대와 전력 효율 40% 개선을 달성했다. 엔비디아 차세대 AI 반도체 '루빈'에 탑재될 예정이며, HBM4 1개 가격은 약 70만 원이다.", link: 'https://www.etnews.com/20251104000298' },
  { number: '06', title: '애플 인텔리전스, 드디어 한국어 지원 시작', desc: '애플이 iOS 18.4 업데이트를 통해 애플 인텔리전스의 한국어 지원을 시작했다. 글쓰기 도구, 스마트 답장, 사진 클린업 기능 등이 한국어로 사용 가능해졌으며, 비공개 클라우드 컴퓨팅으로 개인정보 보호 수준도 강화됐다.', link: 'https://www.apple.com/kr/newsroom/2025/03/apple-intelligence-features-are-now-available-in-korean/' },
  { number: '07', title: '테슬라 옵티머스 3세대, 휴머노이드 로봇 양산 초읽기', desc: '테슬라가 옵티머스 3세대 로봇 시제품을 공개 예정이다. 약 9,460억 원 규모의 부품을 발주했으며, 제조 원가는 4,000만 원 수준으로 예상된다. 일론 머스크는 "로봇 슈트를 입은 사람처럼 사실적일 것"이라며 2026년 양산을 목표로 하고 있다.', link: 'https://zdnet.co.kr/view/?no=20251023105843' },
  { number: '08', title: '한국형 초거대 AI 경쟁 본격화, 5개 컨소시엄 격돌', desc: "네이버클라우드, 업스테이지, SK텔레콤, NC AI, LG AI연구원 등 5개 컨소시엄이 독자 AI 파운데이션 모델 개발에 참여 중이다. SKT는 5,190억 개 파라미터의 'A.X K1' 모델을 예고했으며, 이는 국내 최대 규모다. 소버린 AI 확보를 위한 국가 차원의 경쟁이 본격화됐다.", link: 'https://v.daum.net/v/20251228145923740' },
  { number: '09', title: 'CES 2025 혁신상, 한국 기업 60% 휩쓸어', desc: 'CES 2025에서 한국 기업들이 혁신상 458건 중 219건(47.8%)을 수상하며 3년 연속 최다 수상국 타이틀을 거머쥐었다. 1,031개사가 참가해 역대 최대 규모를 기록했으며, 대동의 AI 식물 재배기, 셀리코의 시각장애인용 스마트 안경 등이 주목받았다.', link: 'https://www.aitimes.kr/news/articleView.html?idxno=33150' },
  { number: '10', title: '가트너 선정 2025 전략기술 트렌드, AI 에이전트가 핵심', desc: "가트너가 2025년 10대 전략기술 트렌드를 발표했다. 에이전틱 AI, AI 거버넌스 플랫폼, 양자내성암호, 공간 컴퓨팅, 다기능 로봇 등이 포함됐다. 특히 자율형 AI 에이전트가 핵심으로 부상하며, MS는 '코파일럿 스튜디오'로 기업 맞춤형 에이전트 시장 선점에 나섰다.", link: 'https://www.samsungsds.com/kr/insights/2025-technology-industry-trends-to-watch.html' }
];

function TrendPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navMode, setNavMode] = useState('dark-mode');
  const [activeTrend, setActiveTrend] = useState(null);
  const [todayDate, setTodayDate] = useState('');
  const [visibleItems, setVisibleItems] = useState(new Set());
  const particlesRef = useRef(null);

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

          <p className="trend-notice">* IT 트렌드는 매일 오전 8시에 자동으로 업데이트됩니다.</p>
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
