const express = require('express');
const router = express.Router();
require('dotenv').config();
const Homes = require('../models/homeSchema');
const authmiddlewares = require('../middlewares/auth-middleware');



//메인페이지 카테고리별 DB 공급
router.get("/homes", async (req, res) => {
  const received_categori = req.query.category;
  console.log(received_categori);

  const homes = await Homes.find({"category": received_categori}, {_id: 1, category: 1, address: 1, image_url: 1, price: 1, distance: 1, availableDate: 1}).exec();
  // const homes = await Homes.find({"category": received_categori}, {availableDate: true}).exec();
  
  res.send({ homes });
  console.log('카테고리별 숙소 목록을 보냈습니다.')
});

// - 숙소ID `HomesId` String
// - 집 종류 `category` String
// - 숙소 주소 `address` String
// - 이미지URL `image_url[]` Array [String]
// - 1박당 비용 `price` Number
// - 내가 위치한 곳 기준 거리 `distance` Number
// - 숙박 가능 기간 `availableDate` String

router.get("/homes/:homes_id", async (req, res) => {
  const { homes_id }  = req.params;
  console.log(req.params)

  // const homes = await Homes.find({"_id": homes_id}).exec();
  const homes = await Homes.findById(homes_id);
  
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