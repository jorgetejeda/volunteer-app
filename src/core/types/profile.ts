export interface Profile {
  id?: number;
  profileImage: string;
  description: string;
  hobbies: string[];
  interests: string[];
}

export interface ProfileDto {
  avatar?: File;
  description: string;
  hobbies: string[];
  interests: string[];
}