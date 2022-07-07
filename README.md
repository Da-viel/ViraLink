# ViraLink

Aplicación para compartir enlaces web.

Nuestra aplicación permite a los usuarios registrarse y compartir aquellos enlaces que consideren interesantes. El usuario podrá acompañar ese enlace de un título y una pequeña descripción acerca del contenido del mismo.

Los demás usuarios registrados podrán valorar en un rango desde 1( "enlace muy poco interesante") hasta 5( "enlace muy interesante"), el enlace publicado.

## Instalación y ejecución

1. Descargar el código a nuestro equipo local.
2. Es necesario disponer de una instancia de base de datos MySQL para ejecutar este proyecto. En esa instancia debemos crear una base de datos (CREATE DATABASE nombre\_ base_de_datos;) para las tablas que nuestra aplicación creará automáticamente.
3. Completar el fichero .env de acuerdo a la configuración que tengamos en nuestro equipo local. En el campo SECRET escribiremos la contraseña que será usada más adelante, en el proceso de autenticación.
4. Después de ejecutar 'npm install', debemos lanzar el script 'npm run initDB', que incluirá en la base de datos creada en el paso número dos, todas las tablas completamente configuradas, que son necesarias para que la aplicación funcione.
5. Ejecutar en el servidor que consideremos más adecuado. La aplicación está preparada para nodemon, que se iniciará con el script 'npm run dev'.
6. Para la parte del frontend, también será necesario ejecutar el comando 'npm install' que nos permitirá instalar todas las dependencias necesarias. El siguiente comando para instalar el servidor es 'npm start'.
7. Una vez que el servidor del backend y el servidor del frontend estén funcionando, la aplicación será plenamente operativa.

## Tecnologías

Hemos usado Node.js y MySQL para la parte del backend, y el framework React para la interfaz de usuario.

## Arquitectura

La arquitectura de la aplicación sigue un esquema Model-View-Controller para su backend.

## Entidades de la base de datos

En nuestra base de datos hemos creado tres entidades: users, articles and ratings.

![DB_1](https://user-images.githubusercontent.com/93152011/172813567-a571cce9-96dd-422d-8309-85dd8ea34d60.png)

## Funcionalidades de la aplicación

### usuarios

- Registrar un nuevo usuario.
- Acceder con el usuario logueado.
- Editar el perfil del usuario.

### publicaciones

Los usuarios registrados podrán:

- Crear una nueva publicación.
- Conocer TODAS las publicaciones creadas hasta la fecha, ordenadas de manera cronológica descendiente.
- Seleccionar UNA de las publicaciones.
- Eliminar aquellas publicaciones de las que han sido autores.

### Valoraciones

Los usuarios registrados podrán:

- Votar publicaciones SOLO de otros usuarios y SOLO se permite una votación por publicación/usuario.
