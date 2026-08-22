import mongoose, { Schema } from "mongoose"

const lineItemSchema = new Schema({
  description: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
})

lineItemSchema.virtual("amount").get(function () {
  return this.quantity * this.price
})

const invoiceSchema = new Schema(
  {
    invoiceNo: { type: String, unique: true },

    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true
    },

    org: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },

    lineItems: [lineItemSchema],

    status: {
      type: String,
      enum: ["draft", "sent", "viewed", "paid", "overdue", "cancelled"],
      default: "draft"
    },

    dueDate: { type: Date, required: true },

    notes: { type: String, trim: true },

    statusHistory: [
      {
        status: { type: String },
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: Schema.Types.ObjectId, ref: "User" }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

invoiceSchema.virtual("totalAmount").get(function () {
  return this.lineItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

invoiceSchema.index({ org: 1, status: 1 })
invoiceSchema.index({ org: 1, client: 1 })

const Invoice = mongoose.model("Invoice", invoiceSchema)

export default Invoice 