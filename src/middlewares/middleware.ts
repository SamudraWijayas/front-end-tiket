// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { JWTExtended } from "./types/Auth";
// import { getToken } from "next-auth/jwt";
// import environment from "./config/environment";

// export async function middleware(request: NextRequest) {
//   const token: JWTExtended | null = await getToken({
//     req: request,
//     secret: environment.AUTH_SECRET,
//   });

//   const { pathname } = request.nextUrl;

//   // Daftar halaman yang hanya boleh diakses sebelum login
//   const beforeLoginOnly = ["/", "/auth/login", "/auth/register", "/event"];

//   // Kalau sudah login, cegah akses halaman "before login only"
//   if (beforeLoginOnly.includes(pathname)) {
//     if (token) {
//       if (token?.user?.role === "admin") {
//         return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//       }
//       if (token?.user?.role === "member") {
//         return NextResponse.redirect(new URL("/member/dashboard", request.url));
//       }
//       if (token?.user?.role === "organizer") {
//         return NextResponse.redirect(
//           new URL("/organizer/dashboard", request.url),
//         );
//       }
//     }
//   }

//   // Admin routes
//   if (pathname.startsWith("/admin")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }

//     if (token?.user?.role !== "admin") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (pathname === "/admin") {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//     }
//   }

//   // Member routes
//   if (pathname.startsWith("/member")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }

//     if (token?.user?.role !== "member") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (pathname === "/member") {
//       return NextResponse.redirect(new URL("/member/dashboard", request.url));
//     }
//   }

//   // Organizer routes
//   if (pathname.startsWith("/organizer")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }

//     if (token?.user?.role !== "organizer") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (pathname === "/organizer") {
//       return NextResponse.redirect(
//         new URL("/organizer/dashboard", request.url),
//       );
//     }
//   }
// }

// // Matcher global → semua route dicegat kecuali _next, api, dll
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// ---------------------------------------------------------------------------------------------------------

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { JWTExtended } from "./types/Auth";
// import { getToken } from "next-auth/jwt";
// import environment from "./config/environment";

// export async function middleware(request: NextRequest) {
//   const token: JWTExtended | null = await getToken({
//     req: request,
//     secret: environment.AUTH_SECRET,
//   });
//   const { pathname } = request.nextUrl;

//   // kalau sudah login, cegah akses login, register, atau /
//   if (
//     pathname === "/auth/login" ||
//     pathname === "/auth/register" ||
//     pathname === "/" ||
//     pathname === "/event"
//   ) {
//     if (token) {
//       if (token?.user?.role === "admin") {
//         return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//       }
//       if (token?.user?.role === "member") {
//         return NextResponse.redirect(new URL("/member/dashboard", request.url));
//       }
//       if (token?.user?.role === "organizer") {
//         return NextResponse.redirect(
//           new URL("/organizer/dashboard", request.url),
//         );
//       }
//     }
//   }

//   // Admin routes
//   if (pathname.startsWith("/admin")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }

//     if (token?.user?.role !== "admin") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (pathname === "/admin") {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//     }
//   }

//   // Member routes
//   if (pathname.startsWith("/member")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }

//     if (token?.user?.role !== "member") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (pathname === "/member") {
//       return NextResponse.redirect(new URL("/member/dashboard", request.url));
//     }
//   }

//   // Organizer routes
//   if (pathname.startsWith("/organizer")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }

//     if (token?.user?.role !== "organizer") {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     if (pathname === "/organizer") {
//       return NextResponse.redirect(
//         new URL("/organizer/dashboard", request.url),
//       );
//     }
//   }
// }

// export const config = {
//   matcher: [
//     "/",
//     "/auth/:path*",
//     "/admin/:path*",
//     "/member/:path*",
//     "/organizer/:path*",
//     "/event",
//   ],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { JWTExtended } from "@/types/Auth";
import environment from "@/config/environment";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  if (pathname === "/auth/login" || pathname === "/auth/register" || pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/member")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (pathname === "/member") {
      return NextResponse.redirect(new URL("/member", request.url));
    }
  }

  if (pathname.startsWith("/organizer")) {
    if (!token) {
      const url = new URL("/auth/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    if (token?.user?.role !== "organizer") {
      return NextResponse.redirect(new URL("/organizer", request.url));
    }

    if (pathname === "/organizer") {
      return NextResponse.redirect(new URL("/organizer/dashboard", request.url));
    }
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*", "/organizer/:path*"],
};
