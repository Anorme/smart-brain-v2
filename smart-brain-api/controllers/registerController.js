const { createSessions } = require('../services/authService');
const { handleRegister } = require('../services/registerService')

const register = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  
  handleRegister(email, name, password, db, bcrypt)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  register,
};


