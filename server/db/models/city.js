const { Schema, model } = require("mongoose");
const uuid = require("uuid");

const locationSchema = new Schema({
    id: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    }
});

locationSchema.pre("save", async function (next) {
    if (this.id !== "") return;

    this.id = uuid.v4();
    next();
});

const locationModel = model("Locations", locationSchema);

exports.getLocationById = (id) => locationModel.findOne({ id });
exports.getLocationsByNamePattern = (namePattern) => locationModel.find({ name: { $regex: namePattern } });

(async () => {
    if (await locationModel.countDocuments() !== 0) return;
    await locationModel.create({ name: "Ternopil", longitude: 49.346, latitude: 26.123 });
    await locationModel.create({ name: "Kiev", longitude: 51.346, latitude: 23.123 });
    await locationModel.create({ name: "Lviv", longitude: 52.346, latitude: 22.123 });
    await locationModel.create({ name: "Sumy", longitude: 53.346, latitude: 22.123 });
    await locationModel.create({ name: "Dnipro", longitude: 46.346, latitude: 21.123 });
    await locationModel.create({ name: "Ivanko", longitude: 45.346, latitude: 20.123 });
})();