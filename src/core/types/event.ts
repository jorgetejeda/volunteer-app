import { Category } from "./category";

export interface Event {
  id: number;
  title: string;
  imageName: string;
  description: string;
  date: Date;
  quota: number;
  location: string;
  duration: string | number;
  allDay: boolean;
  published: boolean;
  category: Category;
  usersQuantity: number;
  instructions: string;
  time: string;
}

export interface EventDto {
  title: string;
  description: string;
  instructions: string;
  categoryId: number;
  time: string;
  date: string;
  quota: number;
  location: string;
  duration: number;
  allDay: boolean;
  mainImage: string;
  images: File[];
  category?: Category;
}
