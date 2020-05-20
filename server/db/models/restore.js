const { Schema, model } = require("mongoose");
const uuid = require("uuid");

const restoreSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	link: {
		type: String,
	},
	type: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Number,
		default: 0,
	},
});

restoreSchema.pre("save", async function (next) {
	this.link = uuid.v4();
	this.createdAt = new Date().getTime();
	next();
});

const restoreModel = model("Restores", restoreSchema);

exports.createPasswordRestoreByUserId = (userId) =>
	restoreModel.create({ userId, type: "PASSWORD" });
exports.removePasswordRestoreKeyByUserId = (userId) =>
	restoreModel.deleteMany({ userId, type: "PASSWORD" });

exports.getPasswordRestoreByLink = (link) =>
	restoreModel.findOne({ link, type: "PASSWORD" });
