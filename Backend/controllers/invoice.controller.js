import  Invoice  from "../models/invoice.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import ApiError from "../utils/ApiError.js"
import Client from "../models/client.model.js"

// Invoice create karo
const createInvoice = asyncHandler(async (req, res) => {
  const { client, lineItems, dueDate, notes } = req.body

  // Client is user ki org ka hai kya?
  const clientExists = await Client.findOne({
    _id: client,
    org: req.user.org._id
  })
  if (!clientExists) throw new ApiError(404, "Client not found in your organization")

  const invoice = await Invoice.create({
    client,
    org: req.user.org._id,
    lineItems,
    dueDate,
    notes,
    statusHistory: [{
      status: "draft",
      changedBy: req.user._id
    }]
  })

  const created = await Invoice.findById(invoice._id).populate("client", "name email")

  res.status(201).json(new ApiResponse(201, created, "Invoice created"))
})

// Saare invoices (org ke)
const getInvoices = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query

  const filter = { org: req.user.org._id }
  if (status) filter.status = status

  const invoices = await Invoice.find(filter)
    .populate("client", "name email")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean({ virtuals: true })

  const total = await Invoice.countDocuments(filter)

  res.status(200).json(
    new ApiResponse(200, {
      invoices,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    })
  )
})

// Ek invoice
const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    org: req.user.org._id
  }).populate("client", "name email")

  if (!invoice) throw new ApiError(404, "Invoice not found")

  res.status(200).json(new ApiResponse(200, invoice))
})

// Invoice update (sirf draft status mein)
const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    org: req.user.org._id
  })

  if (!invoice) throw new ApiError(404, "Invoice not found")

  // Sirf draft invoice edit ho sakti hai
  if (invoice.status !== "draft") {
    throw new ApiError(400, "Only draft invoices can be edited")
  }

  const { lineItems, dueDate, notes, client } = req.body
  if (lineItems) invoice.lineItems = lineItems
  if (dueDate) invoice.dueDate = dueDate
  if (notes !== undefined) invoice.notes = notes
  if (client) invoice.client = client

  await invoice.save()

  const updated = await Invoice.findById(invoice._id).populate("client", "name email")
  res.status(200).json(new ApiResponse(200, updated))
})

// Invoice delete (sirf draft)
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    org: req.user.org._id
  })

  if (!invoice) throw new ApiError(404, "Invoice not found")

  if (invoice.status !== "draft") {
    throw new ApiError(400, "Only draft invoices can be deleted")
  }

  await invoice.deleteOne()

  res.status(200).json(new ApiResponse(200, null, "Invoice deleted"))
})

export { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice }