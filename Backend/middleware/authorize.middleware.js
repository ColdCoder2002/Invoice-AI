import ApiError from "../utils/ApiError.js";


const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            throw new ApiError(
                403,
                `Access denied - required roles: ${allowedRoles.join(", ")}`
            )
        }
        next();
    }
}

export default authorize
