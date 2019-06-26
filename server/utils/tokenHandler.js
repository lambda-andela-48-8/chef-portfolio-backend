import jwt from 'jsonwebtoken';

require('dotenv').config();


const generateToken = (user) => {
  try {
    const token = jwt.sign({ sub: user.id, name: user.firstName }, process.env.SECRET_KEY);
    return token;
  } catch (error) { }
};
module.exports = {
  generateToken,
};
