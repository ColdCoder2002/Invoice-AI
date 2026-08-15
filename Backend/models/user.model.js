import mongoose from "mongoose"

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }, // default queries mein nahi aayega
    role: { type: String, enum: ["owner", "member", "viewer"], default: "owner" },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export { User }