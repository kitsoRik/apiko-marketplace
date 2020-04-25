const { Router } = require("express");
const { sendAsError, sendAsResult } = require("../../helpers/response");
const { requiredError, customError } = require("../../helpers/errors");

const { getUserById, getUserByEmailAndPassword } = require("../../db/models/user");
const { createSession } = require("../../db/models/session");
const { hashPassword } = require("../../helpers/hash");

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if(!email) return sendAsError(res)(requiredError("EMAIL"));
    if(!password) return sendAsError(res)(requiredError("PASSWORD"));
    
    const user = await getUserByEmailAndPassword(email, await hashPassword(password));
    
    if(!user) return sendAsError(res)(customError("UNKNOWN_DATA"));
    
    const { sesid } = await createSession(user.id);
    
    const result = user.toObject();
    delete result.password;

    res.cookie("sesid", sesid);
    
    sendAsResult(res)(result);
});

module.exports = router;