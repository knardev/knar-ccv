export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      homepages: {
        Row: {
          company_category:
            | Database["public"]["Enums"]["company_category"]
            | null
          created_at: string | null
          description: string
          design_desire_type: string | null
          design_desire_types:
            | Database["public"]["Enums"]["design_desire_type"][]
            | null
          design_mood: Database["public"]["Enums"]["design_mood"] | null
          design_moods: Database["public"]["Enums"]["design_mood"][] | null
          favicon_url: string | null
          id: string
          industry_category:
            | Database["public"]["Enums"]["industry_category"]
            | null
          industry_subcategory:
            | Database["public"]["Enums"]["industry_subcategory"]
            | null
          name: string
          plan_grammar:
            | Database["public"]["Enums"]["copywriting_grammar"]
            | null
          primary_color: Database["public"]["Enums"]["primary_color"] | null
          profile_id: string | null
          unique_selling_point: string | null
          url: string
          villian_deficiency: string | null
          visitor_needs: string | null
        }
        Insert: {
          company_category?:
            | Database["public"]["Enums"]["company_category"]
            | null
          created_at?: string | null
          description: string
          design_desire_type?: string | null
          design_desire_types?:
            | Database["public"]["Enums"]["design_desire_type"][]
            | null
          design_mood?: Database["public"]["Enums"]["design_mood"] | null
          design_moods?: Database["public"]["Enums"]["design_mood"][] | null
          favicon_url?: string | null
          id?: string
          industry_category?:
            | Database["public"]["Enums"]["industry_category"]
            | null
          industry_subcategory?:
            | Database["public"]["Enums"]["industry_subcategory"]
            | null
          name: string
          plan_grammar?:
            | Database["public"]["Enums"]["copywriting_grammar"]
            | null
          primary_color?: Database["public"]["Enums"]["primary_color"] | null
          profile_id?: string | null
          unique_selling_point?: string | null
          url: string
          villian_deficiency?: string | null
          visitor_needs?: string | null
        }
        Update: {
          company_category?:
            | Database["public"]["Enums"]["company_category"]
            | null
          created_at?: string | null
          description?: string
          design_desire_type?: string | null
          design_desire_types?:
            | Database["public"]["Enums"]["design_desire_type"][]
            | null
          design_mood?: Database["public"]["Enums"]["design_mood"] | null
          design_moods?: Database["public"]["Enums"]["design_mood"][] | null
          favicon_url?: string | null
          id?: string
          industry_category?:
            | Database["public"]["Enums"]["industry_category"]
            | null
          industry_subcategory?:
            | Database["public"]["Enums"]["industry_subcategory"]
            | null
          name?: string
          plan_grammar?:
            | Database["public"]["Enums"]["copywriting_grammar"]
            | null
          primary_color?: Database["public"]["Enums"]["primary_color"] | null
          profile_id?: string | null
          unique_selling_point?: string | null
          url?: string
          villian_deficiency?: string | null
          visitor_needs?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homepages_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          category: Database["public"]["Enums"]["page_category"]
          created_at: string
          homepage_id: string
          id: string
          sub_category: Database["public"]["Enums"]["page_subcategory"] | null
        }
        Insert: {
          category: Database["public"]["Enums"]["page_category"]
          created_at?: string
          homepage_id: string
          id?: string
          sub_category?: Database["public"]["Enums"]["page_subcategory"] | null
        }
        Update: {
          category?: Database["public"]["Enums"]["page_category"]
          created_at?: string
          homepage_id?: string
          id?: string
          sub_category?: Database["public"]["Enums"]["page_subcategory"] | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_homepage_id_fkey"
            columns: ["homepage_id"]
            isOneToOne: false
            referencedRelation: "homepages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_role: Database["public"]["Enums"]["account_role"]
          created_at: string
          homepage_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          account_role?: Database["public"]["Enums"]["account_role"]
          created_at?: string
          homepage_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          account_role?: Database["public"]["Enums"]["account_role"]
          created_at?: string
          homepage_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_homepage_id_fkey"
            columns: ["homepage_id"]
            isOneToOne: false
            referencedRelation: "homepages"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          content: string | null
          created_at: string | null
          homepage_id: string | null
          id: string
          image_url: string[]
          main_copy: string | null
          page_id: string | null
          page_sequence: number | null
          profile_id: string | null
          sub_copy: string | null
          type: Database["public"]["Enums"]["section_type"] | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          homepage_id?: string | null
          id?: string
          image_url: string[]
          main_copy?: string | null
          page_id?: string | null
          page_sequence?: number | null
          profile_id?: string | null
          sub_copy?: string | null
          type?: Database["public"]["Enums"]["section_type"] | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          homepage_id?: string | null
          id?: string
          image_url?: string[]
          main_copy?: string | null
          page_id?: string | null
          page_sequence?: number | null
          profile_id?: string | null
          sub_copy?: string | null
          type?: Database["public"]["Enums"]["section_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_homepage_id_fkey"
            columns: ["homepage_id"]
            isOneToOne: false
            referencedRelation: "homepages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_role: "ADMIN" | "USER"
      company_category:
        | "대기업"
        | "스타트업"
        | "전문직,병의원"
        | "공공기관,학교,연구실,협회"
        | "이벤트,행사"
        | "기타"
      copywriting_grammar:
        | "짧구쉽퇴나"
        | "공감 (오감)"
        | "가치입증 (권위)"
        | "가치입증 (수치)"
        | "대악당 (문제제기)"
        | "생동감 (시각화)"
        | "생동감 (사례)"
        | "행동유도 (참여)"
        | "행동유도 (매몰비용)"
      design_desire_type: "권위중시" | "안정중시" | "자극중시"
      design_mood:
        | "심플한"
        | "전문적인"
        | "강렬한"
        | "깔끔한"
        | "신뢰가는"
        | "안정적인"
        | "정적인"
        | "따뜻한"
        | "고급스러운"
        | "귀여운"
      industry_category:
        | "정보기술"
        | "제조업"
        | "금융"
        | "의료"
        | "교육"
        | "건설"
        | "소매"
        | "서비스업"
        | "전문직"
      industry_subcategory:
        | "소프트웨어"
        | "하드웨어"
        | "통신"
        | "전자상거래"
        | "사이버 보안"
        | "클라우드 서비스"
        | "인공지능"
        | "자동차"
        | "전자제품"
        | "화학"
        | "식품 가공"
        | "섬유"
        | "기계"
        | "플라스틱"
        | "은행"
        | "보험"
        | "투자"
        | "자산 관리"
        | "핀테크"
        | "결제 서비스"
        | "제약"
        | "병원"
        | "의료 기기"
        | "생명공학"
        | "헬스케어 IT"
        | "진단"
        | "초중고 교육"
        | "고등 교육"
        | "온라인 교육"
        | "직업 교육"
        | "교육 기술"
        | "주택 건설"
        | "상업 건설"
        | "인프라"
        | "부동산 개발"
        | "토목 공학"
        | "전자 상거래 소매"
        | "식료품"
        | "의류"
        | "가정용품"
        | "명품"
        | "백화점"
        | "호텔"
        | "레스토랑"
        | "여행사"
        | "운송 서비스"
        | "이벤트 관리"
        | "컨설팅"
        | "법률 서비스"
        | "회계"
        | "세무"
        | "엔지니어링"
        | "건축"
        | "마케팅"
        | "디자인"
        | "경영 컨설팅"
      page_category:
        | "메인 페이지"
        | "소개 페이지"
        | "기능 페이지"
        | "뉴스 페이지"
        | "구성원 페이지"
        | "컨텍 페이지"
        | "기타"
      page_subcategory:
        | "인사말"
        | "미션/비전"
        | "CI"
        | "연혁"
        | "팀소개"
        | "블로그"
        | "언론보도"
        | "서비스 소개"
        | "분야 소개"
        | "오시는 길"
        | "쇼핑몰"
        | "기타"
      primary_color:
        | "빨강"
        | "파랑"
        | "초록"
        | "노랑"
        | "검정"
        | "하양"
        | "보라"
        | "주황"
        | "회색"
      section_type:
        | "히어로 섹션"
        | "헤더 섹션"
        | "악당 섹션"
        | "FAQ 섹션"
        | "블로그 섹션"
        | "기능 섹션"
        | "가격 섹션"
        | "구성원소개 섹션"
        | "콘텐츠 섹션"
        | "뉴스레터 섹션"
        | "스텟 섹션 (숫자 강조)"
        | "CTA 섹션"
        | "컨텍 섹션"
        | "후기 섹션"
        | "고객사 로고 섹션"
        | "기타"
        | "특장점 섹션"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
