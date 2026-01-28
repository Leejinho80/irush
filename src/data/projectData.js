// 프로젝트 슬라이드 데이터 (OUR WORK 페이지)
// 이미지 import
import portfolio01Bg from '../assets/images/01_portfolio_bg.jpg';
import portfolio01View from '../assets/images/01_portfolio_view.jpg';
import portfolio03Bg from '../assets/images/03_portfolio_bg.jpg';
import portfolio03View from '../assets/images/03_portfolio_view.jpg';

export const projectSlides = [
  {
    id: 1,
    title: 'LG헬로비전 모바일 직영몰 고도화',
    desc: '기존 모바일 서비스의 사용자 경험을 전면 개선하고 최신 트렌드에 맞는 UI/UX를 적용',
    image: portfolio01Bg,
    link: '/work-detail/1'
  },
  {
    id: 2,
    title: '삼성닷컴 글로벌 백엔드 시스템 개선',
    desc: '글로벌 이커머스 플랫폼의 백엔드 아키텍처 최적화 및 성능 개선',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop',
    link: '/work-detail/2'
  },
  {
    id: 3,
    title: 'LG헬로비전 방송/인터넷 노후화 개선',
    desc: '케이블TV 시장의 디지털 전환과 고객 중심 UX/UI 혁신',
    image: portfolio03Bg,
    link: '/work-detail/3'
  },
  {
    id: 4,
    title: '삼성 SDS SCP SingleID 서비스 CX 개선',
    desc: 'Samsung Cloud Platform의 통합인증/보안 솔루션 사용자 경험 혁신',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=1080&fit=crop',
    link: '/work-detail/4'
  },
  {
    id: 5,
    title: 'LG헬로비전 통합 웹사이트 운영',
    desc: 'LG헬로비전 전 서비스 웹사이트 통합 운영 및 지속적 개선',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop',
    link: '/work-detail/5'
  },
  {
    id: 6,
    title: '국내외 기업 SRM 서비스 운영',
    desc: '현대글로비스, 아모레퍼시픽 등 대기업 구매시스템 운영',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    link: '/work-detail/6'
  }
];

