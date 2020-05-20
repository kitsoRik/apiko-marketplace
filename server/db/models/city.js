const { Schema, model } = require("mongoose");
const uuid = require("uuid");

const locationSchema = new Schema({
	id: {
		type: String,
		default: "",
	},
	name: {
		type: String,
		unique: true,
		required: true,
	},
	longitude: {
		type: String,
		required: true,
	},
	latitude: {
		type: String,
		required: true,
	},
});

locationSchema.pre("save", async function (next) {
	if (this.id !== "") return;

	this.id = uuid.v4();
	next();
});

const locationModel = model("Locations", locationSchema);

exports.getLocationById = (id) => locationModel.findOne({ id });
exports.getLocationsByNamePattern = (namePattern) =>
	locationModel.find({ name: { $regex: namePattern } });

(async () => {
	try {
		await locationModel.create({
			name: "Rivne",
			longitude: 50.596298,
			latitude: 26.206036,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Lyck",
			longitude: 50.734603,
			latitude: 25.295473,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Khmelnickyi",
			longitude: 49.393685,
			latitude: 26.982515,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Ivano-Frankivsk",
			longitude: 48.90003,
			latitude: 24.714533,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Jitomyr",
			longitude: 50.267096,
			latitude: 28.663118,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Odessa",
			longitude: 46.511657,
			latitude: 30.770567,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Kropivnitskii",
			longitude: 49.554688,
			latitude: 25.601836,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Kherson",
			longitude: 48.488615,
			latitude: 32.265327,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Ternopil",
			longitude: 49.540426,
			latitude: 25.600646,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Poltava",
			longitude: 49.648394,
			latitude: 34.518519,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Kiev",
			longitude: 50.462206,
			latitude: 30.501967,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Lviv",
			longitude: 49.873651,
			latitude: 23.988756,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Sumy",
			longitude: 50.922444,
			latitude: 34.821213,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Dnipro",
			longitude: 48.4815,
			latitude: 35.043808,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Lygansk",
			longitude: 48.625978,
			latitude: 39.332515,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Cherkivci",
			longitude: 48.301349,
			latitude: 25.910011,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Chernigiv",
			longitude: 51.50039,
			latitude: 31.263669,
		});
	} catch (e) {}
	try {
		await locationModel.create({
			name: "Uzgorod",
			longitude: 48.611497,
			latitude: 22.56243,
		});
	} catch (e) {}
})();
