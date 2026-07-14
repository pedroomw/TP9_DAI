import Router from "express";

const router = Router()

router.post("/register", async(req, res) => {
    await AuthController.register(req, res)
})

router.post("/login", async(req, res) => {
    await AuthController.login(req, res)
})

router.get("")

export default router