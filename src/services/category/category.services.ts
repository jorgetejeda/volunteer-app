import httpImplementation from "@/core-libraries/http/http.implementation";
import { ApiResponse } from "@/core-libraries/http/types/api-response";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { Category } from "@/core/types/category";

class CategoryService {
  private readonly baseUrl = "categories";

  async createCategory(
    data: Partial<Category>,
  ): Promise<ApiResponse<Category>> {
    return httpImplementation.post<ApiResponse<Category>, Partial<Category>>(
      ServicesInstanceEnum.API_INSTANCE,
      this.baseUrl,
      data,
    );
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return httpImplementation.get<ApiResponse<Category[]>, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      this.baseUrl,
    );
  }

  async updateCategory(
    id: string | number,
    data: Partial<Category>,
  ): Promise<ApiResponse<Category>> {
    return httpImplementation.patch<ApiResponse<Category>, Partial<Category>>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/${id}`,
      data,
    );
  }

  async deleteCategory(id: string | number): Promise<void> {
    return httpImplementation.delete<void, unknown>(
      ServicesInstanceEnum.API_INSTANCE,
      `${this.baseUrl}/${id}`,
    );
  }
}

const categoryService = new CategoryService();
export default categoryService;
