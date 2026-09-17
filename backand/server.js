import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { service } from "./service.js";
import { errorHandler, verifyToken } from "./middlewares.js";
import { repo } from "./repository.js";

const server = express();
server.use(express.json());
server.use(cookieParser());

server.post("/api/signup", async (req, res) => {
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
  const { user } = req.user;
  res.json(user);
});

server.use(errorHandler);

server.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
