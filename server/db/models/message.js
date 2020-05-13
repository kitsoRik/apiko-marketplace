const { Schema, model } = require("mongoose");
const uuid = require("uuid");

const messageSchema = new Schema({
    id: {
        type: String,
        default: ""
    },
    writterId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
    }
});

messageSchema.pre("save", async function (next) {
    if (this.id !== "") return;

    this.id = uuid.v4();
    this.createdAt = new Date();
    next();
});
const messageModel = model("Messages", messageSchema);

exports.createMessage = (writterId, text) => messageModel.create({ writterId, text });

exports.getMessagesByIds = (ids = []) => messageModel.find({ id: { $in: ids } });