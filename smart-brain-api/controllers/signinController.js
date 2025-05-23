const { getAuthTokenId } = require('./authController')
const { createSessions } = require('../services/authService');
const { handleSignin } = require('../services/signinService')

const signinAuthentication = (db, bcrypt) => async (req, res) => {
  const { authorization } = req.headers;
  const { email, password } = req.body;

  try {
    if (authorization){
      return getAuthTokenId(req,res)
    } else {
      const user = await handleSignin(email, password, db, bcrypt)

      if(user && user.id && user.email){
        const session = await createSessions(user)
        return res.json(session);
      } else {
        throw new Error ('Invalid user data')
      }
    } 
  } catch (err){
    err => res.status(400).json(err.message);
  }

};

module.exports = {
  signinAuthentication
}
