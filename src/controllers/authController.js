const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

// resgistration
router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {

    // if user exists
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exists' });

    // if user not exists
    const user = await User.create(req.body);

    // remove the user password from the response
    user.password = undefined;

    return res.send({ user });
  } catch (error) {
    return res.status(400).send({ error: 'Registration failed!'});
  }
})

// authentication
router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  //  finding the user with password
  const user = await User.findOne({ email }).select('+password');

  if (!user)
    return res.status(400).send({ error: 'User not found!'});

  // compare the password (digited and saved) with promisse
  bcrypt.compare(password, user.password).then(match => {
    if(!match)
      return res.status(400).send({ error: 'Invalid password!'});

    // remove the user password from the response
    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400,
    });

    return res.status(200).send({ user, token });
  });
})

module.exports = app => app.use('/auth', router);
