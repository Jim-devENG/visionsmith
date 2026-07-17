import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "vs_admin_session";

const alg = "HS256";

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set.");
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(adminId: string, email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg })
    .setSubject(adminId)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { sub: string; email: string };
  } catch {
    return null;
  }
}
