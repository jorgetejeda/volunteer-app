import { Category } from "./category";

export type Event = {
  id: number;
  title: string;
  mainImage: string;
  description: string;
  instructions: string;
  date: string;
  time: string;
  quota: number;
  location: string;
  duration: string;
  allDay: boolean;
  published: boolean;
  category: Category;
  usersQuantity: number;
  isUserEnrolled: boolean;
  images: Image[];
};

type Image = {
  id: number;
  documentName: string;
  documentUrl: string;
};

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

export interface UpdateEventDto {
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
  images: Image[] | File[];
};

