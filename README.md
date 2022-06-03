# Mi Proyecto API

Descripción de mi proyecto.

## Instalar

Instrucciones de instalación y ejecución.

## Entidades

Entidades de la base de datos y atributos.

## Endpoints

### Usuarios

POST (/registro) -> Crear un nuevo usuario ✅ -----------------------> Revisar el registro con foto (opcional)
POST (/acceso) -> Acceder con el usuario ✅
GET (/) -> Seleccion de TODAS las publicaciones // Necesita token ✅-
PUT (/editar) -> Editar el perfil del usuario // Necesita token ----------------------> Revisar el registro con foto (opcional)

### Publicaciones

POST (/publicacion) -> Crea una nueva publicación // Necesita token
DEL (/publicacion/:id) -> Elimina una publicación si eres el dueño // Necesita token

### Valoraciones

POST (/votacion) -> Votar publicaciones SOLO de otros usuarios y SOLO se permite una votación por publicación/usuario // Necesita token
