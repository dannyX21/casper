const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const xlsx = require('xlsx');

let sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.uploadFile = function(req, res) {
  if(!req.files) {
    sendJsonResponse(res, 400, {
      message: "No files were uploaded."
    });
    return;
  }
  let attachment = req.files.attachment;
  let filePath = process.env.UPLOAD_PATH;
  let fileName = attachment.name;
  let index = 1;

  let extension = path.extname(attachment.name);
  if(extension !== '.xlsx' && extension !== '.xls') {
    sendJsonResponse(res, 400, {
      message: "Only excel files are allowed."
    });
    return;
  }

  while(fs.existsSync(filePath + fileName)){
    fileName = attachment.name.substring(0,attachment.name.length - extension.length) + "(" + index + ")" + extension;
    index ++;
  }
  attachment.mv(filePath + fileName, function(err) {
    if(err) {
      sendJsonResponse(res, 500, err);
      return;
    }
    const workbook = xlsx.readFile(filePath + fileName);
    const sheetNameList = workbook.SheetNames;
    const worksheet = workbook.Sheets["OPEN.SO"];
    let roa = xlsx.utils.sheet_to_json(worksheet, {raw: true, header: 1, blankrows: false});    
    let index = 5;
    const rows = roa.length;
    const orders = [];
    while(index<rows && roa[index][6]!=null) {
      let pn = roa[index][6].substring(0,roa[index][6].length-3);
      let qtyOrdered = parseInt(roa[index][10]);
      orders.push({
        so: parseInt(roa[index][1]),
        type: roa[index][2],
        entryDate: formatDate(roa[index][3]),
        customerId: parseInt(roa[index][4]),
        customer: roa[index][5],
        pn: pn,
        rev: roa[index][7],
        lpn: roa[index][8],
        qtyOrdered: qtyOrdered,
        qtyPcs: calcTotalPcs(pn, roa[index][8], qtyOrdered),
        promDate: formatDate(roa[index][11]),
        belDate: formatDate(roa[index][12]),
        reqDate: formatDate(roa[index][13]),
        qtyShipped: parseInt(roa[index][14]) || 0,
        qtyBalance: parseInt(roa[index][15]),
        unitPrice: parseFloat(roa[index][16]),
        balPrice: parseFloat(roa[index][17]),
        sq: roa[index][18],
        po: roa[index][19],
        permLoc: roa[index][20],
        comments: roa[index][21]
      });
      index++;
    }
    Order.remove({}, (err) => {
      if(err) {
        sendJsonResponse(res, 500, err);
        return;
      }
      Order.create(orders, (err, orders) => {
        if(err) {
          sendJsonResponse(res, 500, err);
          return;
        }
        sendJsonResponse(res, 200, {
          data: orders
        });
        return;
      });
    });
  });
};

function processFile(text) {
  const orders = [];
  let lines = text.split('\n');
  lines.pop();  //remove last item (empty item)
  lines.forEach((line, index) => {
    let order = line.split(',');
    try {
      orders.push({
        so: parseInt(roa[index][1]),
        type: roa[index][2],
        entryDate: formatDate(roa[index][3]),
        customerId: parseInt(roa[index][4]),
        customer: roa[index][5],
        pn: roa[index][6],
        rev: roa[index][7],
        lpn: order[8],
        qtyOrdered: parseInt(roa[index][10]),
        promDate: formatDate(roa[index][11]),
        belDate: formatDate(roa[index][12]),
        reqDate: formatDate(roa[index][13]),
        qtyShipped: parseInt(roa[index][14]) || 0,
        qtyBalance: parseInt(roa[index][15]),
        unitPrice: parseFloat(roa[index][16]),
        balPrice: parseFloat(roa[index][17]),
        sq: roa[index][18],
        po: roa[index][19],
        permLoc: roa[index][20],
        comments: roa[index][21]
      });
    } catch (err) {
      console.log("index: " + index + ", exception: " + err);
    }
  });
  return orders;
}

function formatDate(dt) {
  return new Date((dt - (25568))*86400*1000);
}

function calcTotalPcs(pn, lpn, qtyOrdered) {
  if(lpn!=undefined) {
    const match = lpn.toString().match(/^EZ(?:C5E|C6|C6A|RD6)\d{2,3}Q(\d{2,3})-\d\d$/);
    if(match) {
      return match[1] * qtyOrdered;
    }
  }
  const match = pn.toString().match(/^SPC[5|6]/);
  if(match) {
    return qtyOrdered * 10;
  }
  return qtyOrdered;
}
