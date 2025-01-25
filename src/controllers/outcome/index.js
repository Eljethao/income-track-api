const outComeModel = require('../../models/outcome');
const { buildFindBy } = require('./helper');

// Create a new outcome
const createOutcome = async (req, res) => {
  try {
    const userId = req["headers"]["user"];
    console.log("req.body: ", req.body)
    const { amount, description, categoryImage, categoryName } = req.body;
    if (!userId) {
      return res.status(400).json({
        message: 'Bad Request',
        detail: "User ID is required"
      })
    }

    if (!amount) {
      return res.status(400).json({
        message: 'Bad Request',
        detail: "Amount is required"
      })
    }

    if (!categoryName) {
      return res.status(400).json({
        message: 'Bad Request',
        detail: "Category Name is required"
      })
    }

    const outcomes = await outComeModel.create({
      amount,
      description,
      categoryImage,
      categoryName,
      user: userId
    })

    console.log("outcomes: ", outcomes)

    return res.status(201).json({
      message: 'Successfully',
      data: outcomes
    })

  } catch (error) {
    console.log("error: ", error)
    return res.status(500).json({
      message: 'Internal Server Error',
      detail: error.message
    })
  }
};


const getOutcomes = async (req, res) => {
  try {
    console.log("req.query: ", req.query)
    const findby = buildFindBy(req.query);

    const skip = parseInt(req.query.skip, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 50;

    console.log("findby: ", findby)

    const totals = await outComeModel.countDocuments(findby);
    const outcomes = await outComeModel.find(findby)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    let totalOutcomes = 0;

    outcomes.forEach(outcome => {
      totalOutcomes += outcome.amount;
    });

    res.status(200).json({
      totals,
      totalOutcomes,
      outcomes
    });
  } catch (error) {
    console.log("error: ", error)
    res.status(500).json({ message: 'Failed to retrieve outcomes', error });
  }
};

// Read a single outcome by ID
const getOutcomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const outcome = await outComeModel.findById(id);
    if (!outcome) {
      return res.status(404).json({ message: 'Outcome not found' });
    }
    res.status(200).json(outcome);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve outcome', error });
  }
};

// Update an outcome by ID
const updateOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOutcome = await outComeModel.findByIdAndUpdate(id, req.body, {
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
const deleteOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOutcome = await outComeModel.findByIdAndDelete(id);
    if (!deletedOutcome) {
      return res.status(404).json({ message: 'Outcome not found' });
    }
    res.status(200).json({ message: 'Outcome deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete outcome', error });
  }
};


const getSumaryByCategory = async (req, res) => {
  try {
    // console.log("req.query: ", req.query)
    const findby = buildFindBy(req.query);

    const skip = parseInt(req.query.skip, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 50;

    console.log("findby: ", findby)

    const outcomes = await outComeModel.find(findby)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log("outcomes: ", outcomes)

    const summaryMap = outcomes.reduce((acc, outcome) => {
      const { categoryName, categoryImage, amount } = outcome;

      if (!acc[categoryName]) {
        acc[categoryName] = {
          name: categoryName,
          totalAmount: 0,
          categoryImage,
        };
      }

      acc[categoryName].totalAmount += amount;
      return acc;
    }, {});

    // Convert the summaryMap object to an array
    const summaryArray = Object.values(summaryMap);

    return res.status(200).json({
      message: "Successfully",
      data: summaryArray,
    });
  } catch (error) {
    console.error("Error in getSummaryByCategory: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      detail: error.message,
    });
  }
};




module.exports = {
  createOutcome,
  getOutcomes,
  getOutcomeById,
  updateOutcome,
  deleteOutcome,
  getSumaryByCategory
}