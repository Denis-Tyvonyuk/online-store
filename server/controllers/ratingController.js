const { Rating } = require("../models/models");
const ApiError = require("../error/ApiError");

class RatingController {
  async addRating(req, res, next) {
    try {
      const { userId, deviceId, rating } = req.body;
      const checkUser = await Rating.findOne({ where: { userId, deviceId } });

      if (checkUser !== null) {
        // If the user has already rated, update the existing rating
        const updateRating = await Rating.update(
          { rating },
          { where: { userId, deviceId } }
        );
        console.log("rating update");
        return res.json(updateRating);
      } else {
        // If the user hasn't rated yet, create a new rating
        const addedRating = await Rating.create({ userId, deviceId, rating });
        console.log("rating added");
        return res.json(addedRating);
      }
    } catch (error) {
      next(ApiError.internal("Failed to add or update rating", error));
    }
  }

  async getDeviceRating(req, res, next) {
    try {
      const { deviceId } = req.query;
      //console.log(deviceId);
      const deviceRatings = await Rating.findAll({
        where: { deviceId: deviceId },
      });
      const ratingsArray = [];
      let userCount = 0;

      deviceRatings.forEach((element) => {
        userCount++;

        ratingsArray.push(element.rating);
      });

      const countRating = ratingsArray.reduce((sum, rating) => sum + rating, 0);
      const ratingValue = countRating / userCount;

      return res.json(ratingValue.toFixed(1));
    } catch (error) {
      next(ApiError.internal("Failed to fetch device ratings", error));
    }
  }
}

module.exports = new RatingController();
