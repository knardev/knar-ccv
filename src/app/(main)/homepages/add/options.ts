import { Enums } from "@/types/database.types";

export interface Option<T = string> {
  value: T;
  label: string;
}

export type IndustryCategory = Enums<"industry_category">;
export type IndustrySubcategory = Enums<"industry_subcategory">;
export type CompanyCategory = Enums<"company_category">;

// Map industry categories to their subcategories
export const industryData: {
  [key in IndustryCategory]: Option<IndustrySubcategory>[];
} = {
  "정보기술": [
    { value: "소프트웨어", label: "소프트웨어" },
    { value: "하드웨어", label: "하드웨어" },
    { value: "통신", label: "통신" },
    { value: "전자상거래", label: "전자상거래" },
    { value: "사이버 보안", label: "사이버 보안" },
    { value: "클라우드 서비스", label: "클라우드 서비스" },
    { value: "인공지능", label: "인공지능" },
  ],
  "제조업": [
    { value: "자동차", label: "자동차" },
    { value: "전자제품", label: "전자제품" },
    { value: "화학", label: "화학" },
    { value: "식품 가공", label: "식품 가공" },
    { value: "섬유", label: "섬유" },
    { value: "기계", label: "기계" },
    { value: "플라스틱", label: "플라스틱" },
  ],
  // ... (Add other categories similarly)
  "금융": [
    { value: "은행", label: "은행" },
    { value: "보험", label: "보험" },
    { value: "투자", label: "투자" },
    { value: "자산 관리", label: "자산 관리" },
    { value: "핀테크", label: "핀테크" },
    { value: "결제 서비스", label: "결제 서비스" },
  ],
  "의료": [
    { value: "제약", label: "제약" },
    { value: "병원", label: "병원" },
    { value: "의료 기기", label: "의료 기기" },
    { value: "생명공학", label: "생명공학" },
    { value: "헬스케어 IT", label: "헬스케어 IT" },
    { value: "진단", label: "진단" },
  ],
  "교육": [
    { value: "초중고 교육", label: "초중고 교육" },
    { value: "고등 교육", label: "고등 교육" },
    { value: "온라인 교육", label: "온라인 교육" },
    { value: "직업 교육", label: "직업 교육" },
    { value: "교육 기술", label: "교육 기술" },
  ],
  "건설": [
    { value: "주택 건설", label: "주택 건설" },
    { value: "상업 건설", label: "상업 건설" },
    { value: "인프라", label: "인프라" },
    { value: "부동산 개발", label: "부동산 개발" },
    { value: "토목 공학", label: "토목 공학" },
  ],
  "소매": [
    { value: "전자 상거래 소매", label: "전자 상거래 소매" },
    { value: "식료품", label: "식료품" },
    { value: "의류", label: "의류" },
    { value: "가정용품", label: "가정용품" },
    { value: "명품", label: "명품" },
    { value: "백화점", label: "백화점" },
  ],
  "서비스업": [
    { value: "호텔", label: "호텔" },
    { value: "레스토랑", label: "레스토랑" },
    { value: "여행사", label: "여행사" },
    { value: "운송 서비스", label: "운송 서비스" },
    { value: "이벤트 관리", label: "이벤트 관리" },
    { value: "컨설팅", label: "컨설팅" },
  ],
  "전문직": [
    { value: "법률 서비스", label: "법률 서비스" },
    { value: "회계", label: "회계" },
    { value: "세무", label: "세무" },
    { value: "엔지니어링", label: "엔지니어링" },
    { value: "건축", label: "건축" },
    { value: "마케팅", label: "마케팅" },
    { value: "디자인", label: "디자인" },
    { value: "경영 컨설팅", label: "경영 컨설팅" },
  ],
};

// Industry categories options
export const industryCategories: { value: IndustryCategory; label: string }[] = Object.keys(
  industryData
).map((key) => ({
  value: key as IndustryCategory,
  label: key,
}));

export const companyCategories: Option<CompanyCategory>[] = [
  { value: "대기업", label: "대기업" },
  { value: "스타트업", label: "스타트업" },
  { value: "전문직,병의원", label: "전문직,병의원" },
  { value: "공공기관,학교,연구실,협회", label: "공공기관,학교,연구실,협회" },
  { value: "이벤트,행사", label: "이벤트,행사" },
  { value: "기타", label: "기타" },

];

export type DesignDesireType = Enums<"design_desire_type">;
export type DesignMood = Enums<"design_mood">;
export type PrimaryColor = Enums<"primary_color">;

// Design desire type options
export const designDesireTypeOptions: Option<DesignDesireType>[] = [
  { value: "권위중시", label: "권위중시" },
  { value: "안정중시", label: "안정중시" },
  { value: "자극중시", label: "자극중시" },
];

