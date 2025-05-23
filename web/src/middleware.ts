import { NextRequest, NextResponse } from "next/server";
import Auth from "../client/auth";

const auth = new Auth();

// Define route groups
const publicRoutes = ["/login", "/signup", "/", "/dashboard"];
const protectedRoutes = ["/dashboard", "/profile", "/settings", "/chat/:path*"];

export async function middleware(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    const path = req.nextUrl.pathname;

    // Verify token if available
    let userInfo = null;
    if (accessToken) {
      const response = await auth.verify(accessToken);
      if (response.code === 200) {
        userInfo = response.data;
      } else {
        console.log("Invalid token, redirecting to /login");
        if (protectedRoutes.includes(path)) {
          return NextResponse.redirect(new URL("/login", req.nextUrl));
        }
      }
    }

    // Handle public routes
    if (publicRoutes.includes(path)) {
      console.log("Public route, allowing access");
      const res = NextResponse.next();
      if (userInfo) {
        res.headers.set("x-user-info", JSON.stringify(userInfo));
      }
      return res;
    }

    // Handle protected routes
    if (!accessToken && protectedRoutes.includes(path)) {
      console.log("Protected route, no token found");
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Redirect authenticated users away from login/signup
    if (accessToken && publicRoutes.includes(path)) {
      console.log("User already logged in, redirecting to /dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    // Allow access to protected routes with valid user info
    const res = NextResponse.next();
    if (userInfo) {
      res.headers.set("x-user-info", JSON.stringify(userInfo));
    }
    return res;
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

// Apply middleware to all routes
export const config = {
  matcher: ["/:path*"],
};
