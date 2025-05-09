import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/*export async function GET(request: Request) {
  const cookieStore = cookies();
  const session = (await cookieStore).get("token");
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session");
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}*/
export async function DELETE() {
  const cookieStore = cookies();
  (await cookieStore).getAll().forEach(async (cookie) => {
    (await cookieStore).delete(cookie.name);
  });
  return NextResponse.json((await cookieStore).getAll().length);
}
