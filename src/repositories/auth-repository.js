import config from '../configs/DBConfig.js'
import { Client } from "pg"

const client = new Client(config)

class AuthRepository {
    registrar = async () => {
        client.connect()
    }
}

export default AuthRepository