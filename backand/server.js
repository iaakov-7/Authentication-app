import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";

import { service } from "./service.js";
import { errorHandler, verifyToken } from "./middlewares.js";
import { repo } from "./repository.js";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
server.use(cookieParser());
server.use(express.json());
server.use((req, res, next) => {
  console.log(`${req.url}`);
  next();
});
server.get("/api/health", (req, res) => {
  res.send("server is healthy");
});

server.post("/api/signup", async (req, res) => {
  console.log("hello from signup");
  const { username, password, email } = req.body;
  const result = await service.signup(username, password, email);
  res.status(201).json({ message: `Saved new user: ${result}` });
});

server.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await service.login(username, password);
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.json({ message: "התחברת בהצלחה" });
});

server.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "התנתקת בהצלחה" });
});

server.get("/api/profile", verifyToken, async (req, res) => {
  const username = req.user.username;
  const user = await repo.findUserByUsername(username);
  res.json({ name: user.username, email: user.email });
});

server.get("/api/me", verifyToken, async (req, res) => {
  console.log("from me");
  const { user } = req.user;
  res.json({ user: user });
});

server.use(errorHandler);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
