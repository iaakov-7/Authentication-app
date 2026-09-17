export function errorHandler(err, req, res, next) {
  if (err) {
    console.log(err);
    return res
      .status(err.statusCode || 500)
      .json({ message: err.statusCode ? err.message : "שגיאת מערכת" });
  }
}
