const { Schema, model } = require("mongoose");
const uuid = require("uuid");

const purchaseSchema = new Schema({
	index: {
		type: Number,
		auto: true,
		unique: true,
		index: true,
		default: 0,
	},
	id: {
		type: String,
		default: "",
	},
	sellerId: {
		type: String,
		required: true,
	},
	shopperId: {
		type: String,
		required: true,
	},
	productId: {
		type: String,
		required: true,
	},
	statuses: {
		type: [Object],
		required: true,
	},
	count: {
		type: Number,
		required: true,
		default: 1,
	},
	price: {
		type: Number,
		required: true,
		default: 1,
	},
});

purchaseSchema.pre("save", async function (next) {
	if (this.id !== "") return;

	this.index = await purchaseModel.countDocuments();
	this.id = uuid.v4();
	this.statuses = [
		{
			status: "OPENED",
			date: new Date(),
		},
	];
	next();
});

const purchaseModel = model("Purchases", purchaseSchema);

exports.createPurchase = (sellerId, shopperId, productId, price, count) =>
	purchaseModel.create({
		shopperId,
		sellerId,
		productId,
		price,
		count,
	});

exports.changePurchaseStatus = (purchaseId, status) =>
	purchaseModel.findOneAndUpdate(
		{ id: purchaseId },
		{
			$push: {
				statuses: {
					status,
					date: new Date(),
				},
			},
		},
		{ new: true }
	);

exports.getPurchaseById = (id) => purchaseModel.findOne({ id });
exports.getPurchasesBySellerId = (sellerId) =>
	purchaseModel.find({
		sellerId,
	});
exports.getPurchasesByShopperId = (shopperId) =>
	purchaseModel.find({ shopperId });

exports.getClosedPurchasesBySellerId = (sellerId) =>
	purchaseModel.find({
		sellerId,
		statuses: { $elemMatch: { status: "CLOSED" } },
	});
