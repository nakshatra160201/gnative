const mqtt = require("mqtt");
const WebSocket = require("ws");
const ws = new WebSocket("ws://server-url");
const Redis = require("ioredis");
const client = mqtt.connect("tcp://broker.hivemq.com");
const redis = new Redis();
// Subscribe to the 'data-update' channel in Redis
redis.subscribe("data-update");

// Function to handle incoming messages on the 'data-update' channel
redis.on("message", (channel, message) => {
  if (channel === "data-update") {
    ws.send(message);
  }
});
client.subscribe("SnehasGrowth");
client.on("message", async (topic, message) => {
  if (topic === "SnehasGrowth") {
    const data = JSON.parse(message);
    const now = Date.now();
    const elapsedTime = now - data.timestamp;
    const wordsPerMinute = (data.words / elapsedTime) * 60 * 1000;
    const charactersPerMinute = (data.characters / elapsedTime) * 60 * 1000;
    var rollno = data.rollNo;
    redis.publish(
      "data-update",
      JSON.stringify({
        rollno: {
          image: data.image,
          totalWords: data.words,
          totalCharacters: data.characters,
          wordsPerMinute,
          charactersPerMinute,
        },
      })
    );
  }
});
// Disconnect from the Redis database and the WebSocket server when the process exits
process.on("SIGINT", () => {
  redis.disconnect();
  ws.close();
});
