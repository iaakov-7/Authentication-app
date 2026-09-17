import { readFromJson, saveToJson } from "./utils.js";

async function findUserByUsername(username) {
  const users = await readFromJson();
  const user = users.find((u) => u.username === username);
  return user;
}

async function getAllUsers() {
  const users = await readFromJson();
  return users;
}

async function saveUser(user) {
  const users = await readFromJson();
  users.push(user);
  saveToJson(users);
  return user.username;
}

export const repo = { findUserByUsername, getAllUsers, saveUser };
