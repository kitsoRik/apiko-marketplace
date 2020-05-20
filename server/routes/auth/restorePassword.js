const { sendAsError, sendAsResult } = require("../../helpers/response");
const {
	requiredError,
	typeError,
	customError,
} = require("../../helpers/errors");

const router = require("express").Router();

router.post("/restorePassword", (req, res) => {
	const { password } = req.body;

	if (!password) return sendAsError(res)(requiredError("PASSWORD"));
	if (typeof password !== "string")
		return sendAsError(res)(typeError("PASSWORD", "STRING"));
	if (password.length < 8)
		return sendAsError(res)(customError("PASSWORD_MIN_LENGTH"));

	sendAsResult(res)();
});

module.exports = router;
