import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { cookies } from "next/headers";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    expires?: string;
    // user?: {
    //   email: string;
    //   name: string;
    //   token?: string;
    //   role: string;
    //   isAdmin: boolean;
    // };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    accessToken?: string;
    idToken?: string;
    // user: {
    //   token: string;
    //   role: string;
    // }
  }
}

// Función para manejar la solicitud a la API de backend
const handleBackEnd = async (token: any) => {
  try {
    const authToken = process.env.NEXTAUTH_SECRET;
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_API}/login`,
      {
        email: token.email,
        name: token.name,
        authToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!data.isSucceeded) {
      throw new Error("Error logging in");
    }

    return {
      userToken: data.data.token,
      userRole: data.data.userRoles[0].role.title,
    };
  } catch (error) {
    throw error; // Re-throw to handle in callback
  }
};

// Configuración de NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
      authorization: {
        params: {
          scope: "openid profile user.Read email",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth-error",
  },
  debug: true,
  logger: {
    error(code, ...message) {
      console.error(code, message);
    },
    warn(code, ...message) {
      console.warn(code, message);
    },
    debug(code, ...message) {
      console.debug(code, message);
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      console.log("JWT Callback", token, account);
      if (account) {
        token.idToken = account.id_token as string;
        token.accessToken = account.access_token as string;
        // try {
        //   const data = await handleBackEnd(token);
        //   token.user = {
        //     token: data.userToken,
        //     role: data.userRole,
        //   };
        // } catch (error) {
        //   console.error("Error in JWT callback:", error);
        // }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      // session.user = {
      //   email: token.email as string,
      //   name: token.name as string,
      //   token: token.user?.token,
      //   role: token.user?.role,
      //   isAdmin: token.user?.role === "Admin",
      // };
      cookies().set("idToken", session.idToken);
      // cookies().set("isAdmin", JSON.stringify(session.user))
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/login")) {
        return baseUrl;
      }
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
