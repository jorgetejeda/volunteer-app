import { NextResponse } from "next/server";
import httpImplementation from "@/core-libraries/http/http.implementation";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { UserCredentials, User } from "@/core/types/user";
import { ApiResponse } from "@/core-libraries/http/types/api-response";

export async function POST(req: Request) {
  try {
    const { email, name } = (await req.json()) as UserCredentials;
    const authToken = process.env.NEXTAUTH_SECRET;
    const { data, isSucceeded } = await httpImplementation.post<
      ApiResponse<User>,
      UserCredentials
    >(ServicesInstanceEnum.API_AUTH, "login", { email, name, authToken });

    if (!isSucceeded) {
      return NextResponse.json(data, { status: 401 });
    }

    const response = NextResponse.json(data);

    // Set the cookie
    response.cookies.set("token", data.token, {
      maxAge: 7 * 24 * 60 * 60,
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
