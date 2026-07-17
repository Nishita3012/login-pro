import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = path.join(__dirname, "../.env");

dotenv.config({ path: envFile });

console.log("Loaded environment file:", envFile);
console.log(
  "Loaded Resend Key:",
  process.env.RESEND_API_KEY?.slice(0, 10)
);