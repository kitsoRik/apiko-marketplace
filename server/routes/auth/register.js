const { sendAsError, sendAsResult } = require("../../helpers/response");
const { requiredError, typeError, customError } = require("../../helpers/errors");

const router = require("express").Router();

router.post("/register", (req, res) => {

    const { email, fullName, password } = req.body;

    if(!email) return sendAsError(res)(requiredError("EMAIL"));
    if(!fullName) return sendAsError(res)(requiredError("FULL_NAME"));
    if(!password) return sendAsError(res)(requiredError("PASSWORD"));

    if(typeof email !== 'string') return sendAsError(res)(typeError("EMAIL", "STRING"));
    if(typeof fullName !== 'string') return sendAsError(res)(typeError("FULL_NAME", "STRING"));
    if(typeof password !== 'string') return sendAsError(res)(typeError("PASSWORD", "STRING"));

    if(email === "busy@gmail.com") return sendAsError(res)(customError("EMAIL_IS_BUSY"));
    if(email === "email") return sendAsError(res)(customError("BAD_EMAIL"));

    sendAsResult(res)({
        id: 0,
        email,
        fullName,
    })
});

module.exports = router;