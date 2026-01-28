import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/work.css';
import brochurePdf from '../assets/(주)아이러시 회사소개서.pdf';
import CustomCursor from '../components/CustomCursor';
import { projectSlides } from '../data/projectData';

// 프로젝트 히스토리 데이터 (아이러시 포트폴리오 - Notion Database 기준)
const historyItems = [
  // 2021
  {
    title: 'LG헬로비전 MYLGID 회원 통합',
    desc: 'LG헬로비전 전 서비스 MYLGID 회원 통합',
    client: 'LG헬로비전',
    launching: '2021.12',
    url: 'http://www.lghellovision.net/'
  },
  {
    title: '삼성 리움미술관 온라인 예약시스템 구축',
    desc: '삼성 리움미술관 온라인 예약시스템 및 DigitalGuide 구축(통합관리시스템 부문)',
    client: '삼성문화재단 / 삼성SDS',
    launching: '2021.11',
    url: 'http://www.leeum.org/'
  },
  {
    title: '신한 SOL 캄보디아 UI/UX 컨설팅',
    desc: '신한 SOL 캄보디아 UI/UX 컨설팅',
    client: '신한은행 캄보디아',
    launching: '2021.1',
    url: ''
  },
  {
    title: 'LUNA BREWERY HOPPY APPLICATION 구축',
    desc: '서울랜드 수제 맥주 온라인 판매 스토어앱 HOPPY 구축',
    client: '서울랜드',
    launching: '2021.08',
    url: ''
  },
  {
    title: 'LG헬로비전 온라인 신청 시스템 개선',
    desc: 'LG헬로비전 다이렉트몬 온라인 신청 시스템 개선',
    client: 'LG헬로비전',
    launching: '2021.04',
    url: 'http://direct.lghellovision.net/main.do'
  },
  {
    title: '국립암센터 국가 암검진 정보시스템 개선',
    desc: '국립암센터 국가 암검진 정보 시스템 개선',
    client: '국립암센터',
    launching: '2021.01',
    url: ''
  },
  // 2020
  {
    title: 'LG헬로비전 멀티호스팅 웹통합',
    desc: 'LG헬로비전 멀티호스팅 웹 통합 프로젝트',
    client: 'LG헬로비전',
    launching: '2020.07',
    url: 'http://direct.lghellovision.net/main.do'
  },
  {
    title: '하나제약 인사평가시스템 구축',
    desc: '하나제약 인사평가시스템 구축',
    client: '하나제약',
    launching: '2020.07',
    url: ''
  },
  {
    title: '삼성전자 BESPOKE 서비스 개선',
    desc: '삼성전자 BESPOKE 서비스 개선 프로젝트',
    client: '삼성전자 / 삼성SDS',
    launching: '2020.03',
    url: ''
  },
  {
    title: 'CJ헬로 사명변경에 따른 CI/BI 교체',
    desc: 'CJ헬로 사명변경에 따른 CI/BI 교체',
    client: 'CJ헬로',
    launching: '2020.02',
    url: 'http://www.lghellovision.net'
  },
  // 2019
  {
    title: '삼성닷컴 B-PJT',
    desc: '삼성닷컴 B-PJT',
    client: '삼성전자 / 삼성SDS',
    launching: '2019.05',
    url: 'http://www.samsung.com'
  },
  {
    title: 'CJ헬로 렌탈 서비스 고도화',
    desc: 'CJ헬로 렌탈 서비스 고도화',
    client: 'CJ헬로',
    launching: '2019.03',
    url: 'https://rental.lghellovision.net'
  },
  {
    title: '삼성닷컴 EMC Buying_Conf 과제 개발',
    desc: '삼성닷컴 EMC Buying_Conf 과제 개발',
    client: '삼성전자 / 삼성SDS',
    launching: '2019.02',
    url: 'http://www.samsung.com/uk/smartphones/galaxy-s10/buy'
  },
  // 2018
  {
    title: 'CJ헬로 렌탈 임직원 복지몬 구축',
    desc: 'CJ헬로 렌탈 임직원 복지몬 구축',
    client: 'CJ헬로 / CJ올리브네트웍스',
    launching: '2018.08',
    url: 'https://rental.lghellovision.net'
  },
  {
    title: 'CJ헬로모바일 서비스 개선',
    desc: 'CJ헬로모바일 서비스 개선',
    client: 'CJ헬로 / CJ올리브네트웍스',
    launching: '2018.06',
    url: 'https://www.lghellovision.net/'
  },
  {
    title: '삼성닷컴 글로벌 Shop 통합',
    desc: '삼성닷컴 글로벌 Shop 통합',
    client: '삼성전자 / 삼성SDS',
    launching: '2018.06',
    url: 'http://www.samsung.com'
  },
  {
    title: '경기도 감염병관리지원단 정보시스템 개선',
    desc: '경기도 감염병관리지원단 정보시스템 개선',
    client: '경기도감염병관리지원단',
    launching: '2018.05',
    url: ''
  },
  {
    title: 'CJ헬로모바일 CU 제휴서비스 개선',
    desc: 'CJ헬로모바일 CU 제휴서비스 개선',
    client: 'CJ헬로',
    launching: '2018.05',
    url: ''
  },
  {
    title: '하나제약 홈페이지 개편',
    desc: '하나제약 홈페이지 개편',
    client: '하나제약',
    launching: '2018.04',
    url: ''
  },
  // 2017
  {
    title: '삼성닷컴 한국 사이트 운영',
    desc: '삼성전자 대표사이트로 전 세계 64개국 통일된 컨셉으로 구축, 자체 WebCMS 사용으로 효과적 관리',
    client: '삼성전자 / 삼성네트웍스',
    launching: '2008 ~ 2017',
    url: 'http://www.samsung.com/sec'
  },
  {
    title: '삼성전자 LED 웹사이트 개편 - PIM개발',
    desc: '삼성전자 LED 웹사이트 개편 - PIM개발',
    client: '삼성전자 / 삼성SDS',
    launching: '2017.12',
    url: 'http://www.samsung.com/led'
  },
  {
    title: '신한은행 글로벌 포털 웹사이트 개편',
    desc: '신한은행 글로벌 포털 웹사이트 개편',
    client: '신한은행',
    launching: '2017.12',
    url: ''
  },
  {
    title: '삼성전자 반도체 웹사이트 개편 - PIM개발',
    desc: '삼성전자 반도체 웹사이트 개편 - PIM개발',
    client: '삼성전자 / 삼성SDS',
    launching: '2017.12',
    url: 'http://www.samsung.com/semiconductor'
  },
  {
    title: '삼성닷컴 B2B 한총 컨텐츠 마이그레이션',
    desc: '삼성닷컴 B2B 한총 컨텐츠 마이그레이션',
    client: '삼성전자 / 삼성SDS',
    launching: '2017.11',
    url: 'http://www.samsung.com/sec/business'
  },
  {
    title: '삼성전자 갤럭시 재팬 사이트 구축',
    desc: '삼성전자 갤럭시 재팬 사이트 구축',
    client: '삼성전자 / 삼성SDS',
    launching: '2017.04',
    url: ''
  },
  {
    title: 'CJ헬로모바일 임직원 지인몬 고도화',
    desc: 'CJ헬로모바일 임직원 지인몬 고도화',
    client: 'CJ헬로비전 / CJ올리브네트웍스',
    launching: '2017.04',
    url: ''
  },
  {
    title: 'CJ헬로모바일 임직원몬 고도화',
    desc: 'CJ헬로모바일 임직원몬 고도화',
    client: 'CJ헬로비전 / CJ올리브네트웍스',
    launching: '2017.04',
    url: ''
  },
  {
    title: '삼성닷컴 Contents & Service 개편',
    desc: '삼성닷컴 Contents & Service 개편',
    client: '삼성전자 / 삼성SDS',
    launching: '2017.04',
    url: 'http://www.samsung.com/sec/apps'
  },
  // 2016
  {
    title: '국립암센터 호스피스완화의료 질평가시스템 개선',
    desc: '국립암센터 호스피스완화의료 질평가시스템 개선',
    client: '국립암센터',
    launching: '2016.12',
    url: ''
  },
  {
    title: '삼성닷컴 P5 한총 차세대',
    desc: '삼성닷컴 P5 한총 차세대',
    client: '삼성전자 / 삼성SDS',
    launching: '2016.12',
    url: 'http://www.samsung.com/sec'
  },
  {
    title: 'CJ헬로비전 MGM서비스 구축',
    desc: 'CJ헬로비전 MGM서비스 구축',
    client: 'CJ헬로비전 / 리그시스템',
    launching: '2016.1',
    url: ''
  },
  {
    title: 'CJ헬로비전 정기결제 증빙 시스템 구축',
    desc: 'CJ헬로비전 정기결제 증빙 시스템 구축',
    client: 'CJ헬로비전 / CJ올리브네트웍스',
    launching: '2016.09',
    url: ''
  },
  {
    title: 'CJ헬로비전 지역방송국 VOD서비스 개선',
    desc: 'CJ헬로비전 지역방송국 VOD서비스 개선',
    client: 'CJ헬로비전 / 카테노이드',
    launching: '2016.09',
    url: ''
  },
  {
    title: '국립암센터 암검진사업 정보시스템 개선',
    desc: '암검진사업 정보시스템 개선 및 2016년 유지보수',
    client: '국립암센터',
    launching: '2016.08',
    url: ''
  },
  {
    title: 'CJ헬로모바일 중고폰 렌탈 서비스 구축',
    desc: 'CJ헬로모바일 중고폰 렌탈 서비스 구축',
    client: 'CJ헬로비전',
    launching: '2016.05',
    url: ''
  },
  {
    title: '삼성닷컴 B2B 한국사이트 개편',
    desc: '삼성닷컴 B2B 한국사이트 개편',
    client: '삼성전자 / 삼성SDS',
    launching: '2016.02',
    url: 'http://www.samsung.com/sec/business'
  },
  {
    title: '국립암센터 가정호스피스 구축',
    desc: '국립암센터 호스피스완화의료 가정호스피스 구축',
    client: '국립암센터',
    launching: '2016.02',
    url: ''
  },
  // 2015
  {
    title: '국립암센터 호스피스완화의료 질평가시스템 고도화',
    desc: '호스피스완화의료 질평가스시템 고도화 및 웹접근성 개선/인증',
    client: '국립암센터',
    launching: '2015.11',
    url: ''
  },
  {
    title: '신한은행 글로벌 포털&인터넷 뱅킹 1차 오픈',
    desc: '신한은행 글로벌 포털 및 기업뱅킹 사이트 개편',
    client: '신한은행',
    launching: '2015.11',
    url: ''
  },
  {
    title: '신한금융지주 사회책임경영 개편',
    desc: '신한금융지주 사회책임경영 메뉴 개편',
    client: '신한금융지주',
    launching: '2015.06',
    url: ''
  },
  {
    title: 'KT 올레 똑똑 서비스 개발',
    desc: 'KT 올레 똑똑 서비스 개발',
    client: 'KT',
    launching: '2015.05',
    url: ''
  },
  {
    title: '삼성닷컴 한국사이트 개편',
    desc: '삼성닷컴 NextGen의 한국사이트로 확산 및 반응형 웹 적용 프로젝트',
    client: '삼성전자 / 삼성SDS',
    launching: '2015.01',
    url: 'http://www.samsung.com/sec'
  },
  {
    title: '하나제약 온라인 주문 시스템 구축',
    desc: '하나제약 온라인 주문 시스템 구축 프로젝트',
    client: '하나제약',
    launching: '2015.01',
    url: ''
  },
  {
    title: '삼성전자 C&S포털 삼성닷컴 통합',
    desc: 'C&S포털 서비스 종료로 서비스 소개 메뉴를 삼성닷컴으로 이관. 반응형 웹 적용 프로젝트',
    client: '삼성전자 / 삼성SDS',
    launching: '2015.01',
    url: 'http://www.samsung.com/sec/apps/mobile/'
  },
  // 2014
  {
    title: '삼성스포츠단 홈페이지 웹접근성 갱신',
    desc: '삼성스포츠단 홈페이지 웹접근성 갱신 프로젝트. 2014년 5월 20일 기준 웹와치 인증마크 갱신 획득',
    client: '삼성스포츠단 / 삼성SDS',
    launching: '2014.05',
    url: ''
  },
  {
    title: '삼성스포츠단 스마트웰니스 개편',
    desc: '삼성스포츠단 운영 사이트인 스마트웰니스 개편 및 모바일웹 신규 구축 프로젝트',
    client: '삼성스포츠단 / 삼성SDS',
    launching: '2014.05',
    url: ''
  },
  {
    title: '삼성C&S포털 글로벌 콘텐츠관리시스템 구축',
    desc: '삼성C&S포털의 운영 효율화를 위한 내부 과제',
    client: '삼성전자 / 삼성SDS',
    launching: '2014.03',
    url: ''
  },
  {
    title: '삼성닷컴 제품 특장점 고도화',
    desc: '삼성닷컴 제품 특장점 고도화 PJT',
    client: '삼성전자 / 삼성SDS',
    launching: '2014.01',
    url: 'http://www.samsung.com/sec'
  },
  {
    title: '삼성닷컴 About Samsung 개편',
    desc: '삼성닷컴 About Samsung 개편 PJT',
    client: '삼성전자 / 삼성SDS',
    launching: '2014.01',
    url: 'http://www.samsung.com/sec/aboutsamsung/index.html'
  },
  // 2013
  {
    title: '삼성SNS 제품 특장점 제작',
    desc: '삼성SNS 제품 특장점 제작 PJT',
    client: '삼성SNS (現 삼성SDS)',
    launching: '2013.12',
    url: ''
  },
  {
    title: '삼성전자 C&S 포털 사이트 웹접근성 개선',
    desc: '삼성전자 C&S 포털 사이트 웹접근성 개선 PJT',
    client: '삼성전자 / 삼성SDS',
    launching: '2013.11',
    url: ''
  },
  {
    title: '그레이프시티 온라인 프로모션 제작',
    desc: '그레이프시티 온라인 프로모션 PJT',
    client: '그레이프시티',
    launching: '2013.08',
    url: ''
  },
  {
    title: '신한금융지주 홈페이지 개편',
    desc: '국문,영문,일문 3개 사이트에 대한 디자인 개편. 국문 홈페이지 웹 접근성 인증마크 획득',
    client: '신한금융지주회사',
    launching: '2013.07',
    url: 'http://www.shinhangroup.com'
  },
  {
    title: '신한금융지주 사회공헌 메뉴 개편',
    desc: '신한금융지주 사회공헌 메뉴 개편',
    client: '신한금융지주회사',
    launching: '2013.07',
    url: ''
  },
  {
    title: '삼성 와이즈미팅 서비스 개선',
    desc: '개인정보보호법에 따른 DB 개선 1차, TP/모바일 컨퍼런스 추가 연동 2차',
    client: '삼성SDS',
    launching: '2013.06',
    url: ''
  },
  {
    title: '삼성전자 C&S 포털 사이트 웹접근성 컨설팅',
    desc: '삼성전자 C&S 포털 사이트 웹접근성 컨설팅 PJT',
    client: '삼성전자 / 삼성SDS',
    launching: '2013.06',
    url: ''
  },
  {
    title: '삼성SDS 메시지플러스 웹접근성 개선',
    desc: '삼성SDS 메시지플러스 웹접근성 개선 PJT',
    client: '삼성SDS',
    launching: '2013.05',
    url: ''
  },
  {
    title: '삼성그룹 대표사이트 웹접근성 개선',
    desc: '2013년 4월 시행되는 웹접근성 의무화에 대비하여 삼성그룹 사이트 웹접근성 개선 작업 완료',
    client: '삼성그룹 / 삼성SDS',
    launching: '2013.04',
    url: ''
  },
  {
    title: '신한금융그룹 IR 모바일웹 구축',
    desc: '신한금융그룹 IR 모바일웹 구축',
    client: '신한금융지주회사 / 신한데이타시스템',
    launching: '2013.03',
    url: ''
  },
  {
    title: '삼성미소금융재단 홈페이지 개편',
    desc: 'Flex 기반 웹사이트를 웹표준화 작업을 통해 접근성 개선 및 아이덴티티 정립',
    client: '삼성미소금융재단',
    launching: '2013.02',
    url: 'http://www.samsungmiso.or.kr'
  },
  {
    title: '삼성전자 C&S 포털 사이트 구축',
    desc: '삼성의 주력 콘텐츠 서비스인 삼성Apps, ChatOn, Allshare Play, Find My Mobile 서비스를 통합한 허브 사이트',
    client: '삼성전자 / 삼성SDS',
    launching: '2013.02',
    url: ''
  },
  {
    title: '두산 브랜드샵 구축',
    desc: '두산 브랜드샵 구축 PJT',
    client: '두산 / 이든앤앨리스 / 샤워트리',
    launching: '2013.02',
    url: ''
  },
  // 2012
  {
    title: '삼성닷컴 이벤트 관리 시스템 구축',
    desc: '다양한 이벤트 유형을 정형화하여 템플릿화하고, 통계 및 리포팅 자료 관리 시스템 구축',
    client: '삼성그룹 / 삼성SDS',
    launching: '2012.12',
    url: 'http://www.samsung.com/sec/promotion/eventAllList.do'
  },
  {
    title: '삼성닷컴 한국사이트 웹접근성 개선',
    desc: '2013년 4월 실행되는 웹접근성 의무화에 대비하여 한국삼성닷컴 사이트 웹접근성 개선 작업 완료',
    client: '삼성그룹 / 삼성SDS',
    launching: '2012.12',
    url: 'http://www.samsung.com/sec'
  },
  {
    title: '삼성전자 반도체 3D 이미지 제작',
    desc: '삼성전자 반도체 3D 이미지 제작',
    client: '삼성전자',
    launching: '2012.08',
    url: ''
  },
  {
    title: '삼성 사회봉사단 드림클래스 사이트 구축',
    desc: '삼성 사회봉사단 드림클래스 사이트 구축',
    client: '삼성사회봉사단 / 삼성SDS',
    launching: '2012.07',
    url: ''
  },
  {
    title: 'LIG손해보험 퇴직연금 홈페이지 개편',
    desc: 'LIG손해보험 퇴직연금 홈페이지 개편',
    client: '리드웹',
    launching: '2012.07',
    url: ''
  },
  {
    title: '삼성닷컴 한국사이트 체험단 서비스 구축',
    desc: '삼성닷컴 한국사이트 체험단 서비스 구축',
    client: '삼성전자 / 삼성SDS',
    launching: '2012.02',
    url: 'http://www.samsung.com/sec'
  },
  // 2011
  {
    title: '삼성 영삼성 사이트 리뉴얼 PJT',
    desc: '삼성 영삼성 사이트 리뉴얼 PJT',
    client: '삼성전자 / 삼성SDS',
    launching: '2011.12',
    url: ''
  },
  {
    title: '신한금융지주 홈페이지 리뉴얼 PJT',
    desc: '신한금융지주 홈페이지 리뉴얼 PJT',
    client: '신한금융지주',
    launching: '2011.12',
    url: 'http://www.shinhangroup.com'
  },
  {
    title: '한국 삼성닷컴 통합 PJT',
    desc: '한국 삼성닷컴 통합 PJT',
    client: '삼성전자 / 삼성SDS',
    launching: '2011.11',
    url: ''
  },
  {
    title: '신한WAY 커뮤니케이션 모바일 사이트 구축',
    desc: '신한WAY 커뮤니케이션 모바일 사이트 구축',
    client: '신한금융지주 / 신한데이타시스템',
    launching: '2011.07',
    url: ''
  },
  {
    title: '신한WAY 커뮤니케이션 사이트 구축',
    desc: '신한WAY 커뮤니케이션 사이트 구축',
    client: '신한금융지주 / 신한데이타시스템',
    launching: '2011.07',
    url: ''
  }
];

