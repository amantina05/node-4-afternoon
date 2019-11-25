//exporting a function
module.export = function(req, res, next) {
  //checking to see of the session has a user object or not
  //destructor session from req
  const { session } = req;
  if (!session.user) {
    //if it does not have it add it to the session
    session.user = { username: '', cart: [], total: 0 };
  } else {
    //if it does, call next
    next();
  }
};
