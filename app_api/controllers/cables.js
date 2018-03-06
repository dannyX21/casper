const mongoose = require('mongoose');
const Cable = mongoose.model('Cable');

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getCables = (req, res) => {
  Cable.aggregate([
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
  Cable.find().distinct('dept', (err, depts) => {
    if(err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    depts.sort();
    sendJsonResponse(res, 200, depts);
  });
};

module.exports.getMfrs = (req, res) => {
  Cable.find().distinct('mfr', (err, mfrs) => {
    if(err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    mfrs.sort();
    sendJsonResponse(res, 200, mfrs);
  });
};

module.exports.getTypes = (req, res) => {
  Cable.find().distinct('type', (err, depts) => {
    if(err) {
      sendJsonResponse(res, 400, err);
      return;
    }
    depts.sort();
    sendJsonResponse(res, 200, depts);
  });
};
