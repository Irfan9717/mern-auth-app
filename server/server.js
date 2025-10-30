import express from "express";
import cors from "cors";
import 'dotenv/config';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoute.js';
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000
connectDB();

const allowedOrigins = ['http://localhost:5173',
  'https://mern-auth-app-hu4z.vercel.app',

]
// ✅ allow all preview deployments too
const vercelPattern = /^https:\/\/mern-auth-app-hu4z(-[a-z0-9-]+)?\.vercel\.app$/;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      vercelPattern.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed for this origin"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// handle preflight for all routes (safe)

// Api Endpoint 
app.get('/', (req, res) => res.send("Api Working well"));

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, () => console.log(`Server Started on PORT:${port}`));
