import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
    {
        org: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim:true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase:true,
        },
        phone: {
            type: String,
            trim: true,
        },
        gstin: {
            type: String,
            trim: true,
            uppercase:true,
        },
        contactPerson: {
            type: String,
            trim:true,
        },
        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            pincode:{type:String, trim:true}
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default:null
        },

    }, { timestamps: true },
);

clientSchema.index({ org: 1, email: 1 });
clientSchema.index({ org: 1, gstin: 1 });

const Client = mongoose.model("Client", clientSchema);

export default Client
