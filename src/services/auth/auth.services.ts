import axios from "axios";
//@Types
import { ApiResponse } from "@/core-libraries/http/types/api-response";
import { User, UserCredentials } from "@/core/types";
import httpImplementation from "@/core-libraries/http/http.implementation";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";

export default class AuthService {
  static async login(data: UserCredentials): Promise<ApiResponse<User>> {
    const response = await axios.post<ApiResponse<User>>(
      "/api/authentication/",
      data
    );
    return response.data;
  }

  static async alternativeLogin(
    data: UserCredentials
  ): Promise<ApiResponse<User>> {
    const response = await httpImplementation.post<
      ApiResponse<User>,
      UserCredentials
    >(ServicesInstanceEnum.API_AUTH, "/login", data);
    return response;
  }
}
