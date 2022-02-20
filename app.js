require("dotenv").config();
const express = require("express");
const connect = require("./models");
const cors = require("cors");
const app = express();
const router = express.Router();
const Homes = require('./models/homeSchema');


const port = 3000;
const booking_router = require('./routes/booking');
const comments_router = require('./routes/comments');
const users_router = require('./routes/users');
const home_router = require('./routes/homes');
const likes_router = require('./routes/likes');


const requestMiddlware = (req, res, next) => {
  console.log("Request URL:", req.originalUrl, "-", new Date());
  next();
};

connect()

// jwt.verify(tokenValue, process.env.JWT_SECRET);

app.use(cors());
app.use(requestMiddlware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', [booking_router, comments_router, users_router, home_router, likes_router]);


app.listen(port, () => {
  console.log(`http://localhost:${port}에 접속되었습니다.`);
});
