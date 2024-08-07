import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { cookies } from "next/headers";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    accessToken?: string;
    idToken?: string;
  }
}

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
  debug: true,
  logger: {
    error(code, ...message) {
      console.error('ERROR VOLUNTARIADO-CODE', code, message);
    },
    warn(code, ...message) {
      console.warn('WARN VOLUNTARIADO-CODE',code, message);
    },
    debug(code, ...message) {
      console.debug('DEBUG VOLUNTARIADO-CODE',code, message);
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      console.log("JWT Callback", token, account);
      if (account) {
        token.idToken = account.id_token as string;
        token.accessToken = account.access_token as string;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      cookies().set("idToken", session.idToken);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the home page after login
      if (url.startsWith("/authentication")) {
        return baseUrl;
      }
      return baseUrl;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
