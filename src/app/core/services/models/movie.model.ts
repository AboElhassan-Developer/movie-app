export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  [key: string]: any; // مرونة لأي بيانات إضافية
}
