import PostRepository from "../repositories/post-repository.js"

const repo = new PostRepository()

class PostService {
    getAll = async () => {
        try {
            const publicaciones = await repo.obtenerTodas()
            return publicaciones
        } catch (err) {
            throw err
        }
    }

    create = async (usuario_id, datos) => {
        try {
            const nuevaPublicacion = await repo.crear(usuario_id, datos)
            return nuevaPublicacion
        } catch (err) {
            throw err
        }
    }
}

export default PostService
