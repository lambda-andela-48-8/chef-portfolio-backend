import jwt from 'jsonwebtoken';

require('dotenv').config();


const generateToken = (user) => {
  try {
    const token = jwt.sign({ sub: user.id, name: user.firstName }, process.env.SECRET_KEY);
    return token;
  } catch (error) { }
};

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: 'Failed',
      error: 'Unathorized, token must be provided',
    });
  }
  try {
    const user = await jwt.verify(token, process.env.SECRET_KEY);
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        error: 'unable to authenticate token',
      });
    }
    req.user = user;
    next();
  } catch (error) { }
};
module.exports = {
  generateToken,
  verifyToken
};
