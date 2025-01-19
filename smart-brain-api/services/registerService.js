const handleRegister = async (email, name, password, db, bcrypt) => {
  if (!email || !name || !password) {
    throw new Error('Incorrect form submission');
  }

  const hash = bcrypt.hashSync(password);

  try {
    const loginEmail = await db('login')
      .insert({ hash, email })
      .returning('email');

    console.log('loginEmail:', loginEmail); // Debugging log

    const users = await db('users')
      .returning('*')
      .insert({
        email: loginEmail[0].email,
        name,
        joined: new Date()
      });

    const user = users[0];
    console.log('User before return:', user); // Debugging log

    return user;
  } catch (error) {
    console.error('Error during registration:', error.message); // Debugging log
    throw new Error('Unable to register');
  }
};

module.exports = {
  handleRegister,
};