// Design mood options
export const designMoodOptions: Option<DesignMood>[] = [
  { value: "심플한", label: "심플한" },
  { value: "전문적인", label: "전문적인" },
  { value: "강렬한", label: "강렬한" },
  { value: "깔끔한", label: "깔끔한" },
  { value: "신뢰가는", label: "신뢰가는" },
  { value: "안정적인", label: "안정적인" },
  { value: "정적인", label: "정적인" },
  { value: "따뜻한", label: "따뜻한" },
  { value: "고급스러운", label: "고급스러운" },
  { value: "귀여운", label: "귀여운" },
];

// Primary color options
export const primaryColorOptions: Option<PrimaryColor>[] = [
  { value: "빨강", label: "빨강" },
  { value: "파랑", label: "파랑" },
  { value: "초록", label: "초록" },
  { value: "노랑", label: "노랑" },
  { value: "검정", label: "검정" },
  { value: "하양", label: "하양" },
  { value: "보라", label: "보라" },
  { value: "주황", label: "주황" },
  { value: "회색", label: "회색" },
];


export type PlanGrammar = Enums<"copywriting_grammar">;

// Plan grammar options
export const planGrammarOptions: Option<PlanGrammar>[] = [
  { value: "짧구쉽퇴나", label: "짧구쉽퇴나" },
  { value: "공감 (오감)", label: "공감 (오감)" },
  { value: "가치입증 (권위)", label: "가치입증 (권위)" },
  { value: "가치입증 (수치)", label: "가치입증 (수치)" },
  { value: "대악당 (문제제기)", label: "대악당 (문제제기)" },
  { value: "생동감 (시각화)", label: "생동감 (시각화)" },
  { value: "생동감 (사례)", label: "생동감 (사례)" },
  { value: "행동유도 (참여)", label: "행동유도 (참여)" },
  { value: "행동유도 (매몰비용)", label: "행동유도 (매몰비용)" },
];

export type SectionType = Enums<"section_type">;

// Section type options
export const sectionTypeOptions: Option<SectionType>[] = [
  { value: "히어로 섹션", label: "히어로 섹션" },
  { value: "헤더 섹션", label: "헤더 섹션" },
  { value: "악당 섹션", label: "악당 섹션" },
  { value: "기능 섹션", label: "기능 섹션" },
  { value: "특장점 섹션", label: "특장점 섹션" },
  { value: "스텟 섹션 (숫자 강조)", label: "스텟 섹션 (숫자 강조)" },
  { value: "후기 섹션", label: "후기 섹션" },
  { value: "콘텐츠 섹션", label: "콘텐츠 섹션" },
  { value: "블로그 섹션", label: "블로그 섹션" },
  { value: "고객사 로고 섹션", label: "고객사 로고 섹션" },
  { value: "FAQ 섹션", label: "FAQ 섹션" },
  { value: "CTA 섹션", label: "CTA 섹션" },
  { value: "컨텍 섹션", label: "컨텍 섹션" },
  { value: "구성원소개 섹션", label: "구성원소개 섹션" },
  { value: "가격 섹션", label: "가격 섹션" },
  { value: "뉴스레터 섹션", label: "뉴스레터 섹션" },
  { value: "기타", label: "기타" },
];


export type pageCategory = Enums<"page_category">;

// Page category options
export const pageCategoryOptions: Option<pageCategory>[] = [
  { value: "메인 페이지", label: "메인 페이지" },
  { value: "소개 페이지", label: "소개 페이지" },
  { value: "기능 페이지", label: "기능 페이지" },
  { value: "뉴스 페이지", label: "뉴스 페이지" },
  { value: "구성원 페이지", label: "구성원 페이지" },
  { value: "컨텍 페이지", label: "컨텍 페이지" },
  { value: "기타", label: "기타" },
];

export type pageSubcategory = Enums<"page_subcategory">;

// Page subcategory options
export const pageSubcategoryOptions: Option<pageSubcategory>[] = [
  // <"인사말" | "미션/비전" | "CI" | "연혁" | "팀소개" | "블로그" | "언론보도" | "서비스 소개" | "분야 소개" | "오시는 길" | "쇼핑몰">
  { value: "인사말", label: "인사말" },
  { value: "미션/비전", label: "미션/비전" },
  { value: "CI", label: "CI" },
  { value: "연혁", label: "연혁" },
  { value: "팀소개", label: "팀소개" },
  { value: "블로그", label: "블로그" },
  { value: "언론보도", label: "언론보도" },
  { value: "서비스 소개", label: "서비스 소개" },
  { value: "분야 소개", label: "분야 소개" },
  { value: "오시는 길", label: "오시는 길" },
  { value: "쇼핑몰", label: "쇼핑몰" },
  { value: "기타", label: "기타" },
];