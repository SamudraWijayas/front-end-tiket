import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

// types/next-auth.d.ts
import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
      isProfileComplete?: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?: string;
  }
}

export interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IActivation {
  code: string;
}
export interface ILogin {
  identifier: string;
  password: string;
}

export interface UserExtended extends User {
  id?: string;
  accessToken?: string;
  role?: string;
}
export interface SessionExtended extends Session {
  accessToken?: string;
}
export interface JWTExtended extends JWT {
  user?: UserExtended;
}

// request reset password
export interface IResetPasswordRequest {
  email: string;
}

// reset password pakai token
export interface IResetPassword {
  password: string;
  confirmPassword: string;
}

export interface IProfile {
  _id?: string;
  email?: string;
  fullName?: string;
  isActive?: boolean;
  profilePicture?: string | FileList;
  role?: string;
  username?: string;
  isProfileComplete?: boolean;
  gender?: "Laki-laki" | "Perempuan" | null;
  nohp?: string | null;
}

export interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
