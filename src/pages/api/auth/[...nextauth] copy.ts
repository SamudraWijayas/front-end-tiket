// import environment from "@/config/environment";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { IRegister, JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
// import authServices from "@/services/auth.service";

// export default NextAuth({
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60 * 24, // 1 hari
//   },
//   secret: environment.AUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         identifier: { label: "identifier", type: "text" },
//         password: { label: "password", type: "password" },
//       },
//       async authorize(credentials): Promise<UserExtended | null> {
//         if (!credentials) return null;
//         const { identifier, password } = credentials;

//         try {
//           // 🔹 login ke backend pakai email/username + password
//           const result = await authServices.login({ identifier, password });
//           const accessToken = result.data.data; // backend balikin JWT string

//           // 🔹 fetch profile dari backend pakai JWT
//           const me = await authServices.getProfileWithToken(accessToken);
//           const user = me.data.data;

//           if (accessToken && user?._id) {
//             return { ...user, accessToken } as UserExtended;
//           }
//           return null;
//         } catch (err) {
//           console.error("Credential login failed:", err);
//           return null;
//         }
//       },
//     }),
//     GoogleProvider({
//       clientId: environment.GOOGLE_CLIENT_ID!,
//       clientSecret: environment.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],

//   callbacks: {
//     // 🔹 intercept login Google → kirim ke backend → auto create kalau belum ada
//     async signIn({ user, account }) {
//       try {
//         // 🔹 login dengan Google - dapatkan token dan user data terlebih dahulu
//         if (account?.provider === "google" && account?.id_token) {
//           try {
//             const res = await authServices.loginWithGoogle(account.id_token);
//             const { token: accessToken, user: userFromAPI } = res.data.data;

//             // Set user data dengan token untuk pengecekan profile
//             user.accessToken = accessToken;
//             user.email = userFromAPI.email;
//             user.name = userFromAPI.fullName;
//             user.image = userFromAPI.profilePicture;
//             user.gender = userFromAPI.gender;
//             user.nohp = userFromAPI.nohp;
//             user.role = userFromAPI.role;
//           } catch (err) {
//             console.error("Google signIn error:", err);
//             return false;
//           }
//         }

//         // Check if user has completed required profile fields
//         const isProfileComplete = !!(user.gender && user.nohp);

//         // If profile is not complete, redirect to profile completion page
//         if (!isProfileComplete) {
//           // Store profile completion status in user object
//           user.isProfileComplete = false;
//           // Redirect to complete profile page
//           return "/auth/complete-profile";
//         }

//         user.isProfileComplete = true;
//         return true;
//       } catch (error) {
//         console.error("Error in signIn callback:", error);
//         return false;
//       }
//     },

//     async jwt({ token, user, account }): Promise<JWTExtended> {
//       // 🔹 login dengan credentials
//       if (user && (user).accessToken) {
//         token.user = user as UserExtended;
//         token.accessToken = (user as UserExtended).accessToken;

//         // Check profile completion status for credentials login
//         const isProfileComplete = !!(user.gender && user.nohp);
//         if (token.user) {
//           token.user.isProfileComplete = isProfileComplete;
//         }
//       }

//       // 🔹 login dengan Google - token sudah didapat di signIn callback
//       if (account?.provider === "google" && user?.accessToken) {
//         token.user = user as UserExtended;
//         token.accessToken = user.accessToken;

//         // Check profile completion status for Google login
//         const isProfileComplete = !!(user.gender && user.nohp);
//         if (token.user) {
//           token.user.isProfileComplete = isProfileComplete;
//         }
//       }

//       return token as JWTExtended;
//     },

//     async session({ session, token }): Promise<SessionExtended> {
//       if (token?.user) {
//         session.user = token.user as UserExtended;
//       }
//       if (token?.accessToken) {
//         session.accessToken = token.accessToken as string;
//       }
//       return session;
//     },
//   },
// });
