const base83Characters =
  "<0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~";

const decodeBase83 = (str: string) => {
  const length = str.length;
  const bitLength = 7;
  const resultSize = Math.ceil((length * bitLength) / 8);
  const result = new Uint8Array(resultSize);

  let resultIndex = 0;
  let accumulator = 0;
  let bits = 0;

  for (let i = 0; i < length; i++) {
    const value = base83Characters.indexOf(str[i]);
    if (value === -1) {
      throw new Error("Invalid character found");
    }
    accumulator = (accumulator << bitLength) | value;
    bits += bitLength;
    while (bits >= 8) {
      bits -= 8;
      result[resultIndex++] = accumulator >> bits;
      accumulator &= (1 << bits) - 1;
    }
  }

  if (bits > 0) {
    result[resultIndex] = accumulator << (8 - bits);
  }

  return result;
};

const encodeBase83 = (bytes: Uint8Array) => {
  const bitLength = 7;
  let accumulator = 0;
  let bits = 0;
  const output = bytes.reduce((str, byte) => {
    accumulator = (accumulator << 8) | byte;
    bits += 8;
    while (bits >= bitLength) {
      bits -= bitLength;
      const value = (accumulator >> bits) & ((1 << bitLength) - 1);
      str += base83Characters[value];
    }
    return str;
  }, "");

  return output;
};

export const base83toFileName = (str: string) => {
  const v = decodeBase83(str);
  const string = v.reduce((a, b) => a + String.fromCharCode(b), "");
  return btoa(string)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const fileNameToBase83 = (fileName: string) => {
  const base64 =
    fileName.replace(/-/g, "+").replace(/_/g, "/") +
    "==".slice(0, (3 * fileName.length) % 4);

  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return encodeBase83(bytes);
};
