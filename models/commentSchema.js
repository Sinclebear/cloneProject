const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_nick: {
    type: String,
    default: "",
  },
  comment: {
    type: String,
    default: "",
  },
  home_rate: {
    type: Number,
    default: "",    
  },
  home_name: {
    type: String,
    default: "",    
  },  
  home_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Homes"
  }
},
{ timestamps: true }
);

commentSchema.virtual("CommentsId").get(function () {
  return this._id.toHexString();
});

commentSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Comments", commentSchema);
