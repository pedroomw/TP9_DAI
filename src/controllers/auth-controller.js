import AuthService from "../services/auth-services.js"

const svc = new AuthService()

class AuthController {
    register = async (req, res) => {
        try {
            const user = req.body
            const resultado = await svc.register(user)
            return res.status(201).json(resultado)
        } catch (err) {
            // Error de duplicado de PostgreSQL (unique constraint)
            if (err.code === '23505') {
                return res.status(400).json({ error: "El email o nombre de usuario ya está en uso" })
            }
            return res.status(500).json({ error: err.message })
        }
    }

    login = async (req, res) => {
        try {
            const login_data = req.body
            const token = await svc.login(login_data)
            return res.status(200).json({
                message: "Login exitoso",
                token: token
            })
        } catch (err) {
            if (err.message === "Usuario no encontrado" || err.message === "Contraseña incorrecta") {
                return res.status(401).json({ error: err.message })
            }
            return res.status(500).json({ error: err.message })
        }
    }
}

export default AuthController
