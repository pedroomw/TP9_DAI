import UserService from "../services/user-services.js"

const svc = new UserService()

class ProfileController {
    getProfile = async (req, res) => {
        try {
            const id = req.user.id
            const perfil = await svc.getProfile(id)
            return res.status(200).json(perfil)
        } catch (err) {
            if (err.message === "Usuario no encontrado") {
                return res.status(404).json({ error: err.message })
            }
            return res.status(500).json({ error: err.message })
        }
    }

    updateProfile = async (req, res) => {
        try {
            const id = req.user.id
            const datos = req.body
            const perfilActualizado = await svc.updateProfile(id, datos)
            return res.status(200).json(perfilActualizado)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

export default ProfileController
