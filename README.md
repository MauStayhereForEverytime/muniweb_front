# MUNIWEB Frontend

Este proyecto corresponde al frontend de la aplicación **MUNIWEB**. Aquí encontrarás los pasos y herramientas necesarias para configurar y ejecutar el entorno de desarrollo.

---

## Requerimientos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- **Node.js**: Versión `20.15` (descargar desde [Node.js Oficial](https://nodejs.org/)).
- **pnpm**: Gestor de paquetes eficiente. Puedes instalarlo globalmente ejecutando:
  ```bash
  npm install -g pnpm
- **Instalar dependencias**: Dentro del proyecto ejecutar lo siguiente para instalar las dependencias:
  ```bash
  pnpm install
- **Levantar proyecto**: Ejecutar el siguiente comando en modo desarrollo que abrirá en el puerto 3000:
  ```bash
  pnpm run dev

- **Levantar proyecto en producción**: Ejecutar el siguiente comando en modo producción con los archivos compilados:
  ```bash
  pnpm run build

- **Subir los archivos compilados por FTP al server o hosting**: Solo jalando los archivos o subiendo por FTP.
- **Otro método más rápido**: Redirigir la ruta del dominio a la carpeta /dist del proyecto y solo hacer:
  ```bash
  git pull origin ramadefinida



## Notas extras
- **Probelmas cons las dependencias**: Borrar node_modules y volver a ejecutar el comando:
  ```bash
  pnpm install

## Authors

- [@cyborgpaul](https://github.com/cyborpaul)