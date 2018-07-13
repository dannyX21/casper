const express = require('express');
const router = express.Router();

const ctrlFile = require("../controllers/files");
const ctrlOrder = require("../controllers/orders");
const ctrlMaterial = require("../controllers/materials");
const ctrlCable = require("../controllers/cables");
const ctrlComponent = require("../controllers/components");
const ctrlEvaluation = require("../controllers/evaluations");
const ctrlSimulation = require("../controllers/simulations");
const ctrlSqs = require("../controllers/sqs");

router.post('/upload', ctrlFile.uploadOpenSO);
router.post('/uploadMaterials', ctrlFile.uploadMaterials);
router.post('/uploadSQs', ctrlFile.uploadSQs);
router.get('/orders', ctrlOrder.getOrders);
router.get('/permLocs', ctrlOrder.getPermLocs);
router.get('/summary', ctrlOrder.getSummary);
router.get('/mrp', ctrlMaterial.getMRP);
router.get('/materials/cables', ctrlCable.getCables);
router.get('/materials/cables/depts', ctrlCable.getDepts);
router.get('/materials/components', ctrlComponent.getComponents);
router.get('/materials/components/depts', ctrlCable.getDepts);
router.get('/periods', ctrlEvaluation.getPeriods);
router.get('/vendors/evaluations/:period', ctrlEvaluation.getEvaluation);
router.get('/simulations/',ctrlSimulation.getSimPNs);
router.get('/simulations/:pn', ctrlSimulation.getSimData);
router.get('/sqs/', ctrlSqs.getPendingSQs);
router.patch('/sqs/:sqd', ctrlSqs.reviewSQ);

module.exports = router;
