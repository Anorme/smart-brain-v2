const { handleRegister } = require('../services/registerService');
const { createSessions } = require('../services/authService');

const register = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  console.log('Register endpoint hit:', req.body);

  try {
    const user = await handleRegister(email, name, password, db, bcrypt);
    console.log('Returned user object:', user); // Log the returned user object

    if (user && user.id && user.email) {
      console.log('User object is valid'); // Additional check to confirm user object is valid
      const session = await createSessions(user);
      console.log('Session created:', session); // Log session
      res.json(session); // Return session in response
    } else {
      throw new Error('Invalid user data');
    }
  } catch (err) {
    console.error(`The final boss: ${err.message}`); // Log the error
    res.status(400).json(err.message);
  }
}

module.exports = {
  register,
};
