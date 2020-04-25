const { Schema, model } = require("mongoose");


const saleSchema = new Schema({
    id: {
        type: Number,
        default: -1
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

saleSchema.pre("save", function(next) {
    if(this.id !== -1) return next();

    this.id = saleModel.countDocuments();

    next();
});

const saleModel = model("Sales", saleSchema);