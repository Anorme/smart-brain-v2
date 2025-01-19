const redisClient = require('../services/redisClient');

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json('unauthorized')
    } 

    const reply = await redisClient.get(authorization);
    if (!reply){
      return res.status(401).json('unauthorized')
    }
    return next()

  } catch (err){
    console.log(`Error retrieving user data: ${err}`)
    return res.status(500).json('Internal server error')
  }
 
}

module.exports = {
  requireAuth
}