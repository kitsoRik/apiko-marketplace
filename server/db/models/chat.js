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
    },
    shopperRead: {
        type: Boolean,
        required: true
    },
    sellerRead: {
        type: Boolean,
        required: true
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

exports.createChat = (productId, shopperId, sellerId, initialMessageId, shopperRead = false, sellerRead = false) => chatModel.create({
    productId,
    shopperId,
    sellerId,
    messagesIds: (() => initialMessageId === undefined ? [] : [initialMessageId])(),
    shopperRead,
    sellerRead
});

exports.addMessageIdToChatById = (id, messagesId) => chatModel.findOneAndUpdate({ id }, { '$push': { messagesIds: messagesId } });

exports.getChatById = (id) => chatModel.findOne({ id });
exports.getChatsByUserId = (userId) => chatModel.find({ $or: [{ shopperId: userId }, { sellerId: userId }] });