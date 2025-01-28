
import { createDrawMessage, parseMessageFromEagle } from "./parser/parser"
import { addPositionToCache, getLatestPosition } from "./cache"
import { calculatePoint, calculatePosition } from "./algo/points"
import { Server } from "socket.io"
import { Express } from "express"

const eagleService = (io: Server, app: Express) => {
  // const socket = dgram.createSocket("udp4")
  // const PORT = 8082


  app.all("*/params", (req, res) => {
    // console.log(
    //   `[CORE/EAGLE] Received message from ${rinfo.address}:${rinfo.port}`
    // )
    try {
      const eagleData = parseMessageFromEagle(req.body)
      console.log(
        `[CORE/EAGLE] Received Eagle data: ${JSON.stringify(eagleData)}`
      )

      // Calculate position
      const latestPoint = getLatestPosition()
      const position = calculatePosition(latestPoint, eagleData)
      addPositionToCache(position)
      console.log(
        `[CORE/EAGLE] Calculated position: ${JSON.stringify(position)}`
      )

      // Calculate points
      const frontPoint = calculatePoint(position, eagleData, "front")
      const leftPoint = calculatePoint(position, eagleData, "left")
      const rightPoint = calculatePoint(position, eagleData, "right")

      console.log(
        `[CORE/EAGLE] Calculated points: ${JSON.stringify({
          frontPoint,
          leftPoint,
          rightPoint,
        })}`
      )

      const drawMessages = [
        createDrawMessage(position, "position"),
        createDrawMessage(frontPoint, "front"),
        createDrawMessage(leftPoint, "left"),
        createDrawMessage(rightPoint, "right"),
      ]

      // Send draw messages via WebSocket
      drawMessages.forEach((drawMessage) => {
        io.emit("draw", JSON.stringify(drawMessage))
      })
    } catch (error) {
      console.error(`[CORE/EAGLE] Error parsing message: ${error}`)
    }

    res.send("Hello World!")
  })



  // console.log(`[CORE/EAGLE] Eagle Service running at ${PORT}`)
  // socket.bind(PORT)
}

export default eagleService
