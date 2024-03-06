const { Rating, Device } = require("../models/models");
const ApiError = require("../error/ApiError");

class RatingController {
  async addRating(req, res, next) {
    try {
      const { userId, deviceId, rating } = req.body;
      console.log(req.body);
      const checkUser = await Rating.findOne({
        where: { userId: userId, deviceId: deviceId },
      });

      if (checkUser !== null) {
        // If the user has already rated, update the existing rating
        const updateRating = await Rating.update(
          { rating },
          { where: { userId: userId, deviceId: deviceId } }
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
      next(ApiError.internal(error));
    }
  }

  async getDeviceRating(req, res, next) {
    try {
      const { deviceId } = req.query;
      // console.log(req);
      const deviceRatings = await Rating.findAll({
        where: { deviceId: deviceId },
      });

      let userCount = 0;
      const ratingsArray = [];

      deviceRatings.forEach((element) => {
        userCount++;
        ratingsArray.push(element.rating);
      });

      const countRating = ratingsArray.reduce((sum, rating) => sum + rating, 0);
      const ratingValue = (userCount > 0 ? countRating / userCount : 0).toFixed(
        0
      );

      //console.log(countRating);
      await Device.update(
        { rating: ratingValue }, // Fix the syntax here
        { where: { id: deviceId } }
      );

      return res.json(ratingValue);
    } catch (error) {
      next(ApiError.internal("Failed to fetch device ratings", error));
    }
  }
}

module.exports = new RatingController();
