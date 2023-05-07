import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getAllUsers,
  searchFriends,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/search-friends", searchFriends);
router.get("/all-users", getAllUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
