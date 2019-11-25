const swag = require('../models/swag');

module.exports = {
  //this method capitures req and res as parameters
  read: (req, res) => {
    //sending a status of 200 to the entire swag array
    res.status(200).send(swag);
  },
};
