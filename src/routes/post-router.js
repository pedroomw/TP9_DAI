import { Router } from "express"
import PostController from "../controllers/post-controller.js"
import authMiddleware from "../middlewares/auth-middlewares.js"

const controller = new PostController()
const router = Router()

// Ruta pública: obtener todas las publicaciones (feed)
router.get("/", async (req, res) => {
    await controller.getPosts(req, res)
})

// Ruta protegida: crear una nueva publicación
router.post("/", authMiddleware, async (req, res) => {
    await controller.createPost(req, res)
})

export default router
