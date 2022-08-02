const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");

//@desc Get Goals
//@route GET/api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

//@desc Set Goal
//@route POST/api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    throw new Error("Please add goal name");
  } else {
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id,
    });
    res.status(200).json(goal);
  }
});

//@desc Set Goal
//@route PUT/api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Could not find the Goal to update");
  }

  const filter = { _id: `${req.params.id}` };
  const update = { text: `${req.body.text}` };

  const updatedGoal = await Goal.findByIdAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc Set Goal
//@route POST/api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Could not find the Goal to Delete it");
  }

  const filter = { _id: `${req.params.id}` };
  const deletedGoal = await Goal.remove(filter);

  res.status(200).json(deletedGoal);
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
