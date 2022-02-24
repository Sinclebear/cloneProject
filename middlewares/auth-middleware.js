const jwt = require("jsonwebtoken");
const users = require('../models/userSchema');
const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization){
        res.send({
            fail: "authmiddlewares 사용자 인증 실패. 인증 토큰이 비어있습니다. 이하 headers 내용:", 
            headers: req.headers
        })
        return
    }
    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenType !== 'Bearer') {
        res.send({
            fail: '로그인 후 사용하세요.',
        });
        return;
    }

    if (tokenValue === 'null') { // 비회원인 경우, res.locals.user 를 빈값으로 설정해 전달.
        res.locals.user = ''
        next();
        return;
    }

    try {
        // 토큰값이 유효하지 않은 케이스 체크
        const {user_id} = jwt.verify(tokenValue, `${jwtSecret}`);
        
        users.findOne({user_id}).exec().then((user) => {
            res.locals.user = user;           
            next();
        });
    } catch (error) {
        res.send({
            fail: '토큰이 유효하지 않습니다. 로그인 후 사용하세요', // 추후 변경 필요. 실제 유저 사용 레벨에선, 토큰 유효 여부 알려줄 필요 없음.
        });
        return;
    }
};