# Configuración y Ejecución del Proyecto

## 1\. Configuración de Variables de Entorno

Para ejecutar el proyecto en Docker o localmente después del build, es necesario que las variables de entorno en el archivo `.env` tengan valores reales. Es decir, debes reemplazar los valores con `#{VARIABLE}` por sus correspondientes valores.

## 2\. Ejecutar sin Docker

Si deseas ejecutar el proyecto localmente sin Docker, crea un archivo `.env.development.local` en la raíz del proyecto y agrega las variables de entorno necesarias con sus valores reales.

## 3\. Comandos para Ejecutar el Proyecto

El proyecto cuenta con los siguientes comandos definidos en el `package.json`:

## 4\. Comandos para Docker

- Levantar los contenedores en segundo plano
    ```
    npm run docker-up
    ```
    
    Ejecuta `docker compose up -d` para levantar los contenedores.
    
- Apagar los contenedores
    
    ```
    npm run docker-down
    ```
    
    Detiene y elimina los contenedores en ejecución.
    
- Reiniciar los contenedores
    
    ```
    npm run docker-restart
    ```
    
    Reinicia los contenedores sin eliminarlos.
    
- Reconstruir la imagen de Docker
    
    ```
    npm run docker-build
    ```
    
    Ejecuta `docker compose up -d --build` para construir y ejecutar los contenedores desde cero.
    
- Ver logs en tiempo real
    
    ```
    npm run docker-logs
    ```
    
    Muestra los logs del contenedor en ejecución.

Con estos pasos, deberías poder ejecutar el proyecto sin problemas tanto en local como en Docker. 🚀