import mongoose, { Schema } from "mongoose";



const clientSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
    },
    {timestamps:true}
)

const Client = mongoose.model("Client", clientSchema)

export {Client}