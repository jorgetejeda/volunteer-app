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
    agreedTerms: boolean;
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
      agreedTerms: boolean;
    };
  }
}

const handleBackEnd = async (token: any) => {
  try {
    const authToken =
      process.env.NODE_ENV === "production"
        ? process.env.NEXTAUTH_SECRET
        : process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;

    const { data } = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_AUTH_API}/login`,
      {
        email: token.email,
        name: token.name,
        authToken: authToken,
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
      userAgreedTerms: data.data.agreedTerms,
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
      httpOptions: {
        timeout: 30000,
      },
      authorization: {
        params: {
          scope: "openid profile user.Read email",
        },
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  secret:
    process.env.NODE_ENV === "production"
      ? process.env.NEXTAUTH_SECRET
      : process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
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
            agreedTerms: data.userAgreedTerms,
            token: data.userToken,
            role: data.userRole,
          };
        } catch (error) {
          console.error("ERROR trying to login:", error);
        }
      }
      console.log("Generated JWT token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session from session callback:", session);
      session.email = token.email as string;
      session.name = token.name as string;
      session.token = token.user?.token;
      session.role = token.user?.role;
      session.agreedTerms = token.user.agreedTerms || false;
      session.isAdmin = token.user?.role === "Admin";
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirecting to:", url);
      if (url.includes("error=OAuthCallback")) {
        return `${baseUrl}/auth-error`;
      }
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
