const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
    id: {
        type: Number,
        default: 0
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    locationId: {
        type: String,
        default: "-1"
    },
    phone: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    savedProducts: {
        type: [Number], // products ids
        default: []
    },
    iconName: {
        type: String,
        default: ""
    },
    productsIds: {
        type: [Number],
        default: []
    },
    cartProducts: {
        type: [Object],
        default: []
    }
});

userSchema.pre("save", async function (n) {
    if (this.id !== 0) return n();

    const obj = await userModel.find().sort({ field: 'desc', id: -1 }).limit(1);
    this.id = obj[0] ? obj[0].id + 1 : 0;
    n();
});

const userModel = model("Users", userSchema);

exports.createUser = (fullName, email, password) => userModel.create({ fullName, email, password });
exports.getUserById = (id) => userModel.findOne({ id });
exports.getUserByEmail = (email) => userModel.findOne({ email }, { productsIds: true });
exports.getUserByEmailAndPassword = (email, password) => userModel.findOne({ email, password });

exports.getProductsIdsByUserId = (id) => userModel.findOne({ id }, { productsIds: true }).then(({ productsIds }) => productsIds)
exports.getSavedProductsIdsByUserId = (id) => userModel.findOne({ id }, { savedProducts: true }).then(({ savedProducts }) => savedProducts)

exports.getUserByProductId = (productId) => userModel.findOne({ productsIds: { $elemMatch: { $eq: productId } } });

exports.getAllUsers = (page, limit) => userModel.find().skip((page - 1) * limit).limit(limit);

exports.saveUserById = (id, fullName, locationId, phone, iconName) => userModel.findOneAndUpdate({ id }, {
    fullName,
    phone,
    locationId,
    ...(() => iconName ? ({ iconName }) : null)()
}, { new: true });

exports.updateUserIcon = (id, iconName) => userModel.findOneAndUpdate({ id }, { iconName }, { new: true });

exports.addProductByUserId = async (userId, productId) => userModel.findOneAndUpdate({ id: userId }, {
    productsIds:
        [...(await this.getProductsIdsByUserId(userId)), productId]
});


exports.changeCartItemCountByUserId = async (id, productId, count) => {
    const user = await userModel.findOne({ id });
    user.cartProducts.find(cp => cp.productId === +productId).count = count;
    user.markModified("cartProducts");
    return await user.save();
}

exports.addProductToCardByUserId = async (id, productId, count) => {
    const userCartProducts = (await this.getUserById(id)).cartProducts;
    const cp = userCartProducts.find(cp => cp.productId === +productId);
    if (cp) {
        this.changeCartItemCountByUserId(id, productId, cp.count + count);
    } else {
        userModel.findOneAndUpdate({ id }, { $push: { cartProducts: { productId, count } } });
    }
}