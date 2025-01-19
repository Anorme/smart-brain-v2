const { handleRegister } = require('../services/registerService');
const { createSessions } = require('../services/authService');

const register = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  console.log('Register endpoint hit:', req.body);

  try {
    const user = await handleRegister(email, name, password, db, bcrypt);

    if (user && user.id && user.email) {
      const session = await createSessions(user);
      res.json(session); 
    } else {
      throw new Error('Invalid user data');
    }
  } catch (err) {
    console.error(`Failed to register user: ${err.message}`);
    res.status(400).json(err.message);
  }
}

module.exports = {
  register,
};
