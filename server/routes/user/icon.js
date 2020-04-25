const { Router } = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { getSessionBySesid } = require("../../db/models/session");
const { sendAsError, sendAsResult } = require("../../helpers/response");
const { customError } = require("../../helpers/errors");
const { getUserById, updateUserIcon } = require("../../db/models/user");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../static/icons/users"));
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

router.put("/icon", upload.single("icon"), async (req, res) => {

    const { sesid } = req.cookies;

    const session = await getSessionBySesid(sesid);
    if(!session) return sendAsError(res)(customError("ACCESS_BLOCKED"));
    
    let user = await getUserById(session.userId);
    if(!user) return sendAsError(res)(customError("ACCESS_BLOCKED"));

    user = await updateUserIcon(user.id, req.file.filename)

    sendAsResult(res)(user);
});

module.exports = router;