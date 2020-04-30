const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { getSessionBySesid } = require("../../db/models/session");
const { sendAsError, sendAsResult } = require("../../helpers/response");
const { customError } = require("../../helpers/errors");
const { getUserById, updateUserIcon } = require("../../db/models/user");
const { createProduct } = require("../../db/models/product");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../static/photos/products"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now());
    }
})

const upload = require("multer")({
    storage,
    limits: {
        fieldSize: 1024 * 1024 * 1024 * 1024 * 1024 * 1024
    },

})

const router = Router();

router.put("/add", upload.array("photos", 16), async (req, res) => {

    console.log(req.files);
    console.log(req.file);
    console.log(req.body);

    const { title, locationId, destination, price } = req.body;
    const { sesid } = req.cookies;

    const session = await getSessionBySesid(sesid);
    if (!session) return sendAsError(res)(customError("ACCESS_BLOCKED"));

    let user = await getUserById(session.userId);
    if (!user) return sendAsError(res)(customError("ACCESS_BLOCKED"));

    const product = await createProduct(title, "qwe", +price, "mebels", +locationId, req.files ? req.files[0].filename : "", req.files.map(f => f.filename));
    console.log(product);

    sendAsResult(res)(product);
});

module.exports = router;