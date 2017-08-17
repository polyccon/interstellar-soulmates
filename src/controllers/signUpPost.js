const { sign } = require('./passwordModule')();
const errors = require('../dictionary/errorMessages');
const signUp = require('./../model/signUp');


module.exports = (req, res) => {
  const hashedPassword = sign(req.body.password);
  // TODO: check if email already in db
  if (req.body.password !== req.body.confirmPassword) {
      res.status(400).send(errors[400]);
  }
  else {
    signUp(req.body.email, hashedPassword, (err) => {
      if (err) {
        res.status(500).send(errors[500]);
      } else {
        res.redirect('/edit-profile');
      }
    });
  }
};
