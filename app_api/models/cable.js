const mongoose = require('mongoose');
const cableSchema = new mongoose.Schema({
  pn: {type: String, required: true},
  dept: {type: String, required: true},
  mfr: {type: String, required: true},
  type: {type: String, required: true},
  shield: {type: String, required: true},
  color: {type: String, required: true},
  legend: {type: String, required: true},
  ss: {type: Number, "default": 0}
});

mongoose.model('Cable', cableSchema);
