import AuthService from "../services/auth-services.js"

const svc = new AuthService()

class AuthController {
    register = async (req, res) => {
        try{
            const user = req.body
            const resultado = await svc.register(user)
            if(resultado){
               return res.status(201).json(resultado) 
            } else {
                return res.status(500).json("Error interno")
            }
            
        } catch (err) {
            res.status(500).json({
                error: err.message
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

export default AuthController