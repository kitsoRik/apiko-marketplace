const { sendAsError, sendAsResult } = require("../../helpers/response");
const {
	requiredError,
	typeError,
	customError,
} = require("../../helpers/errors");
const { checkValidEmail } = require("../../helpers/checkers");

const router = require("express").Router();

router.post("/restoreRequest", (req, res) => {
	const { email } = req.body;

	if (!email) return sendAsError(res)(requiredError("EMAIL"));
	if (typeof email !== "string")
		return sendAsError(res)(typeError("EMAIL", "STRING"));
	if (!checkValidEmail(email))
		return sendAsError(res)(customError("EMAIL_IS_NOT_VALID"));

	sendAsResult(res)();
});

module.exports = router;
