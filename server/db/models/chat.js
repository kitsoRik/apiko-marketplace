const { Schema, model } = require("mongoose");
const uuid = require("uuid");

const chatSchema = new Schema({
    id: {
        type: String,
        default: ""
    },
    productId: {
        type: String,
        required: true
    },
    shopperId: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    messagesIds: {
        type: [String],
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

chatSchema.pre("save", async function (next) {
    if (this.id !== "") return;

    this.id = uuid.v4();
    next();
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

exports.addMessageIdToChatById = (id, messagesId) => chatModel.findOneAndUpdate({ id }, { $push: { messagesIds: messagesId } });

exports.getChatById = (id) => chatModel.findOne({ id });
exports.getChatsByUserId = (userId) => chatModel.find({ $or: [{ shopperId: userId }, { sellerId: userId }] });

exports.getChatByMessageId = (messagesId) => chatModel.findOne({ messagesIds: { $elemMatch: { $eq: messagesId } } });