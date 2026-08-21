import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        org: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    }, { timestamps: true },
);

clientSchema.index({ org: 1, email: 1 });

const Client = mongoose.model("Client", clientSchema);

export default Client
