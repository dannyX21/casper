const mongoose = require('mongoose');
const Evaluation = mongoose.model('Evaluation');

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getPeriods = (req, res) => {
  Evaluation.find().select("period date").sort("-date").exec((err, evaluations) => {
    if(err) {
      console.log(err);
      sendJsonResponse(res, 404, {
        message: err
      });
      return;
    }
    sendJsonResponse(res, 200, evaluations);
  });
};

module.exports.getEvaluation = (req, res) => {
  if(!req.params || !req.params.period) {
    sendJsonResponse(res, 400, {
      message: "Evaluation period not included in request."
    });
    return;
  }
  const period = req.params.period;
  Evaluation.findOne({period: period}).exec((err, evaluation) => {
    if(err) {
      sendJsonResponse(res, 404, {
        message: err
      });
      return;
    }
    sendJsonResponse(res, 200, evaluation);
  });
};
