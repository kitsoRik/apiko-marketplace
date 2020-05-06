const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    id: {
        type: Number,
        default: 0
    },
    ownerId: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
    }
});

messageSchema.pre("save", async function (n) {
    if (this.id !== 0) return;

    const obj = await messageModel.find().sort({ field: 'desc', id: -1 }).limit(1);
    this.id = obj[0] ? obj[0].id + 1 : 0;
    this.createdAt = new Date();
    n();
});

const messageModel = model("Messages", messageSchema);

exports.createMessage = (ownerId, text) => messageModel.create({ ownerId, text });

exports.getMessagesByIds = (ids = []) => messageModel.find({ id: { $in: ids } });