const { Router } = require("express");
const { sendAsError, sendAsResult } = require("../../helpers/response");
const {
	requiredError,
	customError,
	unknownError,
} = require("../../helpers/errors");

const {
	getUserById,
	getUserByEmailAndPassword,
} = require("../../db/models/user");
const { createSession, getSessionBySesid } = require("../../db/models/session");

const router = Router();

router.post("/data", async (req, res) => {
	const { sesid } = req.cookies;

	if (!sesid) return sendAsError(res)();

	const session = await getSessionBySesid(sesid);

	if (!session) {
		res.clearCookie();
		return sendAsError(res)();
	}

	const user = await getUserById(session.userId);

	if (!user) return sendAsError(res)(unknownError);

	const result = user.toObject();
	delete result.password;

	sendAsResult(res)(result);
});

module.exports = router;
