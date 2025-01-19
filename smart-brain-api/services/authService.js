const jwt = require('jsonwebtoken');
const redisClient = require('./redisClient');

//Sign JWT using user email
const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '2 days'});
};

// Save JWT as a key with user id as the value in Redis
const setToken = async (key, value) =>{ 
  try {
    await redisClient.set(key, value);
    return { success: true };
  } catch (err) {
    console.log('Error setting token:', err)
    return { success: false, error: err }
  }
};

const createSessions = async(user) => {
  // Create JWT token, return user data
  const { email, id } = user;
  const token = signToken(email);
  try {
    await setToken(token,id);
    return { success: 'true', userId: id, token }
  } catch (err) {
    console.log('Error setting session:', err)
    return { success: 'false', error: err}
  }
}

module.exports = {
  signToken,
  setToken,
  createSessions
}