// 페이지당 표시할 항목 수
const ITEMS_PER_PAGE = 10;

function WorkPage() {
  // UI 렌더링용 상태
  const [currentSlide, setCurrentSlide] = useState(0);
  const [navMode, setNavMode] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHistory, setActiveHistory] = useState(null);
  const [slideClasses, setSlideClasses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const totalSlides = projectSlides.length;
  const hasMoreItems = visibleCount < historyItems.length;
  const visibleHistoryItems = historyItems.slice(0, visibleCount);
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

  // More 버튼 클릭 핸들러
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, historyItems.length));
  };

  return (
    <div className="work-page">
      {/* Custom Cursor */}
      <CustomCursor />

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
        {/* Floating Shapes - Bliss Style */}
        <div className="history-shape history-circle-1"></div>
        <div className="history-shape history-circle-2"></div>
        <div className="history-shape history-circle-3"></div>
        <div className="history-shape history-circle-4"></div>
        <div className="history-shape history-circle-5"></div>
        <div className="history-shape history-circle-6"></div>

        {/* Orbital Rings */}
        <div className="history-orbit history-orbit-1">
          <div className="orbit-dot"></div>
          <div className="orbit-dot"></div>
          <div className="orbit-dot"></div>
        </div>
        <div className="history-orbit history-orbit-2">
          <div className="orbit-dot"></div>
          <div className="orbit-dot"></div>
          <div className="orbit-dot"></div>
        </div>

        {/* Expanding Rings */}
        <div className="history-ring history-ring-1"></div>
        <div className="history-ring history-ring-2"></div>
        <div className="history-ring history-ring-3"></div>

        <div className="section-inner">
          <h2 className="section-label">PROJECT HISTORY</h2>

          <div className="project-history-list">
            {visibleHistoryItems.map((item, index) => (
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
          {hasMoreItems && (
            <div className="more-button-wrapper">
              <button className="more-btn" onClick={handleLoadMore}>MORE +</button>
            </div>
          )}
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
