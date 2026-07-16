import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import AuthRouter from "./routes/auth-router.js"
import UserRouter from "./routes/user-router.js"
import PostRouter from "./routes/post-router.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Rutas públicas de autenticación
app.use("/api/auth", AuthRouter)

// Rutas de publicaciones (GET público, POST protegido)
app.use("/api/publicaciones", PostRouter)

// Rutas protegidas de usuario
app.use("/api/usuarios", UserRouter)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
