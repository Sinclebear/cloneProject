const express = require('express');
const router = express.Router();
require('dotenv').config();
const Homes = require('../models/homeSchema');
const authmiddlewares = require('../middlewares/auth-middleware');



module.exports = router;