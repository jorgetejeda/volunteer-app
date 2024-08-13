import httpImplementation from "@/core-libraries/http/http.implementation";
import { ApiResponse } from "@/core-libraries/http/types/api-response";
import { Event, EventDto, UpdateEventDto } from "@/core/types/event";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { AxiosHeaders } from "axios";
import { QueryParams } from "@/core-libraries/http/types/query-params";
import { compressImages } from "@/utils";

class EventService {
  private readonly baseUrl = "events";
  private readonly defaultHeaders: AxiosHeaders;

  constructor() {
    this.defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    } as unknown as AxiosHeaders;
  }

  async createEvent(data: EventDto): Promise<ApiResponse<Event>> {
    try {
      const formData = new FormData();

      const options: Record<string, number | boolean> = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      let compressedImages: File[] = [];
      if (data.images && data.images.length > 0) {
        compressedImages = await compressImages(data.images, options);
      }

      Object.keys(data).forEach((key) => {
        if (key === "images" && compressedImages.length > 0) {
          for (let i = 0; i < compressedImages.length; i++) {
            formData.append(
              "images",
              compressedImages[i],
              compressedImages[i].name
            );
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
        this.defaultHeaders
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
    };

    const URL = `${this.baseUrl}?${new URLSearchParams({
      limit: String(params.limit),
      offset: String(params.offset),
    }).toString()}`;

    return httpImplementation.get<ApiResponse<Event[]>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      URL
    );
  }

  async getEventById(id: number): Promise<ApiResponse<Event>> {
    return httpImplementation.get<ApiResponse<Event>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/${id}`
    );
  }

  async updateEvent(
    id: number,
    data: Partial<UpdateEventDto>
  ): Promise<ApiResponse<Event>> {
    try {
      const formData = new FormData();

      // Opciones para la compresión de imágenes
      const options: Record<string, number | boolean> = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      // Si existen imágenes, comprimirlas antes de agregarlas al FormData
      if (data.images && data.images.length > 0) {
        const compressedImages = await compressImages(data.images, options);
        compressedImages.forEach((image, index) => {
          formData.append(`images`, image as File);
        });
      }

      // Agregar otros campos al FormData
      Object.keys(data).forEach((key) => {
        if (key !== "images") {
          if (data[key as keyof Partial<UpdateEventDto>] !== undefined) {
            if (key === "currentImages") {
              if (data[key as keyof Partial<UpdateEventDto>] !== undefined) {
                formData.append(
                  `currentImages`,
                  JSON.stringify(data[key as keyof Partial<UpdateEventDto>])
                );
              }
            } else {
              formData.append(
                key,
                String(data[key as keyof Partial<UpdateEventDto>])
              );
            }
          }
        }
      });

      return await httpImplementation.patch<ApiResponse<Event>, FormData>(
        ServicesInstanceEnum.API_INSTANCE,
        `${this.baseUrl}/${id}`,
        formData,
        "json",
        this.defaultHeaders
      );
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      throw error;
    }
  }

  async deleteEvent(id: number): Promise<ApiResponse<void>> {
    return httpImplementation.delete<ApiResponse<void>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/${id}`
    );
  }

  async toggleEnrollUnenrollEvent(eventId: number): Promise<ApiResponse<void>> {
    return httpImplementation.patch<ApiResponse<void>, { eventId: number }>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/enroll/${eventId}`
    );
  }

  async userTotalHours(): Promise<ApiResponse<void>> {
    return httpImplementation.get<ApiResponse<void>, { eventId: number }>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/total-hours`
    );
  }

  async togglePublishEvent(eventId: number): Promise<ApiResponse<boolean>> {
    return httpImplementation.patch<ApiResponse<boolean>, { eventId: number }>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/publish/${eventId}`,
    );
  }
}

const eventService = new EventService();
export default eventService;
