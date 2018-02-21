const mongoose = require('mongoose');
let orderSchema = new mongoose.Schema({
  so: {type: Number, "default": 0},
  type: {type: String},
  entryDate: {type: Date, required: true},
  customerId: {type: Number},
  customer: {type: String},
  pn: {type: String, required: true},
  rev: {type: String, required: false},
  lpn: {type: String, required: false},
  qtyOrdered: {type: Number, "default": 0},
  qtyPcs: {type: Number, "default": 0},
  promDate: {type: Date, required: true},
  belDate: {type: Date, required: true},
  reqDate: {type: Date, required: true},
  qtyShipped: {type: Number, "default": 0},
  qtyBalance: {type: Number, required: true},
  unitPrice: {type: Number, required: true},
  balPrice: {type: Number, required: true},
  sq: {type: String, required: false},
  po: {type: String, required: false},
  permLoc: {type: String, required: true},
  comments: {type: String, required: false}
});

mongoose.model('Order', orderSchema);
