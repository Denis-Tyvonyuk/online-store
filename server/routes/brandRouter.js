const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", brandController.create);
router.delete("/", checkRole("ADMIN"), brandController.deleteBrand);
router.get("/", brandController.getAll);

module.exports = router;
