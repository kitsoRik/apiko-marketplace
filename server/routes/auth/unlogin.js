const { Router } = require("express");
const { sendAsError, sendAsResult } = require("../../helpers/response");
const { requiredError, customError } = require("../../helpers/errors");

const {
	getUserById,
	getUserByEmailAndPassword,
} = require("../../db/models/user");
const { createSession, removeSession } = require("../../db/models/session");

const router = Router();

router.post("/unlogin", async (req, res) => {
	const { sesid } = req.cookies;

	if (!sesid) return sendAsError(res)(requiredError("SESID"));

	const session = await removeSession(sesid);

	if (!session) return sendAsError(res)(customError("UNKNOWN_SESID"));

	res.clearCookie();

	sendAsResult(res)();
});

module.exports = router;
