import httpImplementation from "@/core-libraries/http/http.implementation";
import { ApiResponse } from "@/core-libraries/http/types/api-response";
import { Event, EventDto } from "@/core/types/event";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { AxiosHeaders } from "axios";

export default class EventService {
  static async createEvent(data: EventDto): Promise<ApiResponse<Event>> {
    const formData = new FormData();

    const defaultHeaders: AxiosHeaders = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    } as unknown as AxiosHeaders;

    // Add simple fields
    Object.keys(data).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
      } else {
        formData.append(key, String(data[key as keyof EventDto]));
      }
    });

    return httpImplementation.post<ApiResponse<Event>, FormData>(
      ServicesInstanceEnum.API_INSTANCE,
      "/events",
      formData,
      "json",
      defaultHeaders
    );
  }

  static async getEvents(): Promise<ApiResponse<Event[]>> {
    return httpImplementation.get<ApiResponse<Event[]>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      "/events"
    );
  }

  static async getEventById(id: number): Promise<ApiResponse<Event>> {
    return httpImplementation.get<ApiResponse<Event>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      `/events/${id}`
    );
  }

  static async updateEvent(
    id: number,
    data: Partial<EventDto>
  ): Promise<ApiResponse<Event>> {
    const formData = new FormData();

    // Añadir los campos del DTO al FormData
    Object.keys(data).forEach((key) => {
      if (key === "images") {
        data.images?.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      } else {
        if (data[key as keyof Partial<EventDto>] !== undefined) {
          formData.append(key, data[key as keyof Partial<EventDto>] as string);
        }
      }
    });

    return httpImplementation.put<ApiResponse<Event>, FormData>(
      ServicesInstanceEnum.API_INSTANCE,
      `/events/${id}`,
      formData
    );
  }

  static async deleteEvent(id: number): Promise<ApiResponse<void>> {
    return httpImplementation.delete<ApiResponse<void>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      `/events/${id}`
    );
  }
}
