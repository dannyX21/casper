const mongoose = require('mongoose');
let simulationSchema = new mongoose.Schema({
  pn: { type: String, index: true, required: true },
  um: { type: String, 'default': 'EA', required: true },
  dept: { type: String, required: false },
  desc: { type: String, required: false },
  mfr: { type: String, required: false },
  type: { type: String, required: false },
  shield: { type: String, required: false },
  color: { type: String, required: false },
  legend: { type: String, required: false },
  up: { type: Number, 'default': 0 },
  lt: { type: Number, 'default': 1 },
  tt: { type: Number, 'default': 1 },
  ew: { type: Number, 'default': 2 },
  ss: { type: Number, default: 0 },
  history: [Number],
  method: {type: String, required: true },
  rmse: { type: Number, required: true },
  predicted: { type: Number, 'default': 0 }
});

mongoose.model('Simulation', simulationSchema);
