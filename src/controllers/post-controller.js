import PostService from "../services/post-services.js"

const svc = new PostService()

class PostController {
    getPosts = async (req, res) => {
        try {
            const publicaciones = await svc.getAll()
            return res.status(200).json(publicaciones)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    createPost = async (req, res) => {
        try {
            const usuario_id = req.user.id
            const datos = req.body
            const nuevaPublicacion = await svc.create(usuario_id, datos)
            return res.status(201).json(nuevaPublicacion)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

export default PostController
