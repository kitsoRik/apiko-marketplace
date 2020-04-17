const { Router } = require("express");
const { sendAsError, sendAsResult } = require("../../helpers/response");
const { requiredError, customError } = require("../../helpers/errors");

const { getUserById, getUserByEmailAndPassword } = require("../../db/models/user");
const { createSession } = require("../../db/models/session");

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if(!email) return sendAsError(res)(requiredError("EMAIL"));
    if(!password) return sendAsError(res)(requiredError("PASSWORD"));
    
    const user = await getUserByEmailAndPassword(email, password);
    
    if(!user) return sendAsError(res)(customError("UNKNOWN_DATA"));
    delete user.password;
    
    const { sesid } = await createSession(user.id);
    
    res.cookie("sesid", sesid);
    
    sendAsResult(res)(user);
});

module.exports = router;