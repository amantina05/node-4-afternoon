require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('server/middlewares/checkForSession.js');
const swagController = require('./controllers/swagController');
const authController = require('./authController.js');
const cartController = require('./cartController.js');
const searchController = require('./searchController.js');

const app = express();

//creating .env
let { SERVER_PORT, SESSION_SECRET } = process.env;

//adding middleware to the app
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//adding checkForSession
app.use(checkForSession);

//endpoint
//making a get endpoint at api/swag that calls the read method on our swagcontroller
app.get('api/swag', swagController.read);
//auth endpoints
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);
//cart endpoints
app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart/:id', cartController.add);
app.delete('/api/cart/:id', cartController.delete);
//search endpoints
app.get('/api/search', searchController.search);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
