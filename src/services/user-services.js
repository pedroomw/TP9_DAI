import AuthRepository from "../repositories/auth-repository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const repo = new AuthRepository()

class AuthService{
    getProfile = async (id) => {
        try{
            
        }
        catch (err) {
            throw err
        }
    }

    login = async (login_data) => {
        try{
            const usuario = repo.buscarUsuarioPorNombreDeUsuario(login_data.nombre_usuario)
            if(!usuario){
                throw new Error ("Usuario no encontrado")
            }
            bcrypt.compare(login_data.password, usuario.password, (err, result) => {
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