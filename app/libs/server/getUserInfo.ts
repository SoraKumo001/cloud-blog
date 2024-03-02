import { jwtVerify, importX509 } from "jose";

const fetchPublicKeys = async () => {
  const response = await fetch(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
  );
  const cacheControlHeader = response.headers.get("cache-control");
  const maxAgeMatch = cacheControlHeader?.match(/max-age=(\d+)/);

  if (!maxAgeMatch?.[1]) throw new Error("error");

  const maxAgeSeconds = parseInt(maxAgeMatch[1], 10);
  const expirationTime = Date.now() + maxAgeSeconds * 1000;

  const publicKeys: { [key: string]: string } = await response.json();
  return { publicKeys, expirationTime };
};

let publicKeys: { [key: string]: string };
let expirationTime: number;

const getPublicKey = async (kid: string) => {
  if (expirationTime === undefined || Date.now() >= expirationTime) {
    const result = await fetchPublicKeys();
    publicKeys = result.publicKeys;
    expirationTime = result.expirationTime;
  }
  return publicKeys[kid];
};

export const getUserInfo = async (
  projectId?: string,
  token?: string
): Promise<{ name: string; email: string; exp: number } | undefined> => {
  if (!projectId || !token) return undefined;
  const [headerBase64] = token.split(".");
  const text = atob(headerBase64);
  const header = JSON.parse(text) as {
    kid: string;
  };
  const publicKey = await getPublicKey(header.kid);
  const result = await jwtVerify<{ name: string; email: string; exp: number }>(
    token,
    await importX509(publicKey, "RS256")
  ).catch((e) => console.error(e));
  if (result) {
    const { name, email, exp } = result.payload;
    return { name, email, exp };
  }
  return undefined;
};
