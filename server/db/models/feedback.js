const { Schema, model } = require("mongoose");


const feedbackSchema = new Schema({
    id: {
        type: Number,
        default: 0
    },
    userId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
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

feedbackSchema.pre("save", async function(next) {
    if(this.id !== 0) return next();

    this.id = await feedbackModel.count();
    this.createdAt = new Date();

    next();
});

const feedbackModel = model("Feedbacks", feedbackSchema);

exports.createFeedback = (productId, userId, rate, text) => feedbackModel.create({ productId, userId, rate, text });
exports.getFeedbacksByProductId = (productId, page, limit) => feedbackModel.find({ productId }).skip((page - 1) * limit).limit(limit);
