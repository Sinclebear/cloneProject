const express = require('express')
const Likes = require('../models/likeSchema')
const router = express.Router()
const authMiddleware = require('../middlewares/auth-middleware')

// 숙소 찜하기
router.post('/homes/:home_id/likes', authMiddleware, async (req, res) => {
    const { home_id } = req.params
    let { user } = res.locals
  
    // 이미 찜하기를 누른 경우
    const existLike = await Likes.findOne({ home_id:home_id, user_id:user.user_id })
    if (existLike) {
      return res.status(400).json({
        fail: '이미 찜한 숙소입니다.',
      })
    }
  
    const like = new Likes({ home_id:home_id, user_id:user.user_id })
    await like.save()
    res.status(201).send({
        success: "찜하기를 완료하였습니다."
    })
})

// 찜한 숙소 취소하기
router.delete('/homes/:home_id/likes', authMiddleware, async (req, res) => {
    const { home_id } = req.params
    let { user } = res.locals
  
    await Likes.deleteOne({ home_id:home_id, user_id:user.user_id })
    res.status(200).send({
        success: "찜한 숙소를 취소하였습니다." 
    })
})

module.exports = router;