import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.NEXT_PUBLIC_SECRET;

const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { userId: string }) {
  // Current time in seconds since the Unix epoch
  const nowSeconds = Math.floor(Date.now() / 1000);
  console.log("secretKey", secretKey);
  // Add 3 hours = 3 * 60 * 60 seconds
  const expirationTime = nowSeconds + 26 * 60 * 60;

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(nowSeconds)
    .setExpirationTime(expirationTime)
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session:", error);
    return false;
  }
}
