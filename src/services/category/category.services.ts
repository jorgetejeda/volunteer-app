import httpImplementation from "@/core-libraries/http/http.implementation";
import { ApiResponse } from "@/core-libraries/http/types/api-response";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { Category } from "@/core/types/category";

export default class CategoryService {
  static async createCategory(
    data: Partial<Category>,
  ): Promise<ApiResponse<Category>> {
    return httpImplementation.post<ApiResponse<Category>, Partial<Category>>(
      ServicesInstanceEnum.API_INSTANCE,
      "/categories",
      data,
    );
  }

  static async getCategories(): Promise<ApiResponse<Category[]>> {
    return httpImplementation.get<ApiResponse<Category[]>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      "/categories",
    );
  }

  static async updateCategory(
    id: string | number,
    data: Partial<Category>,
  ): Promise<ApiResponse<Category>> {
    return httpImplementation.patch<ApiResponse<Category>, Partial<Category>>(
      ServicesInstanceEnum.API_INSTANCE,
      `/categories/${id}`,
      data,
    );
  }

  static async deleteCategory(id: string | number): Promise<void> {
    return httpImplementation.delete<void, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      `/categories/${id}`,
    );
  }
}
