const dgram = require("dgram")
const PORT = 8082

console.log("UDP Client started!")
const client = dgram.createSocket("udp4")

// 32 odleglosc z lewej
// 30 to srodek
// 64 to odleglosc z prawej

const messages = [
  {
    Heading: 30.0,
    "Distance, Variation": [10, 0, 30, 2, 20, 0],
  },
  {
    Heading: 30.0,
    "Distance, Variation": [10, 0, 28, 2, 20, 0],
  },
  {
    Heading: 30.0,
    "Distance, Variation": [10, 0, 26, 2, 20, 0],
  },
  {
    Heading: 30.0,
    "Distance, Variation": [10, 0, 24, 2, 20, 0],
  },
  {
    Heading: 30.0,
    "Distance, Variation": [10, 0, 22, 2, 20, 0],
  },
  {
    Heading: 30.0,
    "Distance, Variation": [10, 0, 20, 2, 20, 0],
  },
  {
    Heading: 30.0,
    "Distance, Variation": [10, 0, 18, 2, 20, 0],
  },
  {
    Heading: 30.0,
    "Distance, Variation": [10, 0, 16, 2, 20, 0],
  },
]

const sendMessages = async () => {
  for (let i = 0; i < messages.length; i++) {
    const message = JSON.stringify(messages[i])

    client.send(message, 0, message.length, PORT, "localhost", (error) => {
      if (error) {
        console.log("Error sending message")
      }
      console.log("Message sent!")
    })
    await new Promise((r) => setTimeout(r, 2000))
  }
  client.close()
}

sendMessages()
