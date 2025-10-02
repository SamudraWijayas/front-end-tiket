import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {
  JWTExtended,
  SessionExtended,
  UserExtended,
} from "@/types/next-auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 hari
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<UserExtended | null> {
        if (!credentials) return null;
        const { identifier, password } = credentials;

        try {
          // 🔹 login ke backend pakai email/username + password
          const result = await authServices.login({ identifier, password });
          const accessToken = result.data.data; // backend balikin JWT string

          // 🔹 fetch profile dari backend pakai JWT
          const me = await authServices.getProfileWithToken(accessToken);
          const user = me.data.data;

          if (accessToken && user?._id) {
            return { ...user, accessToken } as UserExtended;
          }
          return null;
        } catch (err) {
          console.error("Credential login failed:", err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: environment.GOOGLE_CLIENT_ID!,
      clientSecret: environment.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // 🔹 intercept login Google → kirim ke backend → auto create kalau belum ada
    async signIn() {
      // Contoh: izinkan semua
      return true;
    },

    async jwt({ token, user, account }): Promise<JWTExtended> {
      // 🔹 login dengan credentials
      if (user) {
        token.user = user as UserExtended;
        token.accessToken = (user as UserExtended).accessToken;
      }
      // 🔹 login dengan Google
      if (account?.provider === "google" && account?.id_token) {
        try {
          const res = await authServices.loginWithGoogle(account.id_token);
          const { token: accessToken, user: userFromAPI } = res.data.data;

          token.user = { ...userFromAPI, accessToken } as UserExtended;
          token.accessToken = accessToken;
        } catch (err) {
          console.error("Google jwt error:", err);
        }
      }

      return token as JWTExtended;
    },

    async session({ session, token }): Promise<SessionExtended> {
      if (token?.user) {
        session.user = token.user as UserExtended;
      }
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
});
