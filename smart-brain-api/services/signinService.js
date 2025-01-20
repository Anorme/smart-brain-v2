const handleSignin = async (email, password, db, bcrypt) => {
  if (!email || !password) {
    throw new Error ('Incorrect form submission');
  }

  try {
    const loginEmail = await db.select('email', 'hash').from('login').where('email', '=', email);
    const isValid = bcrypt.compareSync(password, loginEmail[0].hash)

    if(isValid) {
      const user = await db.select('*').from('login').where('email', '=', email);
      return user[0]
    } else {
      throw new Error ('Incorrect credentials')
    }

  } catch(err){
    throw new Error('Unable to sign in')
  }
}

module.exports = {
  handleSignin,
}