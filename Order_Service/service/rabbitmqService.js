const amqp = require("amqplib");
let channel;
const queueName = "order_created";

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    console.log("Successfully connected to RabbitMQ and queue asserted.");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error.message);
  }
}

async function publishOrder(order) {
  if (!channel) {
    console.error("Cannot publish order. RabbitMQ channel is not initialized.");
    return;
  }
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(order)));
  console.log("Order published to RabbitMQ:", order);
}

module.exports = { connectRabbitMQ, publishOrder };