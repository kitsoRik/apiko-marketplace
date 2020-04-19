const { sendAsError, sendAsResult } = require("../../helpers/response");
const { requiredError, typeError, customError } = require("../../helpers/errors");
const { createUser, getUserByEmail } = require("../../db/models/user");
const { createUnverifyedLink } = require("../../db/models/unverifyed");
const { createSession } = require("../../db/models/session");

const { hashPassword } = require("../../helpers/hash");

const router = require("express").Router();

router.post("/register", async (req, res) => {
    const { email, fullName, password } = req.body;

    if(!email) return sendAsError(res)(requiredError("EMAIL"));
    if(!fullName) return sendAsError(res)(requiredError("FULL_NAME"));
    if(!password) return sendAsError(res)(requiredError("PASSWORD"));

    if(typeof email !== 'string') return sendAsError(res)(typeError("EMAIL", "STRING"));
    if(typeof fullName !== 'string') return sendAsError(res)(typeError("FULL_NAME", "STRING"));
    if(typeof password !== 'string') return sendAsError(res)(typeError("PASSWORD", "STRING"));

    let user = await getUserByEmail(email);

    if(user) return sendAsError(res)(customError("EMAIL_IS_BUSY"));
    
    user = await createUser(
        fullName,
        email,
        await hashPassword(password)
    );
    
    const result = user.toObject();
    delete result.password;

    await createUnverifyedLink(user.id);
    
    const { sesid } = await createSession(user.id);
    
    res.cookie("sesid", sesid);

    sendAsResult(res)(result);
});

module.exports = router;