const mongoose = require("mongoose");

const outcomeSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    categoryIconName: String
  },
  { timestamps: true }
);

const Outcome = mongoose.model("Outcome", outcomeSchema);

module.exports = Outcome;
