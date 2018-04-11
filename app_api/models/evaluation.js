const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  number: {type: Number, required: true},
  name: {type: String, required: true},
  q1: {type: String, required: true, "default": 0},
  q2: {type: String, required: true, "default": 0},
  q3: {type: String, required: true, "default": 0},
  d1: {type: String, required: true, "default": 0},
  d2: {type: String, required: true, "default": 0},
  d3: {type: String, required: true, "default": 0}
});

const evaluationSchema = new mongoose.Schema({
  period: {type: String, required: true},
  date: {type: Date, "default": Date.now },
  vendors: [vendorSchema]
});

mongoose.model("Evaluation", evaluationSchema);
