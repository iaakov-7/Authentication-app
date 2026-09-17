import fs from "fs/promises";

export async function readFromJson() {
  try {
    const data = await fs.readFile("./db.json", "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveToJson(content) {
  const stringContent = JSON.stringify(content);
  await fs.writeFile("./db.json", stringContent, "utf-8");
}

export function validUsernameAndPassword(username, password) {
  if ((typeof username !== "string") | (username.trim() === "")) {
    const error = new Error("שם משתמש שגוי");
    error.statusCode = 400;
    throw error;
  }
  if (typeof password !== "string" || password.length < 8) {
    const error = new Error("סיסמא צריכה להיות מחרוזת של לפחות 8 תווים");
    error.statusCode = 400;
    throw error;
  }
}

export function validEmail(email) {
  if (typeof email !== "string" || !email.includes("@")) {
    const error = new Error("נדרש מייל תקין");
    error.statusCode = 400;
    throw error;
  }
}

export function validDuplicateUsername(user) {
  if (user) {
    const error = new Error("שם משתמש כבר קיים");
    error.statusCode = 409;
    throw error;
  }
}
