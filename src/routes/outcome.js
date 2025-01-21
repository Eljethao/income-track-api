const express = require('express');
const router = express.Router();
const { createOutcome, getOutcomes, getOutcomeById, updateOutcome, deleteOutcome, getSumaryByCategory } = require('../controllers/outcome');

router.post('/', createOutcome);
router.get('/', getOutcomes);
router.get('/:id', getOutcomeById);
router.put('/:id', updateOutcome);
router.delete('/:id', deleteOutcome);
router.get("/sum/category", getSumaryByCategory);

module.exports = router;
