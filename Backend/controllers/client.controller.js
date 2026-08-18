import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Client } from "../models/client.model.js";

const getClients = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;

  const filter = search ? { name: { $regex: search, $options: "i" } } : {};

  const clients = await Client.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const total = await Client.countDocuments(filter);

  res
    .status(200)
    .json(
      new ApiResponse(200, {
        clients,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
      }),
    );
});

const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client) throw new ApiError(404, "Client not found");
  res.status(200).json(new ApiResponse(200, client));
});

const createClient = asyncHandler(async (req, res) => {
  const client = await Client.create(req.body);
  res.status(201).json(new ApiResponse(201, client));
});

const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //updated document return karo, purana nahi.
    runValidators: true, //schema rules dobara check kao update pe bhi
  });
  if (!client) throw new ApiError(404, "Client not found");
  res.status(200).json(new ApiResponse(200, client));
});

const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  if (!client) throw new ApiError(404, "Client not found");
  res.status(200).json(new ApiResponse(200, null, "Client deleted"));
});

export { getClients, getClientById, createClient, updateClient, deleteClient };
