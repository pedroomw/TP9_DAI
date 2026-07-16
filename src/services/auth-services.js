import AuthRepository from "../repositories/auth-repository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const repo = new AuthRepository()

class AuthService {
    register = async (user) => {
        try {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            const resultado = await repo.registrar(user)
            return resultado
        } catch (err) {
            throw err
        }
    }

    login = async (login_data) => {
        try {
            const usuario = await repo.buscarUsuarioPorNombreDeUsuario(login_data.nombre_usuario)
            if (!usuario) {
                throw new Error("Usuario no encontrado")
            }

            const passwordValida = await bcrypt.compare(login_data.password, usuario.password)
            if (!passwordValida) {
                throw new Error("Contraseña incorrecta")
            }

            const payload = {
                id: usuario.id,
                nombre_usuario: usuario.nombre_usuario,
                role: "user"
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })
            return token
        } catch (err) {
            throw err
        }
    }
}

export default AuthService
