import express from "express"
import { getPosts, getPost, deletePost, updatePost, addPost } from "../controllers/posts.js"


const router = express.Router()
//instead of doing stuff here itself we put everything in controllers
router.get("/", getPosts)
router.get('/:id', getPost)
router.post('/', addPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

export default router