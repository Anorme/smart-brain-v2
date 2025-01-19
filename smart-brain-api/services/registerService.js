const handleRegister = async (email, name, password, db, bcrypt) => {
  if (!email || !name || !password) {
    throw new Error('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);

  return db.transaction(async (trx) => {
    try {
      const loginEmail = await trx('login')
        .insert({ hash, email })
        .returning('email');

      const user = await trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0].email,
          name,
          joined: new Date()
        })
      await trx.commit();
      return user[0];
    } catch (error){
      await trx.rollback()
      throw new Error ('Unable to register');
    }
  });
};

module.exports = {
  handleRegister
}