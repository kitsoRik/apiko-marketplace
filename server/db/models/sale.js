const { Schema, model } = require("mongoose");

const uuid = require("uuid");

const saleSchema = new Schema({
    id: {
        type: String,
        default: ""
    },
    userId: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    date: {
        type: Number
    }
});

saleSchema.pre("save", function (next) {
    if (this.id !== "") return;

    this.id = uuid.v4();
    next();
});

const saleModel = model("Sales", saleSchema);