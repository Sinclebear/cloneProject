const express = require('express');
const router = express.Router();
require('dotenv').config();
const Homes = require('../models/homeSchema');
const authmiddlewares = require('../middlewares/auth-middleware');

router.get("/main", async (req, res) => {
  // console.log("음메");
  const homes = await Homes.find().exec();
  // console.log("냐옹");
  res.send({ homes });
  console.log('숙소 목록을 보냈습니다.')
});

router.post('/hosting', authmiddlewares, async (req, res) => {
  const { user } = res.locals;
  console.log(user);
  const {home_name, category, address, image_url, introduce, price, convenience, distance, availableDate, } = req.body;
  
  await Homes.create({home_name, category, address, image_url, introduce, price, convenience, distance, availableDate, createdAt: new Date(), updatedAt: new Date()});
  
  res.send({
      success: '숙소 등록이 완료되었습니다.'
  });
});




module.exports = router;