import pool from '../configs/db-config.js'

class AuthRepository {
    registrar = async (user) => {
        try {
            const { nombre_usuario, nombre_completo, email, password } = user
            const sqlQuery = "INSERT INTO usuarios (nombre_usuario, nombre_completo, email, password) VALUES ($1, $2, $3, $4) RETURNING id, nombre_usuario, nombre_completo, email, foto_perfil, biografia"
            const values = [nombre_usuario, nombre_completo, email, password]
            const respuesta = await pool.query(sqlQuery, values)
            return respuesta.rows[0]
        } catch (err) {
            throw err
        }
    }

    buscarUsuarioPorNombreDeUsuario = async (nombre_usuario) => {
        try {
            const sqlQuery = "SELECT * FROM usuarios WHERE nombre_usuario = $1"
            const values = [nombre_usuario]
            const respuesta = await pool.query(sqlQuery, values)
            return respuesta.rows[0] || null
        } catch (err) {
            throw err
        }
    }

    buscarUsuarioPorEmail = async (email) => {
        try {
            const sqlQuery = "SELECT * FROM usuarios WHERE email = $1"
            const values = [email]
            const respuesta = await pool.query(sqlQuery, values)
            return respuesta.rows[0] || null
        } catch (err) {
            throw err
        }
    }
}

export default AuthRepository
