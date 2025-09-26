import 'dotenv/config';

import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { connectDB } from "./db/mongoose.js";
import eventsRouter from "./routes/events.js";

const app = express();
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/v1/events", eventsRouter);

connectDB().then(() => {
  app.listen(env.PORT, () => console.log(`🚀 API on http://localhost:${env.PORT}`));
});
