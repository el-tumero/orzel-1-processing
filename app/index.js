const socket = io("ws://localhost:8081")
const canvas = document.getElementById("display")
const position = document.getElementById("position")
const ctx = canvas.getContext("2d")

canvas.width = 500
canvas.height = 500

const POINT_SIZE = 5
const SCALE_SIZE = 5

ctx.translate(canvas.width / 2, canvas.height / 2)
ctx.scale(1, -1)

socket.on("connect", () => {
  console.log("Connected to server!")

  socket.on("draw", (msg) => {
    const drawMessage = JSON.parse(msg)
    drawPoint(drawMessage, ctx)

    if (drawMessage.color === "White") {
      position.innerHTML = `X: ${drawMessage.point.x}, Y: ${drawMessage.point.y}`
    }
  })
})

const drawPoint = (drawMessage, ctx) => {
  ctx.fillStyle = drawMessage.color
  ctx.fillRect(
    drawMessage.point.x * SCALE_SIZE,
    drawMessage.point.y * SCALE_SIZE,
    POINT_SIZE,
    POINT_SIZE
  )
}
