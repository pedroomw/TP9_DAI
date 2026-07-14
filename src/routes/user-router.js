import Router from "express";
import ProfileController from "../controllers/profile-controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";

const controller = new ProfileController()

const router = Router()

router.use(authMiddleware)

router.get("/perfil", authMiddleware, async(req, res) => {
    await controller.getProfile(req, res)
})

router.put("/login", async(req, res) => {
    await controller.login(req, res)
})

router.get("")

export default router