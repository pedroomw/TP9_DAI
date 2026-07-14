import express from 'express'
import cors from 'cors'

import AuthRouter from "./routes/auth-router.js"
import UserRouter from "./routes/user-router.js"
import PostRouter from "./routes/post-router.js"

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json());

app.use("/api/auth", AuthRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
