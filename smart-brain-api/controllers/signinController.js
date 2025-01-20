const { getAuthTokenId } = require('./authController')
const { createSessions } = require('../services/authService');
const { handleSignin } = require('../services/signinService')

// Find user in postgres database and return promise for signinAuthentication
const signin = async (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  
  const user = await handleSignin(email, password, db, bcrypt);
  return user;
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req,res) : signin(db, bcrypt, req, res)
    .then(data => {
      return data.id && data.email ? createSessions(data) : Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  signinAuthentication
}
