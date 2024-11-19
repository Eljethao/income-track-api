const express = require('express');
const router = express.Router();
const outcomeController = require('../controllers/outcome'); // Adjust path as needed

router.post('/outcomes', outcomeController.createOutcome);
router.get('/outcomes', outcomeController.getOutcomes);
router.get('/outcomes/:id', outcomeController.getOutcomeById);
router.put('/outcomes/:id', outcomeController.updateOutcome);
router.delete('/outcomes/:id', outcomeController.deleteOutcome);

module.exports = router;
