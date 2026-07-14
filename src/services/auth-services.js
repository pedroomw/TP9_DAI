import AuthRepository from "../repositories/auth-repository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const repo = new AuthRepository()

class AuthService{
    register = async (user) => {
        try{
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            const resultado = await repo.registrar(user)
            return resultado
        } catch (err) {
            throw err
        }
    }

    login = async (login_data) => {
        try{
            console.log(login_data.password)
            const usuario = repo.buscarUsuarioPorNombreDeUsuario(login_data.nombre_usuario)
            console.log(usuario.password)
            if(!usuario){
                throw new Error ("Usuario no encontrado")
            }
            await bcrypt.compare(login_data.password, usuario.password, async (err, result) => {
                if (err) {
                    throw new Error (err)
                } 
                const payload = {
                    id: usuario.id,
                    role: "user"
                }
                await jwt.sign(usuario.id, process.env.SECRET_KEY, {expiresIn: "1h"}, (err, token) => {
                    if(err){
                        throw new Error (err)
                    }
                    return token
                })
            })
        } catch (err) {
            throw err
        }
    }
}

export default AuthService