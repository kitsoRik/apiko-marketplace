const { Schema, model } = require("mongoose");
const uuid = require("uuid");

const purchaseSchema = new Schema({
    id: {
        type: String,
        default: ""
    },
    sellerId: {
        type: String,
        required: true
    },
    shopperId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
});

purchaseSchema.pre("save", function (next) {
    if (this.id !== "") return;

    this.id = uuid.v4();
    this.date = new Date();
    next();
});

const purchaseModel = model("Purchases", purchaseSchema);

exports.createPurchase = (sellerId, shopperId, productId) => purchaseModel.create({
    shopperId, sellerId, productId
});

exports.getPurchasesBySellerId = (sellerId) => purchaseModel.find({ sellerId });
exports.getPurchasesByShopperId = (shopperId) => purchaseModel.find({ shopperId });