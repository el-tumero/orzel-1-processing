import express, { Express, Request, Response } from "express"
import { createServer } from "node:http"
import eagleService from "./eagleService"
import { Server } from "socket.io"

const app = express()

const PORT = 8081
const server = createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

io.on("connection", (socket) => {
  console.log("[CORE/HTTP+WS] User connected to WebSocket server")
})

app.get("/health", (req, res) => {
  res.send("healthy")
})

eagleService(io)

server.listen(PORT, () => {
  console.log(`[CORE/HTTP+WS] Server running at port ${PORT}`)
})

// app.listen(PORT, () => {
//   console.log(`[CORE] Rest Server running on ${PORT}`)
// })
