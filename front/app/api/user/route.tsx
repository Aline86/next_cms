"use server";

import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "../../lib/session";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const formdata = new FormData();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Test de l'input avec la regex
  if (emailRegex.test(email)) {
    formdata.append("email", email);
  }
  if (passwordRegex.test(password)) {
    formdata.append("password", password);
  }

  if (formdata.get("email") && formdata.get("password")) {
    try {
      await fetch(
        process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL +
          "/api/user.php?method=connexion",
        {
          referrerPolicy: "strict-origin-when-cross-origin",
          mode: "cors",
          method: "POST",
          credentials: "include",
          body: formdata,
        }
      ).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        try {
          const userId = await response.json();

          // Extract user data from the request body (e.g., userId)
          if (Object.keys(userId).length === 0) {
            throw new Error("Received empty JSON response");
          }

          // Simulate session token creation with encryption (adjust according to your logic)

          const session = await encrypt({
            userId: userId.token,
          });

          // Prepare response and set cookie

          (await cookies()).set("token", session, {
            httpOnly: true, // Cookie not accessible via JavaScript
            secure: process.env.NODE_ENV === "production", // Secure cookies in production
            sameSite: false, // Prevent cross-site request forgery
            path: "/", // Cookie accessible for all paths
            maxAge: 60 * 60 * 1000,
          });

          // Redirect to /admin/pages
        } catch (error) {
          return NextResponse.json({ message: error }, { status: 200 });
        }
      });
    } catch (error) {
      console.error("Login failed:", error);
      return NextResponse.json({ message: error }, { status: 200 });
    }
  }

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
