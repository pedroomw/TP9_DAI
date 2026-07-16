import pool from '../configs/db-config.js'

class UserRepository {
    obtenerPerfilConPublicaciones = async (id) => {
        try {
            // Obtener datos del usuario
            const sqlUsuario = "SELECT id, nombre_usuario, nombre_completo, email, foto_perfil, biografia FROM usuarios WHERE id = $1"
            const usuarioResult = await pool.query(sqlUsuario, [id])
            const usuario = usuarioResult.rows[0]

            if (!usuario) return null

            // Obtener publicaciones del usuario
            const sqlPosts = "SELECT * FROM publicaciones WHERE usuario_id = $1 ORDER BY fecha_creacion DESC"
            const postsResult = await pool.query(sqlPosts, [id])

            return {
                ...usuario,
                publicaciones: postsResult.rows
            }
        } catch (err) {
            throw err
        }
    }

    actualizarPerfil = async (id, datos) => {
        try {
            const { nombre_completo, biografia, foto_perfil } = datos
            const sqlQuery = `
                UPDATE usuarios 
                SET nombre_completo = COALESCE($1, nombre_completo),
                    biografia = COALESCE($2, biografia),
                    foto_perfil = COALESCE($3, foto_perfil)
                WHERE id = $4
                RETURNING id, nombre_usuario, nombre_completo, email, foto_perfil, biografia
            `
            const values = [nombre_completo || null, biografia || null, foto_perfil || null, id]
            const respuesta = await pool.query(sqlQuery, values)
            return respuesta.rows[0]
        } catch (err) {
            throw err
        }
    }
}

export default UserRepository
