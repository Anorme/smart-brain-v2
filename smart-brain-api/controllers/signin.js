const jwt = require('jsonwebtoken');
const redis = require('redis');

//Setup Redis
const client = redis.createClient({ 
  url: process.env.REDIS_URI
});

//Handle connection errors
client.on('error', (err) => {
  console.log('Redis Client Error',err)
});

//Connect Redis client and test with seed data
(async () => {
  await client.connect();
  console.log('Redis client connected');
  await client.set('myKey', 'Active');
  const value = await client.get('myKey');
  console.log('Retrieved value:', value);
})()

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '2 days'});
};

const createSessions = async(user) => {
  // Create JWT token, return user data
  const { email, id } = user;
  const token = signToken(email);
  try {
    await setToken(token,id);
    return { success: 'true', userId: id, token }
  } catch (err) {
    console.log('Error setting session:', err)
    return { success: 'false', error: err}
  }
}

// Save JWT as a key with user id as the value in Redis
const setToken = async (key, value) =>{ 
  try {
    await client.set(key, value);
    return { success: true };
  } catch (err) {
    console.log('Error setting token:', err)
    return { success: false, error: err }
  }
};

// Get id from redis using authorization header value as key
const getAuthTokenId = async(req, res) => {
  const { authorization } = req.headers;
  const reply = await client.get(authorization);
  if (!reply) {
    res.status(400).json('unauthorised')
  } else {
    res.json({id: reply})
  }
  
}

// Find user in postgres database and return promise for signinAuthentication
const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        return Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId(req,res) : handleSignin(db, bcrypt, req, res)
    .then(data => {
      return data.id && data.email ? createSessions(data) : Promise.reject(data)
    })
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  signinAuthentication,
  redisClient: client
}
