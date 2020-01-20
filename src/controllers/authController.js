const express = require('express');

const User = require('../models/user');

const router = express.Router();

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
    return res.status(400).send({ error: 'Registration failed!'})
  }
})

module.exports = app => app.use('/auth', router);
