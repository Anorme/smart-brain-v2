const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
require('dotenv').config();

const register = require('./controllers/registerController');
const signin = require('./controllers/signinController');
const profile = require('./controllers/profileController');
const image = require('./controllers/imageController');
const auth = require('./middleware/authMiddleware');
const authController = require('./controllers/authController');

const db = knex({ 
  // connect to your own database here:
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan('combined'));
app.use(cors())
app.use(express.json()); 

console.log('Server is running now');

app.get('/', (req, res)=> { res.send('Welcome to the root route') })
app.post('/signin', signin.signinAuthentication(db, bcrypt))
app.post('/register', (req, res) => { register.register(req, res, db, bcrypt) })
app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db)})
app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db)})
app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res)})
app.post('/signout', (req, res) => {authController.signout(req,res)} )

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
