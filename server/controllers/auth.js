import models from '../models/index';

const { User } = models;

class UserController {
  static async postUser(req, res) {
    const {
      email, password, firstName, lastName,
    } = req.body;
    if (!email || !password || !firstName) {
      return res.status(422).json({
        status: 'failed',
        error: 'please provide required values. email, password and first name are important'
      });
    }
    try {
      const foundUser = await User.findOne({ where: { email } });
      if (foundUser) {
        return res.status(409).json({
          status: 'failed',
          error: 'user with this email already exists'
        });
      }
      const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
      });
      res.status(201).json({
        status: 'success',
        data: newUser,
      });
    } catch (error) {
      res.status(422).json({
        status: 'failed',
        error: 'could not register user',
      });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        status: 'failed',
        error: 'email and password required to login'
      });
    }
    try {
      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        return res.status(404).json({
          status: 'failed',
          error: 'email or password is incorrect'
        });
      }
      if (foundUser.comparePassword(password, foundUser)) {
        const { id, firstName } = foundUser;
        return res.status(200).json({
          status: 'success',
          data: { id, firstName }
        });
      }
      if (!(foundUser.comparePassword(password, foundUser))) {
        return res.status(404).json({
          status: 'failed',
          error: 'email or password is incorrect'
        });
      }
    } catch (error) {
      return res.status(422).json({
        status: 'failed',
        error: 'failed to login user'
      });
    }
  }
}

export default UserController;
