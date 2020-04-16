const { Router } = require("express");
const { sendAsError } = require("../../helpers/response");
const { requiredError } = require("../../helpers/errors");

const router = Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if(!email) return sendAsError(res)(requiredError("EMAIL"));
    if(!password) return sendAsError(res)(requiredError("PASSWORD"));

    res.send({
        success: true,
        user: {
            id: 0,
            email: "myemail@gmail.com",
            fullName: "Pidburachynskyi Rostyslav",
        }
    })
});

module.exports = router;