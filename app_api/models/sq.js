const mongoose = require('mongoose');

const missingMats = new mongoose.Schema({
  pn: {type: String, required: true},
  delDate: {type: Date, required: false}
});

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  comment: { type: String, required: true},
  date: { type: Date, required: true, "default": Date.now}
});

const sqSchema = new mongoose.Schema({
  dept: {type: String, required: true},
  fac: {type: Number, required: true},
  sqd: {type: String, required: true, unique: true},
  salesPerson: {type: String, required: true},
  pn: {type: String, required: true},
  lpn: {type: String, required: false},
  customer: {type: String, required: true},
  addDate: {type: Date, required: true},
  status: {type: String, required: true},
  reqDelDate: {type: Date, required: true},
  reqShipDate: {type: Date, required: true},
  qty: {type: Number, required: true, min: 0},
  oType: {type: String, required: true},
  po: {type: String, required: true},
  okMats: {type: Boolean, required: false},
  missingMats: [missingMats],
  revBy: {type: String, required: false},
  revOn: {type: Date, required: false},
  confDate: {type: Date, required: false},
  confBy: {type: String, required: false},
  confOn: {type: Date, required: false},
  comments: [commentSchema]
});

mongoose.model('Sq', sqSchema);
