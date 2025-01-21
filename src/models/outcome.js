const mongoose = require("mongoose");

const outcomeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    categoryImage: {
      type: String,
      required: true,
    },
    categoryName: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
);

const outComeModel = mongoose.model("Outcome", outcomeSchema);

module.exports = outComeModel;
