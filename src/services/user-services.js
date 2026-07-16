import UserRepository from "../repositories/user-repository.js"

const repo = new UserRepository()

class UserService {
    getProfile = async (id) => {
        try {
            const perfil = await repo.obtenerPerfilConPublicaciones(id)
            if (!perfil) {
                throw new Error("Usuario no encontrado")
            }
            return perfil
        } catch (err) {
            throw err
        }
    }

    updateProfile = async (id, datos) => {
        try {
            const perfilActualizado = await repo.actualizarPerfil(id, datos)
            if (!perfilActualizado) {
                throw new Error("No se pudo actualizar el perfil")
            }
            return perfilActualizado
        } catch (err) {
            throw err
        }
    }
}

export default UserService
