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
  'https://mern-auth-app-hu4z.vercel.app'
];

// ✅ Also allow all preview deployments
const vercelPattern = /^https:\/\/mern-auth-app-hu4z(-[a-z0-9-]+)?\.vercel\.app$/;

// ✅ Manual middleware for flexible origin control
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (
    allowedOrigins.includes(origin) ||
    (origin && vercelPattern.test(origin))
  ) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use(cookieParser());
// ✅ Backup CORS middleware for safety
app.use(
  cors({
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
    credentials: true,
  })
);
// app.use(cors({ origin: allowedOrigins, credentials: true }));
// Api Endpoint 
app.get('/', (req, res) => res.send("Api Working well"));

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, () => console.log(`Server Started on PORT:${port}`));
