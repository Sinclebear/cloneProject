const express = require('express');
const router = express.Router();
require('dotenv').config();
const Homes = require('../models/homeSchema');
const Users = require('../models/userSchema');
const authmiddlewares = require('../middlewares/auth-middleware');

//호스트 등록
router.post('/host/regist', authmiddlewares, async (req, res) => {
    console.log(res.locals.user.host_cert);
    const {user_id} = res.locals.user;
    console.log(user_id);
    
    if(res.locals.user.host_cert === true) {
        res.send({                      
            fail: "이미 호스트로 등록되어있는 계정입니다."
        });
        return;
    }
    await Users.findOneAndUpdate({user_id: user_id}, {host_cert: true});
        res.send({
            success: "호스트 등록 성공"
        });
});

module.exports = router;



// //후기 작성
// router.post('/comment/save/write/:homeId', authmiddlewares, async (req, res) => {
//     const { user } = res.locals;
//     console.log(user);
//     const {comment, home_rate, home_name} = req.body;
    
//     await Comments.create({user_nick: user.user_nick, comment, home_rate, home_name, home_id: req.params.homeId, createdAt: new Date()});

//     res.send({
//         success: '후기 작성이 완료되었습니다.'
//     });
// });