import httpImplementation from "@/core-libraries/http/http.implementation";
import { ApiResponse } from "@/core-libraries/http/types/api-response";
import { Event, EventDto, UpdateEventDto } from "@/core/types/event";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { AxiosHeaders } from "axios";
import { QueryParams } from "@/core-libraries/http/types/query-params";
import { compressImages } from "@/utils";

class EventService {
  private readonly baseUrl = "events";

  async createEvent(data: EventDto): Promise<ApiResponse<Event>> {
    try {
      const formData = new FormData();
      const defaultHeaders: AxiosHeaders = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      } as unknown as AxiosHeaders;

      // Opciones para la compresión de imágenes
      const options: Record<string, number | boolean> = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      // Comprimir imágenes si existen
      let compressedImages: File[] = [];
      if (data.images && data.images.length > 0) {
        compressedImages = await compressImages(data.images, options);
      }

      // Agregar campos simples y las imágenes comprimidas al FormData
      Object.keys(data).forEach((key) => {
        if (key === "images" && compressedImages.length > 0) {
          for (let i = 0; i < compressedImages.length; i++) {
            formData.append("images", compressedImages[i]);
          }
        } else {
          formData.append(key, String(data[key as keyof EventDto]));
        }
      });

      return await httpImplementation.post<ApiResponse<Event>, FormData>(
        ServicesInstanceEnum.API_INSTANCE,
        this.baseUrl,
        formData,
        "json",
        defaultHeaders,
      );
    } catch (error) {
      console.error("Error al guardar el evento:", error);
      throw error;
    }
  }

  async getEvents(query?: QueryParams): Promise<ApiResponse<Event[]>> {
    const params = {
      limit: query?.limit || 10,
      offset: query?.offset || 0,
      published: query?.published || false,
    };

    const URL = `${this.baseUrl}?${new URLSearchParams({
      limit: String(params.limit),
      offset: String(params.offset),
      published: String(params.published),
    }).toString()}`;

    return httpImplementation.get<ApiResponse<Event[]>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      URL,
    );
  }

  async getEventById(id: number): Promise<ApiResponse<Event>> {
    return httpImplementation.get<ApiResponse<Event>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/${id}`,
    );
  }

  async updateEvent(
    id: number,
    data: Partial<UpdateEventDto>,
  ): Promise<ApiResponse<Event>> {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "images") {
        data.images?.forEach((image, index) => {
          formData.append(`images[${index}]`, image as Blob);
        });
      } else {
        if (data[key as keyof Partial<UpdateEventDto>] !== undefined) {
          formData.append(key, data[key as keyof Partial<UpdateEventDto>] as string);
        }
      }
    });

    return httpImplementation.patch<ApiResponse<Event>, FormData>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/${id}`,
      formData,
    );
  }

  async deleteEvent(id: number): Promise<ApiResponse<void>> {
    return httpImplementation.delete<ApiResponse<void>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/${id}`,
    );
  }

  async toggleEnrollUnenrollEvent(eventId: number): Promise<ApiResponse<void>> {
    return httpImplementation.patch<ApiResponse<void>, { eventId: number }>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/enroll/${eventId}`,
    );
  }

  async userTotalHours(): Promise<ApiResponse<void>> {
    return httpImplementation.get<ApiResponse<void>, { eventId: number }>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/total-hours`,
    );
  }
}

const eventService = new EventService();
export default eventService;
