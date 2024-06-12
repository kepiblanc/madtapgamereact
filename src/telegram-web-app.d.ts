declare namespace Telegram {
    interface InitDataUser {
      allows_write_to_pm: boolean,
      id: number;
      first_name: string;
      last_name: string;
      username: string;
      language_code: string;
      photo_url?: string;
    }
  
    interface InitDataUnsafe {
      query_id: string;
      user: InitDataUser;
      auth_date: number;
      hash: string;
    }
  
    interface WebApp {
      initData: string;
      initDataUnsafe: InitDataUnsafe;
      ready: () => void;
    }
  
    const WebApp: WebApp;
}
  