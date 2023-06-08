# Conversión valor de UF a CLP

# Paso a Paso:

Muy importante antes de comenzar es tener Nodejs instalado y
antes de ejecutar cualquier comando estar en el directorio de la aplicación.

Para poder hacer funcionar el programa lo primero es editar el archivo .env (cambiar el nombre del .env.sample)

```
SECRET_JWT=superSecret

DB_HOST=127.0.0.1
DB_USER=usuarioMysql
DB_PASS=contraseñaUsuarioMysql

```

luego en la consola (CLI) ejecutar el comando para la instalación de dependencias

```
npm run install
```

Una vez instaldas las dependecias ejecutar node:

```
npm run start
```

Esperar unos breves segundos (2 a 3) para que se cree la base de datos, se sincronicen las tablas y se creen los usuarios.

Abrir otra consola y ejecutar los siguiente comando:

```
cd client/
npm run build
```

Una vez esto listo aparecera los archivo creados en dist (--> Local: http//localhost:3001) para poder acceder a la aplicación.

#Observaciones importantes

- El fix de cors no es lo ideal tengo que aprender a arreglar el proglema cuando los puertos del cliente y el servidor son distintos, ya que por lo que veo se desconoce el origen, acutalmente node esta ejecutando el frontend.

- El proyecto esta sin CSS debo agregar estilos.

Tratare de mejorar todo con el tiempo 😵‍💫
