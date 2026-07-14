import Router from "express";
import AuthMiddleware from "../middlewares/auth-middlewares.js"
import AuthController from "../controllers/auth-controller.js"

const controller = new AuthController();
const router = Router()

router.post("/register", async(req, res) => {
    await controller.register(req, res)
})

router.post("/login", async(req, res) => {
    await controller.login(req, res)
})

export default router