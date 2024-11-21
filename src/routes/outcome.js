const express = require('express');
const router = express.Router();
const outcomeController = require('../controllers/outcome'); // Adjust path as needed

router.post('/', outcomeController.createOutcome);
router.get('/', outcomeController.ge);
router.get('/:id', outcomeController.getOutcomeById);
router.put('/:id', outcomeController.updateOutcome);
router.delete('/:id', outcomeController.deleteOutcome);

module.exports = router;
