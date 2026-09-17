import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { service } from "./service.js";
import { errorHandler } from "./middlewares.js";

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

server.use(errorHandler);

server.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
