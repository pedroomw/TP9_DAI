import {express} from 'express'
import cors from 'cors'
import 'dotenv/config'

import AuthRouter from "./routes/auth-router.js"
import UserRouter from "./routes/user-router.js"
import PostRouter from "./routes/post-router.js"

app.use(cors())
app.use(express())

app.use("/api/auth", AuthRouter)
app.use("/api/usuarios", UserRouter)

