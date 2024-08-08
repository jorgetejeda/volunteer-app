import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { cookies } from "next/headers";
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
    }
  }
}

const handleBackEnd = async (token: any) => {
  try {
    const authToken = process.env.NEXTAUTH_SECRET;
    const { data } = await axiosInstance.post(
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
  debug: false,
  secret: process.env.NEXTAUTH_SECRET as string,
  logger: {
    error(code, ...message) {
      console.error('ERROR - Next', code, message);
    },
    warn(code, ...message) {
      console.warn('WARN - Next', code, message);
    },
    debug(code, ...message) {
      console.debug('DEBUG Next', code, message);
    }
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth-error",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        //token.idToken = account.id_token as string;
        //token.accessToken = account.access_token as string;
        try {
          const data = await handleBackEnd(token);
          token.user = {
            token: data.userToken,
            role: data.userRole,
          };
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }
      return token;
    },
    async session({ session, token }): Promise<any> {
      //session.accessToken = token.accessToken as string;
      //session.idToken = token.idToken as string;
      session.email = token.email as string;
      session.name = token.name as string;
      session.token = token.user?.token;
      session.role = token.user?.role;
      session.isAdmin = token.user?.role === "Admin";
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If there is an error in the OAuth callback, redirect to the error page
      if (url.includes('error=OAuthCallback')) {
        return `${baseUrl}/auth-error`;
      }
      // Redirect to the homepage after successful login
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
