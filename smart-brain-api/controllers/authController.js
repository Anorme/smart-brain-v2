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

const signout = async (req, res) => {
  const { token } = req.body;

  try {
    const deleteToken = await redisClient.del(token);
    if (deleteToken) {
      res.json('success')
    } else {
      throw new Error ('Unable to delete token')
    }
  } catch (err) {
    err => res.status(400).json(err.message)
  }

}

module.exports = {
  getAuthTokenId,
  signout
}