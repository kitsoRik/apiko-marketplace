const { Schema, model } = require("mongoose");



const productSchema = new Schema({
    id: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    photosNames: {
        type: [String],
        required: true
    }
});

productSchema.pre("save", async function(next) {
    if(this.id !== 0) return next();

    const obj = await productModel.find().sort({ field: 'desc', id: -1 }).limit(1);
    this.id = obj[0] ? obj[0].id + 1 : 0;
    next();
});

const productModel = model("Products", productSchema);

exports.createProduct = (title, description, price, category, imageName, photosNames) => 
    productModel.create({ title, description, price, category, imageName, photosNames });

exports.getProductById = (id) => productModel.findOne({ id });
exports.getProductsByIds = (ids) => productModel.find({ id: { $in: ids }});

exports.getAllProducts = (page, limit) => productModel.find().skip((page - 1) * limit).limit(limit);
