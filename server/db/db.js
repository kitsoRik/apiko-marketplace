const mongoose = require("mongoose");
const { qwe } = require("./models/user");

module.exports.connect = async () => mongoose.connect("mongodb://localhost:27017/apiko-marketplace", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
.then(() => {
    console.log("Use mongo db successed")

}).catch((e) => {
    console.log(e);
    process.exit();
});