const express = require('express');
const router = express.Router();

const ctrlFile = require("../controllers/files");
const ctrlOrder = require("../controllers/orders");

router.post('/upload', ctrlFile.uploadFile);
router.get('/orders', ctrlOrder.getOrders);
router.get('/permLocs', ctrlOrder.getPermLocs);
router.get('/summary', ctrlOrder.getSummary);

module.exports = router;
