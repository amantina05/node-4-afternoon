const swag = require('../models/swag.js');

module.exports = {
  search: (req, res) => {
    //should look at the req query for a category
    //if no category return status of 200 & entire swag arr
    //if yes filter swag arr by category adn return filtered swag arr
    const { category } = req.query;

    if (!category) {
      res.send(200).staus(swag);
    } else {
      const filteredSwag = swag.filter(swag => swag.category === category);
      res.send(200).status(filteredSwag);
    }
  },
};
