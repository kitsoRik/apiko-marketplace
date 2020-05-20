const { Router } = require("express");
const { sendAsError } = require("../../helpers/response");
const { requiredError, customError } = require("../../helpers/errors");

const router = Router();

router.post("/checkRestoreKey", (req, res) => {
	const { key } = req.body;

	return res.send({
		success: false,
		error: {
			type: "UNKNOWN_KEY",
		},
	});

	res.send({
		success: true,
	});
});

module.exports = router;
