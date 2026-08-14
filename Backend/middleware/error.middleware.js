const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    message,
    // stack sirf development mein dikhao, production mein nahi
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  })
}

export { errorMiddleware }