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
})();

module.exports = client;

