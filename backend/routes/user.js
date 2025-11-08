const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;