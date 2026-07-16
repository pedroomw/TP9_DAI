import { Router } from "express"
import ProfileController from "../controllers/profile-controller.js"
import authMiddleware from "../middlewares/auth-middlewares.js"

const controller = new ProfileController()
const router = Router()

// Todas las rutas de usuario requieren autenticación
router.use(authMiddleware)

// GET /api/usuarios/perfil -> retorna el perfil del usuario autenticado con sus publicaciones
router.get("/perfil", async (req, res) => {
    await controller.getProfile(req, res)
})

// PUT /api/usuarios/perfil -> edita el perfil del usuario autenticado
router.put("/perfil", async (req, res) => {
    await controller.updateProfile(req, res)
})

export default router
