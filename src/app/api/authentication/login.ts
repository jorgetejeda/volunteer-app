import { NextApiRequest, NextApiResponse } from "next";
import httpImplementation from "@/core-libraries/http/http.implementation";
import { ServicesInstanceEnum } from "@/core/enums/services-instance.enum";
import { UserCredentials, User } from "@/core/types/user";
import { createCookie } from "@/utils/cookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body as UserCredentials;

  try {
    const user = await httpImplementation.post<User, UserCredentials>(
      ServicesInstanceEnum.API_AUTH,
      "/login",
      { email, password }
    );

    createCookie("token", user.token, 7);

    res.status(200).json({ user });
  } catch (error: any) {
    console.error("Error logging in", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
