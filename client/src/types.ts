export type Category = "work" | "personal" | "study" | "fitness" | "travel";
export interface EventItem {
  _id?: string;
  title: string;
  description?: string;
  date: string; // ISO
  category: Category;
}
