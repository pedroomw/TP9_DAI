import {express} from 'express'
import cors from 'cors'

import AuthRouter from "./routes/auth-router.js"

app.use(cors())
app.use(express())

app.use("/api/auth", AuthRouter)

