import jwt from "jsonwebtoken";
export function errorHandler(err, req, res, next) {
  if (err) {
    console.log(err);
    return res
      .status(err.statusCode || 500)
      .json({ message: err.statusCode ? err.message : "שגיאת מערכת" });
  }
}

export function verifyToken(
  /** @type {import("express").Request}*/ req,
  res,
  next,
) {
  const token = req.cookies.token;
  if (!token) {
    const error = new Error("אין טוקן");
    error.statusCode = 401;
    throw error;
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (err) {
    const error = new Error("טוקן לא תקין");
    error.statusCode = 401;
    throw error;
  }
}
