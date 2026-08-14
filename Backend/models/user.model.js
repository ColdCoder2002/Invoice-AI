import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [5, 'Name must be at least 5 characters'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters']
        },

        role: {
            type: String,
            enum: ['owner', 'member', 'viewer'],
            default: 'owner'
        },

        isEmailVerified: {
            type: Boolean,
            default: false
        }
    }, {
        timestamps:true
    }
)



const User = mongoose.model('User', userSchema)
export default User