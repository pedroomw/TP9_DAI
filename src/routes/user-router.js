import Router from "express";
import ProfileController from "../controllers/profile-controller";
import authMiddleware from "../middlewares/auth-middlewares";

const controller = new ProfileController()

router = Router()

router.use()

router.get("/perfil", authMiddleware, async(req, res) => {
    await controller.getProfile(req, res)
})

router.put("/login", async(req, res) => {
    await controller.login(req, res)
})

router.get("")

export default router