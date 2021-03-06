import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getLists,
  getListById,
  addList,
  removeList,
  editList,
} from "../controllers/listController.js";
import {
  getItemById,
  addItem,
  deleteItem,
  editItem,
  toggleCheckItem,
} from "../controllers/itemController.js";

//Route /api/lists

//Routes for Lists
router.route("/").get(protect, getLists).post(protect, addList);
router
  .route("/:id")
  .get(protect, getListById)
  .delete(protect, removeList)
  .put(protect, editList);

//Routes for Items
router
  .route("/:id/:itemid")
  .get(protect, getItemById)
  .delete(protect, deleteItem)
  .put(protect, editItem);
router.route("/:id/item").post(protect, addItem);
router.route("/:id/:itemid/check").put(protect, toggleCheckItem);

export default router;
