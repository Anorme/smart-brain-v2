const handleRegister = async (email, name, password, db, bcrypt) => {
  if (!email || !name || !password) {
    throw new Error('Incorrect form submission');
  }

  const hash = bcrypt.hashSync(password);

  try {
    const loginEmail = await db('login')
      .insert({ hash, email })
      .returning('email');

    const users = await db('users')
      .returning('*')
      .insert({
        email: loginEmail[0].email,
        name,
        joined: new Date()
      });

    const user = users[0];

    return user;
  } catch (error) {
    throw new Error('Unable to register');
  }
};

module.exports = {
  handleRegister,
};
