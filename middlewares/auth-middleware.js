const jwt = require("jsonwebtoken");
const users = require('../models/userSchema');
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    // console.log('authorization', authorization);
    if (!authorization){
        res.send({
            ok: false,
            result: "auth-middleware 사용자 인증 실패. 인증 토큰이 비어있습니다.", 
            headers: req.headers
        })
        return
    }
    const [tokenType, tokenValue] = authorization.split(' ');
    
    // console.log(tokenValue);
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }

    try {
        const {userId} = jwt.verify(tokenValue, `${jwtSecret}`);
        console.log('userId:', userId);
        users.findOne({user_id:user_id}).exec().then((user) => {
            res.locals.user = user;
            // console.log(res.locals.user);
            next();
        });
    } catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }
};