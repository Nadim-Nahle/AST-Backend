import express from "express";
import cors from "cors";

import authRoutes from "../routes/auth.routes";
import userRoutes from "../routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

//routes

app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;
