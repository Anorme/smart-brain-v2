const redisClient = require('../redisClient');

const requireAuth = async (req, res, next) => {
  try {
    console.log('Authorization middleware is active')
    const { authorization } = req.headers;
    console.log(`Checking auth headers: ${authorization}`)
    if (!authorization) {
      console.log('No authorization header')
      return res.status(401).json('unauthorized')
    } 

    const reply = await redisClient.get(authorization);
    console.log(`Checking if authorization token is in redis: ${reply}`)
    if (!reply){
      console.log(`Token not found`)
      return res.status(401).json('unauthorized')
    }
    console.log('You shall pass')
    return next()

  } catch (err){
    console.log(`Error retrieving user data: ${err}`)
    return res.status(500).json('Internal server error')
  }
 
}

module.exports = {
  requireAuth
}