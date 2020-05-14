const { Schema, model } = require("mongoose");
const uuid = require("uuid");
const { getProductsIdsByUserId } = require("../models/user");

const feedbackSchema = new Schema({
    id: {
        type: String,
        default: ""
    },
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    rate: {
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

feedbackSchema.pre("save", async function (next) {
    if (this.id !== "") return;

    this.id = uuid.v4();
    this.createdAt = new Date().getTime();
    next();
});

const feedbackModel = model("Feedbacks", feedbackSchema);

exports.createFeedback = (productId, userId, rate, text) => feedbackModel.create({ productId, userId, rate, text });
exports.getFeedbacksByProductId = (productId, page, limit) => feedbackModel.find({ productId }).skip((page - 1) * limit).limit(limit);
exports.getFeedbacksByProductIds = (productIds) => feedbackModel.find({ productId: { $in: productIds } });
exports.getPositiveFeedbacksByProductIds = (productIds) => feedbackModel.find({ productId: { $in: productIds }, rate: { $gte: 3 } });

exports.getFeedbacksByUserId = async (userId, page = 1, limit = 10) =>
    this.getFeedbacksByProductIds(await getProductsIdsByUserId(userId)).skip((page - 1) * limit).limit(limit);

exports.getFeedbacksByUserIdCount = async (userId) =>
    this.getFeedbacksByProductIds(await getProductsIdsByUserId(userId)).countDocuments();

