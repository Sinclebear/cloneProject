const express = require('express');
const router = express.Router();
const authmiddlewares = require('../middlewares/auth-middleware');
const Comments = require('../models/commentSchema');

//후기 작성
router.post('/comment/save/write', authmiddlewares, async (req, res) => {
    const { user } = res.locals;
    console.log(user);
    const {comment, home_rate, home_name} = req.body;
    
    await Comments.create({user_nick: user.user_nick, comment, home_rate, home_name, createdAt: new Date()});

    res.json({
        success: '후기 작성이 완료되었습니다.'
    });
});


module.exports = router;