const Outcome = require('../../models/outcome'); // Adjust the path as necessary

// Create a new outcome
exports.createOutcome = async (req, res) => {
  try {
    const { amount, description, category, categoryIconName } = req.body;
    const outcome = new Outcome({ amount, description, category, categoryIconName });
    const savedOutcome = await outcome.save();
    res.status(201).json(savedOutcome);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create outcome', error });
  }
};

// Read all outcomes
exports.getOutcomes = async (req, res) => {
  try {
    const outcomes = await Outcome.find();
    res.status(200).json(outcomes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve outcomes', error });
  }
};

// Read a single outcome by ID
exports.getOutcomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const outcome = await Outcome.findById(id);
    if (!outcome) {
      return res.status(404).json({ message: 'Outcome not found' });
    }
    res.status(200).json(outcome);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve outcome', error });
  }
};

// Update an outcome by ID
exports.updateOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOutcome = await Outcome.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedOutcome) {
      return res.status(404).json({ message: 'Outcome not found' });
    }
    res.status(200).json(updatedOutcome);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update outcome', error });
  }
};

// Delete an outcome by ID
exports.deleteOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOutcome = await Outcome.findByIdAndDelete(id);
    if (!deletedOutcome) {
      return res.status(404).json({ message: 'Outcome not found' });
    }
    res.status(200).json({ message: 'Outcome deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete outcome', error });
  }
};
