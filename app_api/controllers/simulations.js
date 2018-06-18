const mongoose = require('mongoose');
const Simulation = mongoose.model('Simulation');

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getSimData = (req, res) => {
  if(!req.params || !req.params.pn) {
    sendJsonResponse(res, 400, {
      message: "P/N not included in request."
    });
    return;
  };
  const pn = req.params.pn;
  Simulation.findOne({pn: pn}).exec((err, data) => {
    if(err) {
      sendJsonResponse(res, 404, {
        message: err
      });
      return;
    }
    sendJsonResponse(res, 200, data);
  });
};

module.exports.getSimPNs = (req, res) => {
  Simulation.find().select("-_id pn").exec((err, data) => {
    if(err) {
      sendJsonResponse(res, 404, {
        message: err
      });
      return;
    }
    sendJsonResponse(res, 200, data)
  });
};
