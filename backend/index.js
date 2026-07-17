import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db/connectDB.js";
import { authRoutes } from "./routes/auth.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootEnvPath = path.resolve(__dirname, "../.env");
const backendEnvPath = path.resolve(__dirname, ".env");
const envPath = fs.existsSync(backendEnvPath) ? backendEnvPath : rootEnvPath;

dotenv.config({ path: envPath });

console.log("Loaded environment file:", envPath);

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  // Allow all Vercel deployments and preview URLs
  if (/\.vercel\.app$/.test(origin)) return true;
  // Allow all localhost variants
  if (/^https?:\/\/localhost/.test(origin)) return true;
  return false;
};

app.use(express.json()); //allows us to parse incoming request:req.body
app.use(cookieParser()); //allows us to parse incoming cookies

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    );
  }
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin);
      console.log("Allowed Origins:", allowedOrigins);

      if (!origin || isAllowedOrigin(origin)) {
        console.log("✅ Origin Allowed");
        callback(null, true);
      } else {
        console.log("❌ Origin Blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
