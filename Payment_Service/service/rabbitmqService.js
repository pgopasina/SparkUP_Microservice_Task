const amqp = require("amqplib");
const Order = require("../model/orderPayModel");

const queueName = "order_created";

async function consumeOrderQueue() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);

    channel.consume(queueName, async (msg) => {
        const order = JSON.parse(msg.content.toString());
        console.log("Processing order from the queue:", order);

        try {
            // Simulate payment logic with error handling
            await Order.findByIdAndUpdate(order._id, { status: "Paid" });
            console.log(`Order update ${order._id} status updated to "Paid"`);
        } catch (error) {
            console.error(`Failed to update the order ${order._id}:`, error.message);
        }

        channel.ack(msg);
    });
}

module.exports = { consumeOrderQueue };
