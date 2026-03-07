# ValTel (Hotel en Valera)  - sistema de Gestion Hotelera por Luis Orlando Rodríguez Hernández (CI: 30.721.284)

##  Descripción del Proyecto

Plataforma web completa para la gestión de un hotel ubicado en **Valera, Estado Trujillo, Venezuela**. El sistema permite a los usuarios visualizar habitaciones, realizar reseñas, y a los administradores gestionar todo el contenido de manera intuitiva.

### **Video demostrativo**
https://youtu.be/jckWiHXXYpk

###  Características Principales

- ✅ **Autenticación JWT** - Registro, login y perfiles de usuario
- ✅ **CRUD de Habitaciones** - Crear, leer, actualizar y eliminar habitaciones
- ✅ **Panel Administrativo** - Sección protegida para administradores
- ✅ **Sistema de Reseñas** - Usuarios pueden calificar y comentar habitaciones
- ✅ **Dark Mode** - Interfaz con tema claro/oscuro persistente
- ✅ **Widget de Clima** - Clima en tiempo real de Valera (OpenWeatherMap)
- ✅ **Editor de Texto Enriquecido** - CKEditor para descripciones
- ✅ **Subida de Imágenes** - Múltiples imágenes por habitación con Multer
- ✅ **Filtros** - Búsqueda de habitaciones por capacidad
- ✅ **Diseño Responsive** - Adaptado a móvil, tablet y desktop

---

##  Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18.2.0 | Biblioteca principal |
| Vite | 5.x | Build tool |
| React Router | 6.x | Navegación SPA |
| Tailwind CSS | 4.x | Estilos y responsive |
| Framer Motion | 11.x | Animaciones |
| React Hook Form | 7.x | Formularios |
| React Icons | 5.x | Iconografía |
| Axios | 1.x | Peticiones HTTP |
| CKEditor 5 | 41.x | Editor de texto enriquecido |
| React Toastify | 10.x | Notificaciones |

### Backend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Node.js | 20.x | Entorno de ejecución |
| Express | 4.x | Framework web |
| MongoDB | 8.x | Base de datos |
| Mongoose | 8.x | ODM para MongoDB |
| JWT | 9.x | Autenticación |
| Bcrypt | 5.x | Encriptación de contraseñas |
| Multer | 1.x | Subida de archivos |
| Nodemailer | 6.x | Envío de correos |
| Express Validator | 7.x | Validaciones |

---

## 📦 Instalación

### Requisitos Previos
- Node.js (v20 o superior)
- MongoDB (local o Atlas)
- Git

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/LuisUVM/ValTel.git
cd ValTel

# 2. Instalar dependencias de la raíz
npm install

# 3. Instalar dependencias del frontend
cd client
npm install

# 4. Instalar dependencias del backend
cd ../server
npm install

### Video demostrativo
https://youtu.be/jckWiHXXYpk
```

##  Configuracion
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/hotelvalera
JWT_SECRET=tu_secreto_super_seguro_cambiame
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
```
## Ejecución
### Desarrollo (Frontend + Backend simultáneamente)
```bash
cd C:\Users\Orlando\Proyecto3.1\ValTel
npm run dev

```
-Frontend: http://localhost:5173
-Backend: http://localhost:5000

 #Solo Frontend
 ```bash
 cd client
 npm run dev
```
 #Solo Backend
 ```bash
cd server
npm run dev
```
###Estructura completa del Proyecto
ValTel/
├── client/                    # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── assets/            # Imágenes y recursos
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── RoomCard.jsx
│   │   │   ├── RoomFilter.jsx
│   │   │   ├── Reviews.jsx
│   │   │   ├── ClimaWidget.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/             # Páginas completas
│   │   │   ├── Inicio.jsx
│   │   │   ├── Servicios.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Testimonios.jsx
│   │   │   ├── Reservas.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── RoomsList.jsx
│   │   │   ├── RoomDetail.jsx
│   │   │   └── Admin/
│   │   │       ├── AdminLayout.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── RoomList.jsx
│   │   │       └── RoomForm.jsx
│   │   ├── context/           # Contextos globales
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── services/          # Servicios API
│   │   │   ├── climaService.js
│   │   │   ├── reservaService.js
│   │   │   ├── authService.js
│   │   │   ├── roomService.js
│   │   │   └── reviewService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/                     # Backend Node.js
│   ├── models/                 # Modelos de MongoDB
│   │   ├── User.js
│   │   ├── Room.js
│   │   └── Review.js
│   ├── routes/                 # Rutas de la API
│   │   ├── auth.js
│   │   ├── rooms.js
│   │   ├── reviews.js
│   │   ├── reservas.js
│   │   └── weather.js
│   ├── controllers/            # Controladores
│   │   ├── authController.js
│   │   ├── roomController.js
│   │   └── reviewController.js
│   ├── middleware/             # Middlewares
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── config/                 # Configuraciones
│   │   └── db.js
│   ├── uploads/                # Imágenes subidas
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md

### aracterísticas Detalladas

# Autenticación
-Registro de nuevos usuarios
-Login con JWT
-Perfil de usuario protegido
-Roles: user / admin

# Habitaciones
-Listado con filtro por capacidad
-Vista detalle con galería de imágenes
-Información completa (descripción, comodidades, precio)
-CRUD completo para administradores

# Reseñas
-Usuarios autenticados pueden dejar reseñas
-Calificación de 1 a 5 estrellas
-Visualización de promedio
-Eliminación por autor o admin

# Dark Mode
-Toggle en header
-Persistencia en localStorage
-Alto contraste (negro/blanco/amarillo)
-Aplicado en toda la aplicación

### Widget de Clima
-Datos en tiempo real de Valera
-Temperatura, humedad, viento, presión
-Pronóstico 5 días
-Fallback a datos simulados

# Panel Administrativo
-Dashboard con estadísticas
-Gestión de habitaciones (tabla)
-Formulario con CKEditor
-Subida múltiple de imágenes
-Protegido para admin

# Diseño Responsive
-Mobile First
-Menú hamburguesa
-Grids adaptables (1, 2, 3 columnas)
-Textos y espaciados proporcionales

###Pruebas
#Credenciales de Prueba
-Admin: admin@hotel / 123456

### Endpoints Principales

-POST	/api/auth/register	Registro	Público
-POST	/api/auth/login	Login	Público
-GET	/api/rooms	Listar habitaciones	Público
-GET	/api/rooms/:id	Detalle habitación	Público
-POST	/api/rooms	Crear habitación	Admin
-PUT	/api/rooms/:id	Editar habitación	Admin
-DELETE	/api/rooms/:id	Eliminar habitación	Admin
-POST	/api/reviews	Crear reseña	Usuario
-GET	/api/reviews/room/:roomId	Ver reseñas	Público
-GET	/api/weather/current	Clima actual	Público
-GET	/api/weather/forecast	Pronóstico	Público
