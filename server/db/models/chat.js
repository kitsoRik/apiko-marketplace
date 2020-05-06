const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
    id: {
        type: Number,
        default: 0
    },
    productId: {
        type: Number,
        required: true
    },
    shopperId: {
        type: Number,
        required: true
    },
    sellerId: {
        type: Number,
        required: true
    },
    messagesIds: {
        type: [Number],
        default: []
    },
    createdAt: {
        type: Date,
        default: "",
    }
});

chatSchema.pre("save", async function (n) {
    if (this.id !== 0) return;

    const obj = await chatModel.find().sort({ field: 'desc', id: -1 }).limit(1);
    this.id = obj[0] ? obj[0].id + 1 : 0;
    this.createdAt = new Date();
    n();
});

const chatModel = model("Chats", chatSchema);

exports.createChat = (productId, shopperId, sellerId, initialMessageId) => chatModel.create({
    productId,
    shopperId,
    sellerId,
    messagesIds: (() => initialMessageId === undefined ? [] : [initialMessageId])()
});

exports.getChatsByUserId = (userId) => chatModel.find({ $or: [{ shopperId: userId }, { sellerId: userId }] });