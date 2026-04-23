export const siteContent = {
  seo: {
    title: "배지훈 | 프론트엔드 개발자 포트폴리오",
    description:
      "사용자 흐름을 매끄럽게 만들고 팀의 개발 속도를 높이는 프론트엔드 개발자 배지훈의 포트폴리오입니다.",
    siteUrl: "",
    keywords: [
      "프론트엔드 개발자",
      "포트폴리오",
      "웹 개발",
      "UI 엔지니어링",
      "사용자 경험",
    ],
  },
  hero: {
    name: "배지훈",
    role: "프론트엔드 개발자",
    oneLiner:
      "제품의 디테일을 설계하고, 팀이 오래 유지할 수 있는 UI 구조를 만드는 개발자입니다.",
    location: "Seoul, South Korea",
    status: "새로운 프론트엔드 기회를 검토하고 있습니다.",
    ctas: [
      { label: "프로젝트 보기", href: "#projects", kind: "primary" },
      { label: "연락하기", href: "#contact", kind: "secondary" },
    ],
  },
  about: {
    paragraphs: [
      "복잡한 요구사항을 사용자에게는 단순하고 명확한 경험으로 번역하는 일을 좋아합니다. 기능 하나를 만들더라도 화면 구조, 상태 흐름, 협업 비용까지 함께 봅니다.",
      "최근에는 재사용 가능한 UI 패턴 정리, API 연동 안정화, 운영 이후 개선 사이클을 빠르게 만드는 프론트엔드 설계에 관심을 두고 있습니다.",
    ],
    strengths: [
      "문제 정의부터 구현 우선순위 정리까지 주도하며, 모호한 요구사항을 실행 가능한 단위로 나눕니다.",
      "디자인과 기획 의도를 화면 구조와 인터랙션으로 번역해 팀 간 커뮤니케이션 비용을 줄입니다.",
      "한 번 만든 UI가 오래 유지되도록 컴포넌트 경계와 상태 흐름을 명확하게 설계합니다.",
    ],
  },
  experience: [
    {
      company: "프로덕트 스튜디오 A",
      role: "Frontend Engineer",
      period: "2023 - 현재",
      summary:
        "B2B SaaS 대시보드와 운영용 내부 도구를 개발하며, 공통 UI 패턴 정리와 프론트엔드 구조 개선을 담당했습니다.",
      bullets: [
        "대시보드 화면을 카드 기반 정보 구조로 재설계해 신규 기능 추가 시 화면 설계 시간을 줄였습니다.",
        "API 응답 상태와 예외 케이스 처리를 일관된 패턴으로 정리해 운영 이슈 대응 속도를 높였습니다.",
      ],
    },
    {
      company: "커머스 팀 B",
      role: "Web Developer",
      period: "2021 - 2023",
      summary:
        "프로모션 페이지와 주문/정산 관련 화면을 개발하며 실사용자 흐름을 개선하는 프론트엔드 작업을 맡았습니다.",
      bullets: [
        "주문 상태 확인 흐름을 단순화해 고객센터 문의가 집중되던 구간을 개선했습니다.",
        "디자인 변경이 잦은 페이지를 재사용 가능한 섹션 구조로 바꿔 배포 속도와 안정성을 높였습니다.",
      ],
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        "JavaScript",
        "TypeScript",
        "React",
        "HTML5",
        "CSS3",
        "Accessibility",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "REST API", "Express", "Auth Flow", "Data Modeling"],
    },
    {
      category: "Tools",
      items: ["GitHub", "Figma", "Storybook", "Vite", "Jest", "CI/CD"],
    },
  ],
  projects: [
    {
      name: "운영 대시보드 리디자인",
      period: "2024",
      summary:
        "운영팀이 빠르게 상태를 파악하고 액션을 취할 수 있도록 대시보드 정보 구조를 다시 설계한 프로젝트입니다.",
      problem:
        "중요 지표와 상세 정보가 한 화면에 혼재되어 있어 신규 운영자가 맥락을 파악하기 어려웠습니다.",
      solution:
        "핵심 지표, 상태 카드, 상세 테이블을 계층화하고 공통 컴포넌트 규칙을 세워 화면 구조를 표준화했습니다.",
      impact:
        "대시보드 기반 의사결정 흐름이 명확해졌고, 이후 기능 추가 시 화면 설계 시간이 줄어들었습니다.",
      stack: ["React", "TypeScript", "Design System", "REST API"],
      links: [
        { label: "GitHub", href: "https://github.com/your-handle/dashboard-redesign" },
        { label: "Demo", href: "" },
      ],
      featured: true,
    },
    {
      name: "실시간 주문 모니터링 화면",
      period: "2023",
      summary:
        "주문 상태를 빠르게 필터링하고, 이슈 주문을 우선 대응할 수 있도록 만든 운영 도구형 프로젝트입니다.",
      problem:
        "실시간 주문 이슈를 텍스트 위주로 확인해야 해 대응 우선순위를 빠르게 판단하기 어려웠습니다.",
      solution:
        "상태 색상 체계, 필터 패널, 상세 drawer 패턴을 도입해 운영자가 흐름을 끊지 않고 화면을 탐색할 수 있게 했습니다.",
      impact:
        "운영 효율이 높아졌고, 비정상 주문을 확인하는 데 걸리는 시간을 줄이는 데 기여했습니다.",
      stack: ["JavaScript", "HTML", "CSS", "Monitoring UX"],
      links: [
        { label: "GitHub", href: "https://github.com/your-handle/order-monitor" },
        { label: "Demo", href: "https://your-demo-url.example" },
      ],
      featured: true,
    },
    {
      name: "디자인 시스템 실험실",
      period: "2022",
      summary:
        "반복되는 UI 패턴을 정리하고 문서화하기 위해 컴포넌트 실험과 가이드 정리를 병행한 개인 프로젝트입니다.",
      problem:
        "작은 화면 단위로 구현을 반복하다 보니 버튼, 카드, 상태 표현 방식이 팀마다 달랐습니다.",
      solution:
        "토큰, 버튼, 입력 필드, 카드 조합 규칙을 먼저 정리하고 예제 화면과 함께 문서화했습니다.",
      impact:
        "팀 내 공통 언어가 생기고, 화면 설계 논의 시 추상적인 표현보다 구체적인 패턴 기준으로 대화할 수 있게 됐습니다.",
      stack: ["React", "Storybook", "CSS", "Documentation"],
      links: [
        { label: "GitHub", href: "https://github.com/your-handle/design-lab" },
        { label: "Demo", href: "" },
      ],
      featured: true,
    },
  ],
  contact: {
    email: "hello@your-domain.dev",
    github: "https://github.com/your-handle",
    linkedin: "",
    resume: "",
  },
};
