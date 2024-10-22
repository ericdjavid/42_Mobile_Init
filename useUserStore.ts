import { create } from "zustand";

interface UserInfo {
  id: number;
  login: string;
  email: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: string | null;
  url: string;
  phone: string;
  displayname: string;
  kind: string;
  image: {
    link: string;
    versions: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    };
  };
  staff?: boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: string | null;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string;
  created_at: string;
  updated_at: string;
  alumnized_at: string | null;
  alumni?: boolean;
  active?: boolean;
  groups: any[]; 
  cursus_users: {
    grade: string | null;
    level: number;
    skills: {
      id: number;
      name: string;
      level: number;
    }[];
    blackholed_at: string | null;
    id: number;
    begin_at: string;
    end_at: string | null;
    cursus_id: number;
    has_coalition: boolean;
    created_at: string;
    updated_at: string;
    user: UserInfo; // Recursive reference to UserInfo
    cursus: {
      id: number;
      created_at: string;
      name: string;
      slug: string;
      kind: string;
    };
  }[];
  projects_users: {
    id: number;
    occurrence: number;
    final_mark: number | null;
    status: string;
    validated?: boolean;
    current_team_id: number | null;
    project: {
      id: number;
      name: string;
      slug: string;
      parent_id: number | null;
    };
    cursus_ids: number[];
    marked_at: string | null;
    marked: boolean;
    retriable_at: string | null;
    created_at: string;
    updated_at: string;
  }[];
  languages_users: {
    id: number;
    language_id: number;
    user_id: number;
    position: number;
    created_at: string;
  }[];
  achievements: {
    id: number;
    name: string;
    description: string;
    tier: string;
    kind: string;
    visible: boolean;
    image: string;
    nbr_of_success: number | null;
    users_url: string;
  }[];
  titles: {
    id: number;
    name: string;
  }[];
  titles_users: {
    id: number;
    user_id: number;
    title_id: number;
    selected: boolean;
    created_at: string;
    updated_at: string;
  }[];
  partnerships: any[]; 
  patroned: any[]; 
  patroning: any[]; 
  expertises_users: any[]; 
  roles: any[]; 
  campus: {
    id: number;
    name: string;
    time_zone: string;
    language: {
      id: number;
      name: string;
      identifier: string;
      created_at: string;
      updated_at: string;
    };
    users_count: number;
    vogsphere_id: number;
    country: string;
    address: string;
    zip: string;
    city: string;
    website: string;
    facebook: string;
    twitter: string;
    active: boolean;
    public: boolean;
    email_extension: string;
    default_hidden_phone: boolean;
  }[];
  campus_users: {
    id: number;
    user_id: number;
    campus_id: number;
    is_primary: boolean;
    created_at: string;
    updated_at: string;
  }[];
}

interface UserStore {
  userInfo: UserInfo[];
  setUserInfo: (info: UserInfo[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userInfo: [],
  setUserInfo: (info) => set({ userInfo: info }),
}));
