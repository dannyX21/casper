const express = require('express');
const router = express.Router();

const ctrlFile = require("../controllers/files");
const ctrlOrder = require("../controllers/orders");
const ctrlMaterial = require("../controllers/materials");

router.post('/upload', ctrlFile.uploadOpenSO);
router.post('/uploadMaterials', ctrlFile.uploadMaterials);
router.get('/orders', ctrlOrder.getOrders);
router.get('/permLocs', ctrlOrder.getPermLocs);
router.get('/summary', ctrlOrder.getSummary);
router.get('/mrp', ctrlMaterial.getMRP);

module.exports = router;
