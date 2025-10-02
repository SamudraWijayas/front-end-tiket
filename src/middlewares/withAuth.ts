// middleware/withAuth.ts
import { NextResponse } from "next/server";
import type { NextMiddleware, NextRequest } from "next/server";

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = [],
): NextMiddleware {
  return async (req: NextRequest, event) => {
    const { pathname } = req.nextUrl;

    // kalau path butuh auth
    if (requireAuth.some((path) => pathname.startsWith(path))) {
      const token = req.cookies.get("token")?.value;

      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // teruskan ke middleware berikutnya
    return middleware(req, event);
  };
}
