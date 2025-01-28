import express, { Express, Request, Response } from "express"
import { createServer } from "node:http"
import eagleService from "./eagleService"
import { Server } from "socket.io"
import { clearCache } from "./cache"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()

app.use(bodyParser.json())

app.use(cors({
  origin: "*"
}))

const PORT = 8081
const server = createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

io.on("connection", (socket) => {
  console.log("[CORE/HTTP+WS] User connected to WebSocket server")
})

app.get("/health", (req, res) => {
  res.send("healthy")
})

app.get("/clear", (req, res) => {
  clearCache()
  res.send("ok")
})

eagleService(io, app)

server.listen(PORT, () => {
  console.log(`[CORE/HTTP+WS] Server running at port ${PORT}`)
})

// app.listen(PORT, () => {
//   console.log(`[CORE] Rest Server running on ${PORT}`)
// })
