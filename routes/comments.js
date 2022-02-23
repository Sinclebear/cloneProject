const express = require('express');
const router = express.Router();
const authmiddlewares = require('../middlewares/auth-middleware');
const Comments = require('../models/commentSchema');
const Homes = require('../models/homeSchema');
const Users = require('../models/userSchema');

//후기 목록 전달
router.get('/comment/:homeId', async (req, res) => {
    const {homeId} = req.params;

    const comment_list = await Comments.find({home_id: homeId}).populate('home_id', 'id comment_count').exec();
    
    res.json({
        comment_list: comment_list
    });
});


//후기 작성
router.post('/comment/save/write/:homeId', authmiddlewares, async (req, res) => {
    const { user } = res.locals;
    const { homeId } = req.params;
    // console.log(user);
    const {comment, home_rate, home_name} = req.body;
    
    await Comments.create({user_nick: user.user_nick, comment, home_rate, home_name, home_id: homeId});
    await Homes.findByIdAndUpdate({ _id: homeId }, { $inc: { comment_count: 1 } });

    res.send({
        success: '후기 작성이 완료되었습니다.'
    });
});

//후기 수정
router.patch('/comment/:commentId', authmiddlewares, async (req, res) => {
    const {commentId} =req.params;
    const {comment, home_rate} = req.body;
    const { user } = res.locals;
    
    const existUsers = await Comments.findById({_id: commentId});   
    if (existUsers.user_nick !== user.user_nick) {
        res.send({
            fail: '후기를 작성한 사용자가 아닙니다.'
        });
        return;
    }
    
    await Comments.findByIdAndUpdate({_id: commentId}, {comment, home_rate});
    res.send({
        success: '후기 수정이 완료되었습니다.'
    });
});


//후기 삭제
router.delete('/comment/:commentId', authmiddlewares, async (req, res) => {
    const {commentId} = req.params;
    const { homeId } = req.body;
    const { user } = res.locals;

    console.log('user_nick', user.user_nick);
    console.log('commentId', commentId);

    const existUsers = await Comments.findById({_id: commentId});
    console.log(existUsers.user_nick);
    
    // if (existUsers.user_nick !== user.user_nick) {
    //     res.send({
    //         fail: '후기를 작성한 사용자가 아닙니다.'
    //     });
    //     return;
    // }
    
    await Comments.deleteOne({_id: commentId});
    // await Homes.findByIdAndUpdate({ _id: homeId }, { $inc: { comment_count: -1 } });
    res.send({
        success: '후기 삭제가 완료되었습니다.'
    });
});



module.exports = router;