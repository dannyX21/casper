const mongoose = require('mongoose');
const Material = mongoose.model('Material');

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getMRP = (req, res) => {
  Material.aggregate([
    {
      $match: {
        qtyMissing:
         {
           $gt: 0
         }
       }
     },{
       $lookup: {
         from: "subassy",
         localField: "pn",
         foreignField: "pn",
         as: "subassy_items"
       }
     },{
       $lookup: {
         from: "trans",
         localField: "pn",
         foreignField: "pn",
         as: "trans_items"
       }
     }
   ]).exec((err, materials) => {
     if(err) {
       sendJsonResponse(res, 404, err);
       return;
     }
     sendJsonResponse(res, 200, materials);
   });
}
