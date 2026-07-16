import pool from '../configs/db-config.js'

class PostRepository {
    obtenerTodas = async () => {
        try {
            const sqlQuery = `
                SELECT p.*, u.nombre_usuario, u.foto_perfil
                FROM publicaciones p
                JOIN usuarios u ON p.usuario_id = u.id
                ORDER BY p.fecha_creacion DESC
            `
            const respuesta = await pool.query(sqlQuery)
            return respuesta.rows
        } catch (err) {
            throw err
        }
    }

    crear = async (usuario_id, datos) => {
        try {
            const { url_imagen, descripcion } = datos
            const sqlQuery = `
                INSERT INTO publicaciones (usuario_id, url_imagen, descripcion)
                VALUES ($1, $2, $3)
                RETURNING *
            `
            const values = [usuario_id, url_imagen, descripcion || null]
            const respuesta = await pool.query(sqlQuery, values)
            return respuesta.rows[0]
        } catch (err) {
            throw err
        }
    }
}

export default PostRepository
