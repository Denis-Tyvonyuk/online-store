const { Rating } = require("../models/models");
const ApiError = require("../error/ApiError");

class RatingController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async deleteBrand(req, res) {
    try {
      const { name } = req.body;
      console.log(name);
      const brand = await Brand.destroy({
        where: { name: name },
      });

      if (brand) {
        res.status(200).json({ message: "Brand deleted successfully." });
      } else {
        //need fix
        res.status(200).json({ message: "Brand not found." });
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}

module.exports = new RatingController();
