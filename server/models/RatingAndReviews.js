const mongoose = require("mongoose");

const ratingAndReviewsSchema = new mongoose.Schema({

   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true,
   },
   rating:{
    type: Number,
    required: true,
   },
   reviews: {
    type: String,
    required: true,
   },
   course: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Course",
    required: true,
   }

});


module.exports = mongoose.model("RatingAndReview",ratingAndReviewsSchema);