import AuthService from "../services/auth-services.js"

const svc = new AuthService()

class AuthController {
    register = async (req, res) => {
        try{
            const user = req.body
            const resultado = await svc.register(user)
            res.send(201).json(resultado)
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }
    }

    login = async (req, res) => {
        try{
            const login_data = req.body
            const resultado = await svc.login(login_data)
            res.status(200).json({
                message: "Login exitoso",
                token: resultado
            })
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }
    }
}

export default Controller