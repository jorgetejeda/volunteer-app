import axios from "axios";
//@Types
import { ApiResponse } from "@/core-libraries/http/types/api-response";
import { RegisterUser, User, UserCredentials } from "@/core/types";
import httpImplementation from "@/core-libraries/http/http.implementation";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";

class AuthService {
  
  // async login(data: UserCredentials): Promise<ApiResponse<User>> {
  //   const response = await axios.post<ApiResponse<User>>(
  //     "/api/signIn/",
  //     data,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   return response.data;
  // }

  
  async login(
    data: UserCredentials,
  ): Promise<ApiResponse<User>> {
    const response = await httpImplementation.post<
      ApiResponse<User>,
      UserCredentials
    >(ServicesInstanceEnum.API_AUTH, "login", data);
    return response;
  }

  async register(data: RegisterUser | UserCredentials): Promise<ApiResponse<User>> {
    const response = await httpImplementation.post<ApiResponse<User>, RegisterUser | UserCredentials>(ServicesInstanceEnum.API_AUTH, "register", data);
    return response;
  }

}


const authService = new AuthService();
export default authService;
