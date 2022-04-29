import asyncHandler from "express-async-handler";
import List from "../models/listModel.js";

// @desc    Fetch all user lists
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user });

  res.json(lists);
});

// @desc    Fetch single list
// @route   GET /api/lists/:id
// @access  Private
const getListById = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list.user.toString() === req.user._id.toString()) {
    if (list) {
      res.json(list);
    } else {
      res.status(404);
      throw new Error("List not found");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, Incorrect User");
  }
});

// @desc   Create a list
// @route  POST /api/lists
// @access Private
const addList = asyncHandler(async (req, res) => {
  //Get Name from input
  let { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("No Title Entered");
  }

  //If only empty space
  if (name.replace(/ /g, "").length === 0) {
    res.status(400);
    throw new Error("Title Cannot Be Empty");
  }

  const newList = await List.create({
    user: req.user._id,
    name: name,
  });

  await newList.save();
  res.json("List Created");
});

// @desc   Delete a list
// @route  DELETE /api/lists/:id
// @access Private
const removeList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  const { user } = req.body;

  const listUser = list.user.toString();

  if (list) {
    if (listUser === user) {
      await list.remove();
      res.json("List Removed");
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized.");
    }
  } else {
    res.status(404);
    throw new Error("List Not Found");
  }
});

// @desc   Edit a list
// @route  PUT /api/lists/:id
// @access Private
const editList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  const { user } = req.body;

  const listUser = list.user.toString();

  if (!req.body.name) {
    res.status(400);
    throw new Error("No Title Entered");
  }

  //If only empty space
  if (req.body.name.replace(/ /g, "").length === 0) {
    res.status(400);
    throw new Error("Title Cannot Be Empty");
  }

  if (list) {
    if (listUser === user) {
      list.name = req.body.name || list.name;

      const updatedList = await list.save();

      res.json({
        name: updatedList.name,
      });
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized.");
    }
  } else {
    res.status(404);
    throw new Error("List Not Found");
  }
});

export { getLists, getListById, addList, removeList, editList };
