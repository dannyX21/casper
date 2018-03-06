const express = require('express');
const router = express.Router();

const ctrlFile = require("../controllers/files");
const ctrlOrder = require("../controllers/orders");
const ctrlMaterial = require("../controllers/materials");
const ctrlCable = require("../controllers/cables");
const ctrlComponent = require("../controllers/components");

router.post('/upload', ctrlFile.uploadOpenSO);
router.post('/uploadMaterials', ctrlFile.uploadMaterials);
router.get('/orders', ctrlOrder.getOrders);
router.get('/permLocs', ctrlOrder.getPermLocs);
router.get('/summary', ctrlOrder.getSummary);
router.get('/mrp', ctrlMaterial.getMRP);
router.get('/materials/cables', ctrlCable.getCables);
router.get('/materials/cables/depts', ctrlCable.getDepts);
router.get('/materials/components', ctrlComponent.getComponents);
router.get('/materials/components/depts', ctrlCable.getDepts);

module.exports = router;
