const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
  pn: {type: String, required: true, unique: true},
  invType: {type: String, required: true},
  description: {type: String, required: true},
  qtyOH: {type: Number, "default": 0},
  permLoc: {type: String},
  qtyAllocated: {type: Number, "default": 0},
  qtyOnOrder: {type: Number, "default": 0},
  qtyWO: {type: Number, "default": 0},
  qtyGR:  {type: Number, "default": 0},
  balance:  {type: Number, "default": 0},
  ss: {type: Number, "default": 0},
  usageMonth:  {type: Number, "default": 0},
  qtyMissing: {type: Number, "default": 0}
});

mongoose.model('Material', materialSchema);
