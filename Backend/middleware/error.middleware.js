const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || "Internal Server Error"

  // Mongoose invalid ObjectId format bhejta hai toh CastError throw karta hai
  // Bina is check ke, ye 500 ban jaata — jabki galti client ki taraf se hai (invalid ID), toh 400 sahi hai
  if (err.name === "CastError") {
    statusCode = 400
    message = "Invalid ID format"
  }

  res.status(statusCode).json({
    success: false,
    message,
    // stack sirf development mein dikhao, production mein nahi
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  })
}

export { errorMiddleware }