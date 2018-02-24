const mongoose = require('mongoose');
const componentSchema = new mongoose.Schema({
  pn: {type: String, required: true },
  dept: {type: String, required: true},
  description: {type: String, required: true},
  um: {type: String, required: true},
  ss: {type: Number, "default": 0}
});

mongoose.model('Component', componentSchema);
