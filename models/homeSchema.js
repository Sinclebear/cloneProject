const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  home_name: {
      type: String,
      default:"",
  }, 
  rateAvg: {
    type: String,
    default:"",
  },
  review: {
    type: String,
    default:"",
  },
  address: {
    type: String,
    default:"",
  },
  image_url: {
    type: String,
    default:"",
  },
  introduce: {
    type: String,
    default:"",
  },
  price: {
    type: Number,
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