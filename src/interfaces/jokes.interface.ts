export interface Joke {
  id: string;
  content: string;
  theme_id: number;
  author_id: number;
  created_at: Date;
  updated_at?: Date;
}