const mongoose = require('mongoose');
const Component = mongoose.model('Component');

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getComponents = (req, res) => {
  Component.aggregate([
    {
      $lookup: {
        from: "materials",
        localField: "pn",
        foreignField: "pn",
        as: "details"
      }
    }, {
      $sort: {
        pn: 1
      }
    }
  ]).exec((err, cables) => {
    if(err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    sendJsonResponse(res, 200, cables);
  });
};

module.exports.getDepts = (req, res) => {
  Component.find().distinct('dept', (err, depts) => {
    if(err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    depts.sort();
    sendJsonResponse(res, 200, depts);
  });
};
