// Find user in postgres database and return promise for signinAuthentication

const handleSignin = async (email, password, db, bcrypt) => {
  if (!email || !password) {
    throw new Error ('Incorrect form submission');
  }

  try {
    const loginData = await db.select('email', 'hash').from('login').where('email', '=', email);

    if (loginData.length === 0) {
      throw new Error ('Invalid email');
    }

    const isValid = bcrypt.compareSync(password, loginData[0].hash)

    if(isValid) {
      const user = await db.select('*').from('login').where('email', '=', email);

      if (user.length === 0) {
        throw new Error ('User not found');
      }
      return user[0];
    } else {
      throw new Error ('Incorrect credentials');
    }

  } catch(err){
    console.err('Error during sign in:', err.message);
    throw new Error('Unable to sign in')
  }
}

module.exports = {
  handleSignin,
}