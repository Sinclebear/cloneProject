const express = require('express');
const router = express.Router();
require('dotenv').config();
const Users = require('../models/userSchema');
const authmiddlewares = require('../middlewares/auth-middleware');

//호스트 등록
router.post('/host/regist', authmiddlewares, async (req, res) => {
    const {user_id} = res.locals.user;
        
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

//호스트 해제
router.post('/host/delete', authmiddlewares, async (req, res) => {
    const {user_id} = res.locals.user;
        
    if(res.locals.user.host_cert === false) {
        res.send({                      
            fail: "호스트로 등록되어있지 않은 계정입니다.."
        });
        return;
    }
    await Users.findOneAndUpdate({user_id: user_id}, {host_cert: false});
        res.send({
            success: "호스트 해제 성공"
        });
});

module.exports = router;