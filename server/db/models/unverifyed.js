const { Schema, model } = require("mongoose");
const crypto = require("crypto");

const unverifyedSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	type: {
		type: String, // 'email' or 'password'
		enum: ["email", "password"],
		required: true,
	},
	verifyLink: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
	},
});

unverifyedSchema.pre("save", async function (next) {
	this.created = new Date();
	next();
});

const unverifyedModel = model("Unverifyed", unverifyedSchema);

exports.createUnverifyedLink = (userId) =>
	unverifyedModel.create({
		userId,
		type: "email",
		verifyLink: crypto.randomBytes(64),
	});
