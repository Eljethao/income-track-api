const express = require('express');
const router = express.Router();
const { createOutcome, getOutcomes, getOutcomeById, updateOutcome, deleteOutcome } = require('../controllers/outcome');

router.post('/', createOutcome);
router.get('/', getOutcomes);
router.get('/:id', getOutcomeById);
router.put('/:id', updateOutcome);
router.delete('/:id', deleteOutcome);

module.exports = router;
