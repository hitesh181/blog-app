import express from "express"
import { register, login, logout } from "../controllers/auth.js"

const router = express.Router()
//instead of doing stuff here itself we put everything in controllers

router.post("/register",register)
router.post("/login", login)
router.post("/logout", logout)


export default router