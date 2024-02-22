const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");

router.post("/", deviceController.create);
router.delete("/", deviceController.deleteDevice);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);

module.exports = router;
