import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



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


// "pre" hook — document save hone se PEHLE ye function chalega
userSchema.pre("save", async function () {
  // agar password change/naya nahi hua (jaise sirf 'name' update ho raha hai),
  // toh dobara hash mat karo — warna already-hashed password ko fir se hash kar dega (bug!)

  if (!this.isModified("password")) return;
  this.password = bcrypt.hash(this.password, 10)
})

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
  )
}

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model("User", userSchema)

export { User }