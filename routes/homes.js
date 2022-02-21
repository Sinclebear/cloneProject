const express = require('express');
const router = express.Router();
require('dotenv').config();
const Homes = require('../models/homeSchema');
const authmiddlewares = require('../middlewares/auth-middleware');

router.get("/homes", async (req, res) => {
  // console.log("음메");
  const homes = await Homes.find().exec();
  // console.log("냐옹");
  res.send({ homes });
  console.log('숙소 목록을 보냈습니다.')
});


router.get("/homes/?category=%category%", async (req, res) => {
  const received_categori = req.params;

  const homes = await Homes.find({"category": received_categori}).exec();
  
  res.send({ homes });
  console.log('카테고리별 숙소 목록을 보냈습니다.')
});

router.get("/homes/:homes_id", async (req, res) => {
  const homes_id = req.params;

  // const homes = await Homes.find({"_id": homes_id}).exec();
  const homes = await Homes.findById(req.params.homes_id);
  
  res.send({ homes });
  console.log('해당 숙소의 상세페이지를 보냈습니다.')
});

//숙소 등록
router.post('/hosting', authmiddlewares, async (req, res) => {
  const { host_cert } = res.locals.user
  console.log(host_cert);

  if(host_cert === false) {
    res.send({
      fail: '호스트 권한이 없는 계정입니다.'
    });
    return;
  }  

  const {home_name, category, address, image_url, introduce, price, convenience, distance, availableDate} = req.body;
  
  await Homes.create({home_name, category, address, image_url, introduce, price, convenience, distance, availableDate, host_name: res.locals.user.user_id , createdAt: new Date(), updatedAt: new Date()});
  
  res.send({
      success: '숙소 등록이 완료되었습니다.'
  });
});

module.exports = router;