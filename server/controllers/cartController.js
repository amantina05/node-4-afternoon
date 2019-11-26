const swag = require('../models/swag');

module.exports = {
  add: (req, res) => {
    //should use the id to see if its already in the user cart on session
    //if it is send status 200 & the req sess user obj
    //else find swag from models/swag using the id & add it to the cart
      //add price
      //send a status of 200 & the req sess user obj
    cosnt { id } = req.params
    let { user } = req.session

    //this returns -1 if its not in the cart
    const index = user.cart.findIndex(swag => swag.id == id)

    if (index === -1) {
      const selectdSwag = swag.find(swag => swag.id == id)
      user.cart.push(selectdSwag)
      user.total += selectdSwag.price
    } else {
      res.status(200).send(user)
    }

  },
  delete: (req, res) => {
    //should check if the swag is in the cart
    //if it is remove the swag & subtract the price from the total
    //if it isnt dont do anything
      //return a status of 200 & req sess users obj
    const { id } = req.params
    const { user } = req.session

    //this returns -1 if its not in the cart
    const index = user.cart.findIndex(swag => swag.id == id)
    const selectedSwag = swag.find(swag => swag.id == id)

    if(index !== -1){
      user.cart.splice(index, 1)
      user.total -= selectedSwag.price
    } else {
      res.status(200).send(user)
    }
  },
  checkout: (req, res) => {
    //resets the value of the cart to an empty array & total 0
    //send a status of 200 & sess users obj
    const { user } = req.session
    user.cart = []
    user.total = 0

    res.status(200).send(user)
  }
}
