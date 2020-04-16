const router = require("express").Router();

router.use("/auth", require("./login"));
router.use("/auth", require("./register"));
router.use("/auth", require("./restoreRequest"));
router.use("/auth", require("./restorePassword"));

module.exports = router;