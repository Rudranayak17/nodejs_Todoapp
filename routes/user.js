import express from "express";

import { getAllUsers, getMyProfile, login, logout, registerUser } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.get("/all",isAuthenticated,getAllUsers);

router.post("/new", registerUser);
router.post("/login",login);


router.get("/me",isAuthenticated,getMyProfile)
router.get("/logout",logout)
export default router;
