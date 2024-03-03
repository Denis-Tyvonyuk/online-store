const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, basketController.createOrGet);
router.post("/device", basketController.createBasketDevice);
router.delete("/device", basketController.deleteBasketDevice);
router.get("/", basketController.getOne);
router.get("/device", authMiddleware, basketController.getBasketDevice);

module.exports = router;
