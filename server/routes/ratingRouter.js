const Router = require("express");
const router = new Router();
const checkRole = require("../middleware/checkRoleMiddleware");
const rateController = require("../controllers/ratingController");

router.post("/", rateController.addRating);
router.get("/", rateController.getDeviceRating);

module.exports = router;
