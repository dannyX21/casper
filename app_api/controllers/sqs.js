const mongoose = require('mongoose');
const Sq = mongoose.model('Sq');

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getPendingSQs = (req, res) => {
  Sq.find({
    $or: [
      { status: 'R'},
      { status: 'RP' },
      { status: 'RC'},
      { status: 'RR' }
    ]}).sort("-addDate").exec((err, sqs) => {
      if(err) {
        sendJsonResponse(res, 400, {
          message: err
        });
        return;
      }
      sendJsonResponse(res, 200, sqs);
    });
  };

module.exports.reviewSQ = (req, res) => {
  if(!req.params || !req.params.sqd || req.body.okMats==undefined || !req.body.missingMats) {
    console.log(req.params);
    console.log(req.body);
    sendJsonResponse(res, 404, {
      message: "SQD, okMats & missingMats son parametros requeridos."
    });
    return;
  } else {
    Sq.update({
      sqd: req.params.sqd}, {
         $set: {
           okMats: req.body.okMats,
           missingMats: req.body.missingMats,
           revBy: "daniel.lopez",
           revOn: new Date()
         }
       }, (err, sq) => {
         if(err) {
           sendJsonResponse(res, 400, err);
           return;
         }
         sendJsonResponse(res, 204, sq);
       }
     );
   }
}
