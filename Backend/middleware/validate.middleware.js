import ApiError from "../utils/ApiError.js";


const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    //agar body hi naho
    if (!name && !email && !password) {
        throw new ApiError(400, 'Request body is empty');
    }

    // --- NAME ---
    if (!name || name.trim() === '') {
        throw new ApiError(400, 'Name is required')
    }

    // sirf letters aur spaces allowed, numbers/symbol nahi
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.trim())) {
        throw new ApiError(400, 'Name can only conain letters and space')
    }

    // 2 se 50 character ke beech
    if (name.trim().length < 2 || name.trim().length > 50) {
        throw new ApiError(400, 'Name must be between 2 and 50 character')
    }

    // --- EMAIL ---
    if (!email || email.trim() === "") {
        throw new ApiError(400, 'Email is required')
    }

    // max 100 characters
    if (email.trim().length > 100) {
        throw new ApiError(400, 'Email is too long')
    }

    // proper email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        throw new ApiError(400, 'Imvalid email format')
    }

    // --- PASSWORD --- 
    if (!password) {
        throw new ApiError(400, 'Password is required')
    }

    // min 8 characters
    if (password.length < 8) {
        throw new ApiError(400, 'password must be atleast 8 character')
    }

    // ek uppercase hona chahiye
    if (!/[A-Z]/.test(password)) {
        throw new ApiError(400, 'Password must contain at least one uppercase letter');
    }

    // ek number hona chahiye
    if (!/[0-9]/.test(password)) {
        throw new ApiError(400, 'Password must contain at least one number');
    }

    // ek special character hona chahiye
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new ApiError(400, 'Password must contain at least one special character');
    }

    next();
};

export default validateRegister;