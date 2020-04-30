const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
    id: {
        type: Number,
        default: -2
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
    console.log(this);
    if (this.id !== -2) return next();

    this.id = await locationModel.countDocuments();
    next();
});

const locationModel = model("Locations", locationSchema);

exports.getLocationById = (id) => locationModel.findOne({ id });
exports.getLocationsByNamePattern = (namePattern) => locationModel.find({ name: { $regex: namePattern } });

// (async () => {
//     await locationModel.create({ name: "Ternopil", longitude: 49.346, latitude: 26.123 });
//     await locationModel.create({ name: "Kiev", longitude: 51.346, latitude: 23.123 });
//     await locationModel.create({ name: "Lviv", longitude: 52.346, latitude: 22.123 });
//     await locationModel.create({ name: "Sumy", longitude: 53.346, latitude: 22.123 });
//     await locationModel.create({ name: "Dnipro", longitude: 46.346, latitude: 21.123 });
//     await locationModel.create({ name: "Ivanko", longitude: 45.346, latitude: 20.123 });
// })();