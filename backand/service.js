import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  validDuplicateUsername,
  validEmail,
  validIfUserExists,
  validIsMatchPasswors,
  validUsernameAndPassword,
} from "./utils.js";
import { repo } from "./repository.js";

async function signup(username, password, email) {
  validUsernameAndPassword(username, password);
  validEmail(email);
  const user = await repo.findUserByUsername(username);
  validDuplicateUsername(user);
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };
  const result = await repo.saveUser(newUser);
  return result;
}

async function login(username, password) {
  validUsernameAndPassword(username, password);
  const user = await repo.findUserByUsername(username);
  validIfUserExists(user);
  const isMatchPassord = await bcrypt.compare(password, user.password);
  validIsMatchPasswors(isMatchPassord);
  const payload = {
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
}

export const service = { signup, login };
