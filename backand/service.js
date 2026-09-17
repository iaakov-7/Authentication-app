import bcrypt from "bcryptjs";
import {
  validDuplicateUsername,
  validEmail,
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

export const service = { signup };
