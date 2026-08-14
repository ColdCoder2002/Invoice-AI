import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'


let clients = [];
let idCounter = 1;


const getClients = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query

  let filtered = clients

  // search filter
  if (search) {
    filtered = filtered.filter((c) =>
      c.name?.toLowerCase().includes(search.toLowerCase())
    )
  }

  // pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + Number(limit)
  const paginatedClients = filtered.slice(startIndex, endIndex)

  res.status(200).json(
    new ApiResponse(200, {
      clients: paginatedClients,
      total: filtered.length,
      page: Number(page),
      totalPages: Math.ceil(filtered.length / limit),
    })
  )
})


const getClientById = asyncHandler(async (req, res) => {
    const client = clients.find((c) => c.id === parseInt(req.params.id))
    if (!client) {
        throw new ApiError(404, "Client not found")
    }
    res.status(200).json(new ApiResponse(200, client))
});


const createClient = asyncHandler(async (req, res) => {
    const newClient = { id: idCounter++, ...req.body }
    clients.push(newClient)
    res.status(201).json(new ApiResponse(201, newClient))
});


const updateClient = asyncHandler(async (req, res) => {
    const client = clients.find((c) => c.id === parseInt(req.params.id));
    if (!client) {
        throw new ApiError(404, "Client not found!")
    }
    Object.assign(client, req.body)
    res.status(200).json(new ApiResponse(200, client))
});


const deleteClient = asyncHandler(async (req, res) => {
    const index = clients.findIndex((c) => c.id === parseInt(req.params.id));
    if (index === -1) {
        throw new ApiError(404, "Client not found!")
    }
    clients.splice(index, 1);
    res.status(200).json(new ApiResponse(200, null, "Client Deleted!"))
})


export { getClients, getClientById, createClient, updateClient, deleteClient}