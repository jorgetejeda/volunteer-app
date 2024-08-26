import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import axiosInstance from "@/core-libraries/http/axiosWithProxy";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    expires?: string;
    email: string;
    name: string;
    token?: string;
    role: string;
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    accessToken?: string;
    idToken?: string;
    user: {
      token: string;
      role: string;
    };
  }
}

const handleBackEnd = async (token: any) => {
  try {
    const authToken = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET; // Asegúrate de usar la variable correcta
    const { data } = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_AUTH_API}/login`,
      {
        email: token.email,
        name: token.name,
        authToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!data.isSucceeded) {
      throw new Error("Error logging in");
    }

    return {
      userToken: data.data.token,
      userRole: data.data.userRoles[0].role.title,
    };
  } catch (error) {
    console.log("Error in handleBackEnd:", error);
    throw error;
  }
};

const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
      authorization: {
        params: {
          prompt: "login", // Force re-authentication
          scope: "openid profile user.Read email",
        },
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none", // Asegúrate de que esto esté configurado de acuerdo a tus necesidades
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET as string,
  logger: {
    error(code, ...message) {
      console.error("ERROR - Next", code, message);
    },
    warn(code, ...message) {
      console.warn("WARN - Next", code, message);
    },
    debug(code, ...message) {
      console.debug("DEBUG Next", code, message);
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth-error",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        try {
          const data = await handleBackEnd(token);
          console.log("Data from handleBackEnd:", data);
          token.user = {
            token: data.userToken,
            role: data.userRole,
          };
        } catch (error) {
          console.error("ERROR trying to login:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.email = token.email as string;
      session.name = token.name as string;
      session.token = token.user?.token;
      session.role = token.user?.role;
      session.isAdmin = token.user?.role === "Admin";
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes("error=OAuthCallback")) {
        return `${baseUrl}/auth-error`;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
