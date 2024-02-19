const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async deleteType(req, res) {
    try {
      const { name } = req.body;
      console.log(name);
      const type = await Type.destroy({
        where: { name: name },
      });

      if (type) {
        res.status(200).json({ message: "Type deleted successfully." });
      } else {
        //need fix
        res.status(200).json({ message: "Type not found." });
      }
    } catch (error) {
      console.error("Error deleting type:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }
}

module.exports = new TypeController();
