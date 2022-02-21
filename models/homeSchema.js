const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  home_name: {
      type: String,
      default:"",
  }, 
  host_name: {
    type: String,
    default:"",
  }, 
  category: {
    type: String,
    default:"",
  },
  rateAvg: {
    type: Number,
    default:0,
  },
  comment_count: {
    type: Number,
    default:0,
  },
  address: {
    type: String,
    default:"",
  },
  image_url: {
    type: [String], // string array 형태이므로 변경. default도 뺌.
  },
  introduce: {
    type: String,
    default:"",
  },
  price: {
    type: Number,
    default:0,
  },
  convenience: {
    type: [String], // string array 형태이므로 변경. default도 뺌.
  },
  distance: {
    type: Number,
    default:0,
  },
  availableDate: {
    type: String,
    default:"",
  }
});

homeSchema.virtual("HomesId").get(function () {
  return this._id.toHexString();
});

homeSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Homes", homeSchema);