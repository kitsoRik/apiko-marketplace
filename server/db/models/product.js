const { Schema, model } = require("mongoose");
const uuid = require("uuid");

const productSchema = new Schema({
	id: {
		type: String,
		default: "",
	},
	ownerId: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: "",
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	locationId: {
		type: String,
		required: true,
		default: "-1",
	},
	imageName: {
		type: String,
		default: null,
	},
	photosNames: {
		type: [String],
		required: true,
	},
	createdAt: {
		type: String,
		required: true,
		default: new Date(2000, 08, 16, 0, 0, 0),
	},
});

productSchema.pre("save", async function (next) {
	if (this.id !== "") return;

	this.id = uuid.v4();
	this.createdAt = new Date();
	next();
});

const productModel = model("Products", productSchema);

exports.createProduct = (
	ownerId,
	title,
	description,
	price,
	category,
	locationId,
	imageName,
	photosNames
) =>
	productModel.create({
		ownerId,
		title,
		description,
		price,
		category,
		locationId,
		imageName,
		photosNames,
	});

exports.getProductById = (id) => productModel.findOne({ id });
exports.getProductsByIds = (ids) => productModel.find({ id: { $in: ids } });

exports.getAllProducts = (
	titlePattern,
	category,
	locationId,
	priceFrom,
	priceTo
) =>
	productModel.find({
		title: { $regex: titlePattern },
		...(() => locationId !== "-1" && { locationId })(),
		...parsePrice(priceFrom, priceTo),
		...(() => category && category !== "any" && { category })(),
	});

const parsePrice = (priceFrom, priceTo) => {
	let price = undefined;

	if (priceFrom !== -1) price = { $gte: priceFrom };
	if (priceTo !== -1) price = { ...(() => price && price)(), $lte: priceTo };

	if (price) return { price };

	return undefined;
};
