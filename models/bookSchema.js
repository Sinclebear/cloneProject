const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  home_name: {
    type: String,    
    default: "",
  },
  adults: {
    type: String,    
    default: "",
  },
  children: {
    type: String,    
    default: "",
  },
  infants: {
    type: String,    
    default: "",
  },
  pets: {
    type: String,    
    default: "",
  },
  checkinDate: {
    type: Date,    
    default: "",
  },
  chekckOutDate: {
    type: Date,    
    default: "",
  },
  costs: {
    type: Number,    
    default: "",
  },
  user_id: {
    type: String,    
    default: "",
  },
});

bookSchema.virtual("BooksId").get(function () {
  return this._id.toHexString();
});

bookSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Books", bookSchema);
