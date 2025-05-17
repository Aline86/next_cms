import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { encrypt } from "../../lib/session";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    return NextResponse.json(
      { message: "Invalid email or password format" },
      { status: 400 }
    );
  }

  const formdata = new FormData();
  formdata.append("email", email);
  formdata.append("password", password);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL}/api/user.php?method=connexion`,
      {
        referrerPolicy: "strict-origin-when-cross-origin",
        mode: "cors",
        method: "POST",
        credentials: "include",
        body: formdata,
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const userId = await response.json();

    if (!userId || Object.keys(userId).length === 0) {
      return NextResponse.json(
        { message: "Empty user data from backend" },
        { status: 401 }
      );
    }

    const session = await encrypt({ userId });

    (await cookies()).set("token", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
