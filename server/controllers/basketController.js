const { Basket, BasketDevice } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  async createOrGet(req, res) {
    try {
      const { userId } = req.body;
      let basket = await Basket.findOne({ where: { userId } });
      console.log("basket already exist");

      if (!basket) {
        basket = await Basket.create({ userId });
        console.log("basket create");
      }

      return res.json(basket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAll(req, res) {
    try {
      const baskets = await Basket.findAll();
      return res.json(baskets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getOne(req, res) {
    const { userId } = req.body;
    console.log(req + "sdadasasd");
    try {
      const basket = await Basket.findOne({ where: { userId } });

      return res.json(basket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteBasket(req, res) {
    try {
      const deletedRows = await Basket.destroy({
        where: { id: req.body.id },
      });

      if (deletedRows > 0) {
        res.status(200).json({ message: "Basket item deleted successfully." });
      } else {
        res.status(404).json({ message: "Basket item not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createBasketDevice(req, res) {
    try {
      const { basketId, deviceId } = req.body;
      const basketdevice = await BasketDevice.create({ basketId, deviceId });
      return res.json(basketdevice);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getBasketDevice(req, res) {
    try {
      const { basketId } = req.query;

      const allbasketdevice = await BasketDevice.findAll({
        where: { basketId: basketId },
      });
      return res.json(allbasketdevice);
    } catch (e) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new BasketController();
