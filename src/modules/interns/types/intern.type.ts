declare interface Intern {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

declare interface InternsListApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Intern[];
}
