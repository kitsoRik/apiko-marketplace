const { Router } = require("express");
const { sendAsError, sendAsResult } = require("../../helpers/response");
const { requiredError, customError, unknownError } = require("../../helpers/errors");

const { getUserById, getUserByEmailAndPassword } = require("../../db/models/user");
const { createSession, getSessidBySesid } = require("../../db/models/session");

const router = Router();

router.post("/data", async (req, res) => {
    const { sesid } = req.cookies;

    if(!sesid) return sendAsError(res)();

    const session = await getSessidBySesid(sesid);

    if(!session) {
        res.clearCookie();
        return sendAsError(res)();
    }

    const user = await getUserById(session.userId);
    
    if(!user) return sendAsError(res)(unknownError);

    delete user.password;

    sendAsResult(res)(user);
});

module.exports = router;