import httpImplementation from "@/core-libraries/http/http.implementation";
import { ApiResponse } from "@/core-libraries/http/types/api-response";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { Profile, ProfileDto } from "@/core/types/profile";
import { AxiosHeaders } from "axios";
import { compressImages } from "@/utils"; 

class ProfileService {
  private readonly baseUrl = "profile";
  private readonly defaultHeaders: AxiosHeaders;

  constructor() {
    this.defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    } as unknown as AxiosHeaders;
  }

  async upsertProfile(data: ProfileDto): Promise<ApiResponse<Profile>> {
    try {
      const formData = new FormData();
  
      if (data.avatar && data.avatar.size > 0) {
        const options: Record<string, number | boolean> = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
  
        const compressedAvatar = await compressImages([data.avatar], options);
        console.log("Compressed avatar:", compressedAvatar);
        formData.append("avatar", compressedAvatar[0], compressedAvatar[0].name);
      }
  
      Object.keys(data).forEach((key) => {
        if (key === "hobbies" || key === "interests") {
          (data[key] as string[]).forEach((item) => {
            formData.append(key, item);
          });
        } else if (key !== "avatar") {
          formData.append(key, String(data[key as keyof ProfileDto]));
        }
      });
  
      return await httpImplementation.post<ApiResponse<Profile>, FormData>(
        ServicesInstanceEnum.API_INSTANCE,
        this.baseUrl,
        formData,
        "json",
        this.defaultHeaders
      );
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }
  
  
  async getUserProfile(): Promise<ApiResponse<Profile>> {
    try {
      return await httpImplementation.get<ApiResponse<Profile>, unknown>(
        ServicesInstanceEnum.API_INSTANCE,
        this.baseUrl,
      );
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }
}

const profileService = new ProfileService();
export default profileService;
