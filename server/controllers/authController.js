//this controoller handles logging in, registering, signing out & reading the user from req.session

const users = require('../models/users');

//global id variable
let id = 1;

module.exports = {
  register: (req, res) => {
    //should look for a username & password on the request body
    //then create a user object
    //should increment the global id by one
    //returns the updated user object with a status of 200
    const { session } = req;
    const { username, password } = req.body;

    users.push({ id, username, password });
    id++;

    session.user.username = username;
    res.status(200).send(session.user);
  },
  login: (req, res) => {
    //should use username & password on the req body to find a user object with the same combination
    //should update the value of username on the request session object
    //send the updated user object with the sattus of 200
    //or status of 500 if not there

    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      session.user.name = user.username;
      res.send(200).send(session.user);
    } else {
      res.status(500).send('Unauthorized');
    }
  },
  signout: (req, res) => {
    //method is responsible for destroying teh session & returning the session
    req.session.destroy();
    res.status(200).send(req.session);
  },
  getUser: (req, res) => {
    //responsible for reading the user object off of sesion & return it with a status of 200
    const { session } = req;
    res.status(200).send(session.user);
  },
};
