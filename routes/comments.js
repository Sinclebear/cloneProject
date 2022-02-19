const express = require('express');
const router = express.Router();
const authmiddlewares = require('../middlewares/auth-middleware');
const Comments = require('../models/commentSchema');
const Homes = require('../models/homeSchema');

//후기 목록 전달
router.get('/comment/:homeId', async (req, res) => {
    const {homeId} = req.params;

    const comment_list = await Comments.find({home_id: homeId}).populate('home_id', '_id').exec();
    console.log(comment_list);
    
    res.json({
        comment_list: comment_list
    });
});


//후기 작성
router.post('/comment/save/write/:homeId', authmiddlewares, async (req, res) => {
    const { user } = res.locals;
    console.log(user);
    const {comment, home_rate, home_name} = req.body;
    
    await Comments.create({user_nick: user.user_nick, comment, home_rate, home_name, home_id: req.params.homeId, createdAt: new Date()});

    res.send({
        success: '후기 작성이 완료되었습니다.'
    });
});

//후기 수정
router.patch('/comment/:commentId', authmiddlewares, async (req, res) => {
    const {commentId} =req.params;
    const {comment, home_rate} = req.body;

    await Comments.findByIdAndUpdate({_id: commentId}, {comment, home_rate});
    res.send({
        success: '후기 수정이 완료되었습니다.'
    });
});


//후기 삭제
router.delete('/comment/:commentId', authmiddlewares, async (req, res) => {
    const {commentId} = req.params;
    await Comments.deleteOne({_id: commentId});
    res.send({
        success: '후기 삭제가 완료되었습니다.'
    });
});



module.exports = router;