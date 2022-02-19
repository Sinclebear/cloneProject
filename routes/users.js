const express = require('express');
const User = require('../models/userSchema');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authMiddlleware = require('../middlewares/auth-middleware');
require('dotenv').config();

const postUsersSchemas = Joi.object({
  user_id: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9가-힣]{3,30}$')),
  user_pwd: Joi.string().required().min(4).max(30),
  user_nick: Joi.string().required().min(4).max(10),
  confirmPassword: Joi.string().required().min(4).max(30),
});

// 회원가입구현
router.post('/signup', async (req, res) => {
  try {
    const { user_id, user_nick, user_pwd, confirmPassword } =
      await postUserSchemas.validateAsync(req.body);
    if (user_pwd !== confirmPassword) {
      res.status(400).send({
        errorMessage: '비밀번호를 확인해주세요.',
      });
      return;
    }
    if (user_id === password) {
      res.status(400).send({
        errorMessage: '아이디와 비밀번호가 동일하면 안됩니다.',
      });
      return;
    }

    const existUsers = await User.find({ user_id });
    if (existUsers.length) {
      res.status(400).send({
        errorMessage: '이미 가입된 아이디입니다.',
      });
      return;
    }
    const user = new User({ user_id, user_pwd, user_nick });
    await user.save();

    res.status(201).send({});
  } catch (err) {
    res.status(400).send({
      errorMessage: '요청한 형식이 올바르지 않습니다.',
    });
  }
});

const postAuthSchemas = Joi.object({
  nickname: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9가-힣]{3,30}$')),
  password: Joi.string().min(4).max(30),
});

// 로그인 구현
router.post('/login', async (req, res) => {
  try {
    const { user_id, user_pwd } = await postAuthSchemas.validateAsync(
      req.body
    );

    const user = await User.findOne({ user_id }).exec();

    if (!user) {
      res.status(400).send({
        errorMessage: '닉네임 또는 패스워드가 잘못됐습니다.',
      });
      return;
    }

    user.comparePassword(req.body.user_pwd, (err, isMatch) => {
      if (!isMatch) {
        return res.status(400).send({
          errorMessage: '닉네임 또는 패스워드가 잘못됐습니다.',
        });
      }
    });

    if (user_id === user_pwd) {
      res.status(400).send({
        errorMessage: '닉네임과 비밀번호가 같습니다.',
      });
      return;
    }

    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.SECRET_KEY
    );
    res.send({
      token,
    });
  } catch (error) {
    res.status(400).send({
      errorMessage: '요청한 형식이 올바르지 않습니다.',
    });
  }
});

// 사용자인증 미들웨어
router.get('/auth', authMiddlleware, async (req, res) => {
  const { user } = res.locals;
  res.send({
    user: {
      user_id: user.user_id,
    },
  });
});

module.exports = router;