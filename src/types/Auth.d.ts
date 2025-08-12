import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

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
  accessToken?: string;
  role?: string;
}
export interface SessionExtended extends Session {
  accessToken?: string;
}
export interface JWTExtended extends JWT {
  user?: UserExtended;
}

export interface IProfile {
  _id?: string;
  email?: string;
  fullName?: string;
  isActive?: boolean;
  profilePicture?: string | FileList;
  role?: string;
  username?: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
