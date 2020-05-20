const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid");

const sessionSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	sesid: {
		type: String,
	},
});

sessionSchema.pre("save", function (next) {
	const sesid = crypto.randomBytes(256);
	this.sesid = sesid;
	next();
});

const sessionModel = model("Sessions", sessionSchema);

exports.createSession = (userId) => sessionModel.create({ userId });
exports.getSessionBySesid = (sesid) => sessionModel.findOne({ sesid });
exports.removeSessionsByUserId = (userId) =>
	sessionModel.deleteMany({ userId });
exports.removeSession = (sesid) => sessionModel.findOneAndDelete({ sesid });
