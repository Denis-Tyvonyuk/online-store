const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Invalid email or password"));
    }

    try {
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest("User with this email already exists"));
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });

      // Log successful registration
      console.log(`User registered successfully: ${user.email}`);

      // Create a basket for the user
      const basket = await Basket.create({ userId: user.id });

      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      // Handle database errors
      console.error("Registration failed:", error.message);
      return next(ApiError.internal("Registration failed"));
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User not found"));
    }

    try {
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Incorrect password"));
      }

      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      console.error("Login failed:", error.message);
      return next(ApiError.internal("Login failed"));
    }
  }

  async check(req, res, next) {
    try {
      // const token = generateJwt(req.user.id, req.user.email, req.user.role);
      const token = req.headers.authorization.split(" ")[1];
      return res.json({ token });
    } catch (e) {
      console.log(req.headers.authorization);

      return res.json({ token });
    }
  }
}

module.exports = new UserController();
