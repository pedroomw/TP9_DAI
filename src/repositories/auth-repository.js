import config from '../configs/DBConfig.js'
import { Client } from "pg"

const client = new Client(config)

class AuthRepository {
    registrar = async (user) => {
        try {
            const {nombre_usuario, nombre_completo, email, password} = user
            client.connect()
            const sqlQuery = "INSERT INTO usuarios (nombre_usuario, nombre_completo, email, password) VALUES ($1, $2, $3, $4) RETURNING *"
            const values = [nombre_usuario, nombre_completo, email, password]
            const respuesta = client.query(sqlQuery, values)
            if(respuesta){
                return respuesta
            } else {
                throw error ("Fallo en el insert")
            }
        } catch (err){
            throw err
        }
    }

    buscarUsuarioPorNombreDeUsuario = async (nombre_usuario) => {
        try{
            client.connect()
            const sqlQuery = "SELECT * FROM usuarios WHERE nombre_usuario = $1"
            const values = [nombre_usuario]
            const respuesta = client.query(sqlQuery, values)
            return respuesta
        } catch (err) {
            throw err
        }
    }
}

export default AuthRepository