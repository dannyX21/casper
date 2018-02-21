let mongoose = require('mongoose');
let Order = mongoose.model('Order');

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getOrders = (req, res) => {
  let query = {};
  if(req.query.permLoc) {
    query.permLoc = req.query.permLoc;
  }
  if(req.query.promDateFrom || req.query.promDateTo) {
    query.promDate = {};
  }
  if(req.query.promDateFrom) {
    query.promDate.$gte = new Date(req.query.promDateFrom);
  }
  if(req.query.promDateTo) {
    query.promDate.$lte = new Date(req.query.promDateTo);
  }
  Order.find(query).exec((err, orders) => {
    if(err) {
      sendJsonResponse(res, 404, err);
      return;
    }
    sendJsonResponse(res, 200, orders);
  });
};

module.exports.getPermLocs = (req, res) => {
  let query = {};
  if(req.query.permLoc) {
    query.permLoc = req.query.permLoc;
  }
  if(req.query.promDateFrom || req.query.promDateTo) {
    query.promDate = {};
  }
  if(req.query.promDateFrom) {
    query.promDate.$gte = new Date(req.query.promDateFrom);
  }
  if(req.query.promDateTo) {
    query.promDate.$lte = new Date(req.query.promDateTo);
  }
  console.log(query);
  Order.find(query).distinct('permLoc', (err, permLocs) => {
    if(err) {
      sendJsonResponse(res, 404, err);
      return;
    }
    sendJsonResponse(res, 200, permLocs);
  })
};

module.exports.getSummary = (req, res) => {
  let promDateFrom, promDateTo;
  if(req.query.promDateFrom) {
    promDateFrom = new Date(req.query.promDateFrom);
  } else {
    sendJsonResponse(res, 400, {
      message: "Promised date from not included in request."
    });
    return;
  }
  if(req.query.promDateTo) {
    promDateTo = new Date(req.query.promDateTo);
  } else {
    sendJsonResponse(res, 400, {
      message: "Promised date to not included in request."
    });
    return;
  }
  Order.aggregate(
    [
      {
        $match: {
          promDate: {
            $gte: promDateFrom,
            $lte: promDateTo
          }
        }
      },
      {
        $group : {
          _id: "$permLoc",
          totOrders: {
            $sum: "$qtyOrdered"
          },
          totPcs: {
            $sum: "$qtyPcs"
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]
  ).exec((err, summary) => {
    console.log("aggregate function executed.");
    if(err) {
      sendJsonResponse(res,404, err);
      return;
    }
    sendJsonResponse(res, 200, summary);
  });
};
