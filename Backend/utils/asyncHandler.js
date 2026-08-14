const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    next(error)  // error global handler ko pass ho jaata hai
  }
}

export default asyncHandler 