// 프로젝트 상세 데이터
export const projectDetails = {
  1: {
    id: 1,
    title: 'LG헬로비전 모바일 직영몰 고도화',
    viewImage: portfolio01View,
    overview: [
      'LG헬로비전의 모바일 직영몰 고도화 프로젝트는 기존 모바일 서비스의 사용자 경험을 전면적으로 개선하고, 최신 트렌드에 맞는 UI/UX를 적용하여 고객 만족도를 높이는 것을 목표로 진행되었습니다.',
      '특히 모바일 환경에서의 직관적인 네비게이션과 간편한 결제 프로세스를 구현하여, 고객이 원하는 상품을 빠르게 찾고 구매할 수 있도록 최적화하였습니다.'
    ],
    challenges: [
      { title: '결제율+수익율\n문제+원인', desc: '기존 결제 프로세스의 복잡성으로 인한 이탈률 증가' },
      { title: '필요 정보는\n많지만 더보기', desc: '정보 과다로 인한 사용자 혼란 및 핵심 정보 접근성 저하' },
      { title: '선택을 어렵게만드는\n복잡한 상품 구성', desc: '다양한 요금제와 옵션으로 인한 의사결정 지연' },
      { title: '기존 고객의\n반복성 부족', desc: '재방문 유도 요소 부재로 인한 고객 유지율 하락' }
    ],
    solutions: [
      { title: 'Dual Main', desc: '고객 니즈에 따라 직관적인 Dual Main 구조로 요금제 탐색과 가입을 동시에 진행' },
      { title: 'Quick', desc: '빠른 상단 인터페이스로 핵심 정보에 즉시 접근 가능' },
      { title: 'Empower', desc: '고객이 원하는 상품의 최적 옵션을 심플하게 구성' },
      { title: 'Self-Driven', desc: '고객 스스로 가입 여정을 완수할 수 있도록 가이드 제공' }
    ],
    customerVoice: {
      title: '고객을 만나다.',
      desc: '실제 사용자들의 피드백을 통해 서비스를 지속적으로 개선하고,\n고객 중심의 경험을 제공하기 위해 노력하고 있습니다.'
    }
  },
  2: {
    id: 2,
    title: '삼성닷컴 글로벌 백엔드 시스템 개선',
    viewImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop',
    overview: [
      '삼성닷컴 글로벌 백엔드 시스템 개선 프로젝트는 전 세계 64개국에서 운영되는 삼성닷컴의 백엔드 아키텍처를 현대화하고, 시스템 성능을 극대화하는 것을 목표로 진행되었습니다.',
      'MSA(Microservices Architecture) 기반의 유연한 시스템 구조로 전환하여, 글로벌 트래픽 증가에 대응하고 각 국가별 맞춤 서비스 제공이 가능하도록 개선하였습니다.'
    ],
    challenges: [
      { title: '레거시 시스템\n복잡성', desc: '오래된 모놀리식 아키텍처로 인한 유지보수 어려움' },
      { title: '글로벌 트래픽\n대응 한계', desc: '급증하는 글로벌 사용자 트래픽에 대한 확장성 부족' },
      { title: '국가별 서비스\n커스터마이징', desc: '64개국 각기 다른 요구사항에 대한 유연한 대응 필요' },
      { title: '배포 및 운영\n효율성', desc: '빈번한 업데이트에 따른 배포 프로세스 복잡성' }
    ],
    solutions: [
      { title: 'MSA 전환', desc: '마이크로서비스 아키텍처 도입으로 서비스 간 독립성 확보 및 확장성 개선' },
      { title: 'API Gateway', desc: '통합 API 게이트웨이 구축으로 트래픽 관리 및 보안 강화' },
      { title: 'Container 기반', desc: 'Kubernetes 기반 컨테이너 오케스트레이션으로 배포 자동화' },
      { title: 'CDN 최적화', desc: '글로벌 CDN 전략 수립으로 각 지역별 응답 속도 개선' }
    ],
    customerVoice: {
      title: '기술 혁신의 파트너',
      desc: '삼성전자와 함께 글로벌 이커머스 플랫폼의 기술적 혁신을 이끌며,\n안정적이고 확장 가능한 시스템 구축에 기여하고 있습니다.'
    }
  },
  3: {
    id: 3,
    title: 'LG헬로비전 방송/인터넷 노후화 개선',
    viewImage: portfolio03View,
    overview: [
      '온라인으로 더 편리하고 더 빨라지는 세상, 저렴한 인터넷·방송을 온라인으로 가입하는 비율은 고객의 16%에 달합니다.',
      '최근 한국의 케이블TV 시장은 점점 침체되고 있는 상황에서, 고객에게 더 나은 경험을 제공하기 위한 Customer-Centric Solution을 제시하였습니다.'
    ],
    challenges: [
      { title: '침체된 시장', desc: '케이블TV 시장의 지속적인 침체와 경쟁 심화' },
      { title: '고객사 이탈', desc: '온라인 스트리밍 서비스로의 고객 이탈 증가' },
      { title: '복잡한 고객경험', desc: '가입/변경/해지 프로세스의 복잡성으로 인한 불만' },
      { title: '노후화된 시스템', desc: '기존 시스템의 노후화로 인한 유지보수 비용 증가' }
    ],
    solutions: [
      { title: 'Customer Driven', desc: '고객 중심의 서비스 설계로 사용자 니즈 충족' },
      { title: 'Innovative Look', desc: '혁신적인 비주얼 디자인으로 브랜드 이미지 제고' },
      { title: 'Trusted Information', desc: '신뢰할 수 있는 정보 제공으로 의사결정 지원' },
      { title: 'Quick Access', desc: '빠른 접근성으로 60초 내 원하는 정보 도달' }
    ],
    customerVoice: {
      title: '지속 가능한 성장',
      desc: 'OUTPUT: 167% 매출 증가, 120% 가입 증가, 20% 이탈률 감소\n고객과 함께 성장하는 지속 가능한 비즈니스 모델을 구축하였습니다.'
    }
  },
  4: {
    id: 4,
    title: '삼성 SDS SCP SingleID 서비스 CX 개선',
    viewImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=1080&fit=crop',
    overview: [
      'Samsung Cloud Platform(SCP)의 SaaS 솔루션 중 통합인증/보안 서비스인 SingleID의 고객 경험(CX) 개선 프로젝트입니다.',
      'B2B 고객을 위한 직관적인 인증 관리 대시보드와 보안 정책 설정 인터페이스를 구축하여, 기업 고객의 업무 효율성을 극대화하였습니다.'
    ],
    challenges: [
      { title: '복잡한 인증 체계', desc: '다양한 인증 방식(SSO, MFA, SAML)의 통합 관리 어려움' },
      { title: 'B2B UX 한계', desc: '기업 관리자를 위한 직관적인 인터페이스 부재' },
      { title: '보안 정책 설정', desc: '복잡한 보안 정책 설정으로 인한 설정 오류 빈발' },
      { title: '온보딩 복잡성', desc: '신규 기업 고객의 서비스 도입 시 높은 학습 비용' }
    ],
    solutions: [
      { title: 'Unified Dashboard', desc: '통합 대시보드로 모든 인증 현황을 한눈에 파악' },
      { title: 'Wizard 기반 설정', desc: '단계별 가이드로 복잡한 보안 정책도 쉽게 설정' },
      { title: 'Real-time Monitoring', desc: '실시간 모니터링으로 보안 위협 즉시 대응' },
      { title: 'Self-service Portal', desc: '셀프서비스 포털로 관리자 업무 부담 경감' }
    ],
    customerVoice: {
      title: '보안과 편의성의 균형',
      desc: '기업 보안의 핵심인 인증 서비스를 더욱 안전하고 편리하게,\n삼성 SDS와 함께 클라우드 보안의 새로운 표준을 만들어가고 있습니다.'
    }
  },
  5: {
    id: 5,
    title: 'LG헬로비전 통합 웹사이트 운영',
    viewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop',
    overview: [
      'LG헬로비전의 모든 서비스(케이블TV, 인터넷, 모바일, 렌탈 등)를 아우르는 통합 웹사이트 운영 프로젝트입니다.',
      '다양한 서비스를 하나의 플랫폼에서 일관된 사용자 경험으로 제공하며, 지속적인 개선과 최적화를 통해 고객 만족도를 높이고 있습니다.'
    ],
    challenges: [
      { title: '서비스 다양성', desc: '케이블TV, 인터넷, 모바일, 렌탈 등 다양한 서비스 통합 필요' },
      { title: '일관된 UX', desc: '서비스별 상이한 UI/UX로 인한 고객 혼란' },
      { title: '실시간 운영', desc: '24/7 서비스 운영에 따른 즉각적인 대응 체계 필요' },
      { title: '성과 측정', desc: '다양한 서비스의 성과를 통합적으로 분석하는 체계 부재' }
    ],
    solutions: [
      { title: 'Design System', desc: '통합 디자인 시스템 구축으로 일관된 사용자 경험 제공' },
      { title: 'Agile 운영', desc: '애자일 방법론 기반 빠른 이슈 대응 및 지속적 개선' },
      { title: 'Analytics 통합', desc: '통합 분석 대시보드로 서비스별 성과 모니터링' },
      { title: 'A/B Testing', desc: '지속적인 A/B 테스트로 사용자 경험 최적화' }
    ],
    customerVoice: {
      title: '함께 성장하는 파트너',
      desc: 'LG헬로비전과 장기간 파트너십을 통해 축적된 노하우로,\n고객 중심의 서비스 운영과 지속적인 혁신을 이끌고 있습니다.'
    }
  },
  6: {
    id: 6,
    title: '국내외 기업 SRM 서비스 운영',
    viewImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    overview: [
      '현대글로비스 아태/미주/유럽 구매시스템, 아모레퍼시픽 간접구매시스템 등 대기업 SRM(Supplier Relationship Management) 서비스 운영 프로젝트입니다.',
      '엠로(Emro)와 협력하여 글로벌 기업의 공급망 관리 시스템을 안정적으로 운영하고, 지속적인 기능 개선을 통해 업무 효율성을 높이고 있습니다.'
    ],
    challenges: [
      { title: '글로벌 운영', desc: '아태, 미주, 유럽 등 다양한 지역의 시스템 통합 운영' },
      { title: '복잡한 프로세스', desc: '기업별 상이한 구매 프로세스와 정책 대응' },
      { title: '다국어 지원', desc: '글로벌 사용자를 위한 다국어 인터페이스 필요' },
      { title: '시스템 안정성', desc: '비즈니스 크리티컬 시스템의 무중단 운영 필수' }
    ],
    solutions: [
      { title: 'Global Platform', desc: '글로벌 통합 플랫폼으로 지역별 특성을 반영한 운영' },
      { title: 'Process 표준화', desc: '베스트 프랙티스 기반 구매 프로세스 표준화' },
      { title: 'i18n Framework', desc: '국제화 프레임워크로 손쉬운 다국어 지원' },
      { title: '24/7 Monitoring', desc: '24시간 모니터링 체계로 시스템 안정성 확보' }
    ],
    customerVoice: {
      title: '신뢰받는 운영 파트너',
      desc: '현대글로비스, 아모레퍼시픽 등 국내 대기업의 구매 시스템을\n안정적으로 운영하며 공급망 관리의 디지털 혁신에 기여하고 있습니다.'
    }
  }
};
