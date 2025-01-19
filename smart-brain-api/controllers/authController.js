const redisClient = require('../services/redisClient');

// Get id from redis using authorization header value as key
const getAuthTokenId = async(req, res) => {
  const { authorization } = req.headers;
  const reply = await redisClient.get(authorization);
  if (!reply) {
    res.status(400).json('unauthorised')
  } else {
    res.json({id: reply})
  }
  
}

module.exports = {
  getAuthTokenId,
}