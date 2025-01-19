const fs = require("fs")
const dgram = require("dgram")
const PORT = 8082

console.log("UDP Client started!")
const client = dgram.createSocket("udp4")

// 32 odleglosc z lewej
// 30 to srodek
// 64 to odleglosc z prawej

// load messages
const messages = JSON.parse(fs.readFileSync("old_test.json", "utf8"))

const sendMessages = async () => {
  for (let i = 0; i < messages.length; i++) {
    const message = JSON.stringify(messages[i])

    client.send(message, 0, message.length, PORT, "localhost", (error) => {
      if (error) {
        console.log("Error sending message")
      }
      console.log("Message sent!")
    })
    await new Promise((r) => setTimeout(r, 1000))
  }
  client.close()
}

sendMessages()
