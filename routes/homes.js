const express = require('express');
const router = express.Router();
require('dotenv').config();
const Homes = require('../models/homeSchema');

router.get("/main", async (req, res) => {
  // console.log("음메");
  const homes = await Homes.find().exec();
  // console.log("냐옹");
  res.send({ homes });
  console.log('숙소 목록을 보냈습니다.')
});


module.exports = router;