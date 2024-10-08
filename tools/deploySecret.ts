import spawn from "cross-spawn";
import dotenv from "dotenv";

const setSecret = async (key: string, value: string) => {
  return new Promise<void>((resolve, reject) => {
    const p = spawn("wrangler", ["secret", "put", key], {
      stdio: "pipe",
    });
    p.stdout?.pipe(process.stdout);
    if (!p.stdin) throw new Error("stdin is null");
    p.stdin.write(value);
    p.stdin.end();
    p.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

const main = async () => {
  const env = dotenv.config({
    path: ".env.production",
  }).parsed;
  if (!env) throw new Error("env is null");
  for (const [key, value] of Object.entries(env)) {
    await setSecret(key, value);
  }
};

main();
