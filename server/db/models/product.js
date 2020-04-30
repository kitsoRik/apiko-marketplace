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
    locationId: {
        type: Number,
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

productSchema.pre("save", async function (next) {
    if (this.id !== 0) return next();

    const obj = await productModel.find().sort({ field: 'desc', id: -1 }).limit(1);
    this.id = obj[0] ? obj[0].id + 1 : 0;
    next();
});

const productModel = model("Products", productSchema);

exports.createProduct = (title, description, price, category, locationId, imageName, photosNames) =>
    productModel.create({ title, description, price, category, locationId, imageName, photosNames });

exports.getProductById = (id) => productModel.findOne({ id });
exports.getProductsByIds = (ids) => productModel.find({ id: { $in: ids } });

exports.getAllProducts = (titlePattern, category, locationId, priceFrom, priceTo) => productModel.find({
    title: { $regex: titlePattern },
    ...(() => locationId !== -1 && { locationId })(),
    ...parsePrice(priceFrom, priceTo),
    ...(() => category && category !== 'any' && { category })()
});

const parsePrice = (priceFrom, priceTo) => {
    let price = undefined;

    if (priceFrom !== -1) price = { $gte: priceFrom }
    if (priceTo !== -1) price = { ...(() => price && (price))(), $lte: priceTo }

    if (price) return { price };

    return undefined;
}
