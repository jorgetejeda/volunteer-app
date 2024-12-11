import { Category } from "./category";
import { Image } from "./commons/image";

export interface Event  {
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
  isUserEnrolled: number;
  images: Image[];
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
  images: File[];
  currentImages: Image[];
};


export interface Users {
  id: string;
  name: string;
  attended: boolean;
  submitted: boolean;
};

export interface UsersEvent {
  event: string;
  users: Users[];
};

export interface EventAttendance {
  userId: string,
  attended: boolean
}