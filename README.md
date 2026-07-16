# TP9 DAI - API REST Instagram Clone

API REST construida con Node.js, Express y PostgreSQL que implementa el backend de un clon de Instagram con autenticación JWT.

---

## Arquitectura por Capas

```
/src
  ├── /configs        → Conexión a la Base de Datos (Pool de pg)
  ├── /controllers    → Lógica de negocio: reciben req, invocan servicios y envían res
  ├── /middlewares    → Intercepción de requests (verificación JWT, validaciones)
  ├── /repositories   → Capa de datos: consultas SQL directas a la BD
  ├── /routes         → Definición de endpoints y asociación con middlewares/controllers
  ├── /services       → Lógica de aplicación: orquesta repositorios y reglas de negocio
  └── app.js          → Inicialización de Express, CORS y montaje de rutas
```

### Responsabilidades por capa

| Capa | Responsabilidad |
|------|----------------|
| **configs** | Inicializa el Pool de conexiones de `pg` usando variables de entorno |
| **repositories** | Ejecuta queries SQL con parámetros preparados. No conoce req/res |
| **services** | Orquesta llamadas a repositorios, aplica lógica de negocio (hash de password, generación de JWT) |
| **controllers** | Extrae datos de req, llama servicios y responde con el código HTTP correspondiente |
| **middlewares** | Verifica el token JWT antes de que el request llegue al controller |
| **routes** | Mapea verbo HTTP + path a middleware + controller |

---

## Base de Datos

### Tabla: `usuarios`

```sql
CREATE TABLE public.usuarios (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_usuario  VARCHAR(50)  NOT NULL UNIQUE,
    nombre_completo VARCHAR(100) NOT NULL,
    email           VARCHAR(100) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,   -- almacenado con bcrypt
    foto_perfil     VARCHAR(255),
    biografia       TEXT
);
```

### Tabla: `publicaciones`

```sql
CREATE TABLE public.publicaciones (
    id            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id    INTEGER      NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    url_imagen    VARCHAR(255) NOT NULL,
    descripcion   TEXT,
    likes         INTEGER      NOT NULL DEFAULT 0,
    fecha_creacion TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Relación:** One-to-Many. Un usuario puede tener muchas publicaciones. Al eliminar un usuario, sus publicaciones se eliminan en cascada.

---

## Endpoints

### Rutas Públicas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registra un nuevo usuario |
| POST | `/api/auth/login` | Inicia sesión y devuelve un JWT |
| GET | `/api/publicaciones` | Devuelve todas las publicaciones (feed) |

#### POST /api/auth/register
```json
// Body esperado
{
  "nombre_usuario": "gato_programador",
  "nombre_completo": "Juan Pérez",
  "email": "juan@example.com",
  "password": "miPassword123"
}

// Respuesta 201 Created
{
  "id": 1,
  "nombre_usuario": "gato_programador",
  "nombre_completo": "Juan Pérez",
  "email": "juan@example.com",
  "foto_perfil": null,
  "biografia": null
}
```

#### POST /api/auth/login
```json
// Body esperado
{
  "nombre_usuario": "gato_programador",
  "password": "miPassword123"
}

// Respuesta 200 OK
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /api/publicaciones
```json
// Respuesta 200 OK
[
  {
    "id": 1,
    "usuario_id": 1,
    "url_imagen": "https://cataas.com/cat",
    "descripcion": "Mi gato programador",
    "likes": 0,
    "fecha_creacion": "2026-07-03T12:00:00.000Z",
    "nombre_usuario": "gato_programador",
    "foto_perfil": null
  }
]
```

---

### Rutas Protegidas

Requieren el header: `Authorization: Bearer <token>`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios/perfil` | Retorna el perfil del usuario autenticado con sus publicaciones |
| PUT | `/api/usuarios/perfil` | Actualiza el perfil del usuario autenticado |
| POST | `/api/publicaciones` | Crea una nueva publicación |

#### GET /api/usuarios/perfil
```json
// Respuesta 200 OK
{
  "id": 1,
  "nombre_usuario": "gato_programador",
  "nombre_completo": "Juan Pérez",
  "email": "juan@example.com",
  "foto_perfil": null,
  "biografia": "Amante de los gatos y el código",
  "publicaciones": [
    {
      "id": 1,
      "usuario_id": 1,
      "url_imagen": "https://cataas.com/cat",
      "descripcion": "Mi gato",
      "likes": 0,
      "fecha_creacion": "2026-07-03T12:00:00.000Z"
    }
  ]
}
```

#### PUT /api/usuarios/perfil
```json
// Body esperado (todos los campos son opcionales)
{
  "nombre_completo": "Juan Pablo Pérez",
  "biografia": "Nueva biografía",
  "foto_perfil": "https://example.com/foto.jpg"
}

// Respuesta 200 OK
{
  "id": 1,
  "nombre_usuario": "gato_programador",
  "nombre_completo": "Juan Pablo Pérez",
  "email": "juan@example.com",
  "foto_perfil": "https://example.com/foto.jpg",
  "biografia": "Nueva biografía"
}
```

#### POST /api/publicaciones
```json
// Body esperado
{
  "url_imagen": "https://cataas.com/cat",
  "descripcion": "Mi nuevo gato"
}

// Respuesta 201 Created
{
  "id": 2,
  "usuario_id": 1,
  "url_imagen": "https://cataas.com/cat",
  "descripcion": "Mi nuevo gato",
  "likes": 0,
  "fecha_creacion": "2026-07-03T13:00:00.000Z"
}
```

---

## Middleware de Autenticación JWT

El archivo `src/middlewares/auth-middlewares.js` intercepta todas las rutas protegidas:

1. Lee el header `Authorization` del request
2. Verifica que tenga el formato `Bearer <token>`
3. Valida la firma del token usando `JWT_SECRET` del `.env`
4. Si el token es válido, adjunta el payload decodificado a `req.user`
5. Si falta o expiró, responde con `401 Unauthorized`

### Payload del token JWT

```json
{
  "id": 1,
  "nombre_usuario": "gato_programador",
  "role": "user",
  "iat": 1751234567,
  "exp": 1751241767
}
```

Los tokens expiran en **2 horas** desde su emisión.

---

## Configuración y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copiá el archivo de ejemplo y completá los valores:

```bash
copy .env.example .env
```

Editá `.env` con tus credenciales de PostgreSQL y una clave secreta para JWT.

### 3. Crear la base de datos

Ejecutá el script SQL en DBeaver, pgAdmin o psql:

```bash
psql -U postgres -f BD/CreacionBD.sql
```

### 4. Iniciar el servidor

```bash
npm run dev
```

El servidor quedará disponible en `http://localhost:3000`.
