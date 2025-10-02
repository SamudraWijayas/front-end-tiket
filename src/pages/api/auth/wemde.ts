import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // ✅ Tambahin
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    // ✅ Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // ✅ Credentials login manual
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        const result = await authServices.login({ identifier, password });
        const accessToken = result.data.data;

        const me = await authServices.getProfileWithToken(accessToken);
        const user = me.data.data;

        if (
          accessToken &&
          result.status === 200 &&
          user._id &&
          me.status === 200
        ) {
          user.accessToken = accessToken;
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // kalau login pakai Google
      if (account?.provider === "google" && user) {
        token.user = {
          ...user,
          provider: "google",
        };
      }

      // kalau login pakai credentials
      if (user) {
        token.user = user as UserExtended;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken ?? null;
      return session;
    },
  },
});
