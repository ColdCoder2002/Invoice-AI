import express from "express"
import cors from "cors"
import { errorMiddleware } from "./middleware/error.middleware.js"
import clientRoutes from './routes/client.routes.js'


const app = express()


app.use(express.json());
app.use(cors())

app.use("/api/v1/clients", clientRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

app.use(errorMiddleware);

export { app }