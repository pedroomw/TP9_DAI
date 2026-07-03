import Router from "express";
import AuthMiddleware from "../middlewares/auth-middlewares.js"
import AuthController from "../controller/auth-controller.js"

const AuthController = new AuthController();
router = Router()

router.post("/register", async(req, res) => {
    res.send(await AuthController.register(req, res))
})

router.post("login", async() => {
    
})

export default router