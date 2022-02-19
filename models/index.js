const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("mongodb://test:test@54.180.81.174:27017/airbnb_clonedb?authSource=admin", {
  // mongoose.connect("mongodb://localhost/cloneProj", {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
};

//ec2 데이터베이스
// const connect = () => {
//     mongoose
//         .connect(process.env.AWS_MONGO_DB, { // .env 내 AWS_MONGO_DB 참조
//             ignoreUndefined: true,
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// };

module.exports = connect;
