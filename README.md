# 🚀 Prueba Técnica Backend - Node.js & TypeScript

Este repositorio contiene la solución a la prueba técnica para el puesto de Backend Developer. El proyecto es una API RESTful construida con **Node.js**, **Express** y **TypeScript**, utilizando una arquitectura por capas, principios SOLID y TDD.

---

## 🛠 Requisitos Previos

Para ejecutar este proyecto localmente, asegúrate de tener instalado:

* **Node.js**: v18 o superior.
* **npm**: (viene con Node.js).
* **Docker & Docker Compose**: Necesario para levantar la base de datos PostgreSQL.

---

## ⚙️ Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/GianPierree/prueba-tecnica-backend
    cd prueba-tecnica-backend
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Copia el archivo de ejemplo y renómbralo a `.env`.
    ```bash
    cp .env.example .env
    ```
    *Asegúrate de rellenar las credenciales (especialmente `JWT_SECRET` y las credenciales de GitHub si vas a probar OAuth).*

4.  **Levantar la Base de Datos:**
    Utilizamos Docker Compose para iniciar PostgreSQL y cargar los datos semilla automáticamente.
    ```bash
    docker-compose up -d
    ```

5.  **Iniciar el servidor en modo desarrollo:**
    ```bash
    npm run dev
    ```
    El servidor correrá en `http://localhost:3000`.

---

## 💾 Base de Datos y Seeding

El proyecto utiliza **PostgreSQL** orquestado vía Docker.

### Carga Automática de Datos (Seeds)
La persistencia y carga de datos iniciales se maneja a través del volumen configurado en `docker-compose.yml`, el cual ejecuta el script `./databases/init.sql` al iniciar el contenedor por primera vez.

**Datos cargados por defecto:**
* **Tablas:** `authors`, `themes`, `jokes`.
* **Autores:** 4 registros (Manolito, Pepe, Isabel, Pedro).
* **Temáticas:** 3 registros (Humor Negro, Humor Amarillo, Chistes Verdes).
* **Chistes:** 36 chistes pre-cargados distribuidos equitativamente.

> **Nota:** Si necesitas reiniciar la base de datos desde cero (para recargar los seeds), ejecuta:
> `docker-compose down -v && docker-compose up -d`

---

## 🏗 Arquitectura del Proyecto

El proyecto sigue una **Arquitectura Limpia (Clean Architecture)** organizada por capas para asegurar la escalabilidad, mantenibilidad y testabilidad.

### Estructura de Carpetas
* **`src/controllers`**: Manejan las peticiones HTTP, validan la entrada básica y responden al cliente.
* **`src/services`**: Contienen toda la lógica de negocio. No conocen de HTTP ni de base de datos directa.
* **`src/repositories`**: Capa de acceso a datos (TypeORM) para interactuar con la Base de Datos.
* **`src/providers`**: Implementaciones de servicios externos y patrones de diseño (GitHub Auth, Notificaciones, APIs externas de chistes).
* **`src/dtos`**: (Data Transfer Objects) Clases para validar los datos de entrada.
* **`src/entities`**: Modelos que representan las tablas de la base de datos.
* **`src/middlewares`**: Validaciones de JWT, Roles y manejo de errores.

### Patrones de Diseño Aplicados
* **Inyección de Dependencias**: Los servicios reciben sus dependencias en el constructor, facilitando el testing.
* **Strategy Pattern**: Implementado en el sistema de Alertas (`NotificationFactory`) para cambiar entre Email y SMS.
* **Factory Pattern**: Utilizado para instanciar proveedores de autenticación (GitHub/Google) y notificadores.
* **Repository Pattern**: Desacopla la lógica de negocio del acceso a datos.

---

## 🔑 Variables de Entorno

Asegúrate de tener las siguientes variables en tu `.env`:

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=root
DB_NAME=jokes_db

# Seguridad
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRES_IN=1h

# OAuth (GitHub)
GITHUB_CLIENT_ID=tu_client_id
GITHUB_CLIENT_SECRET=tu_client_secret
```

> **Nota:** Algunos nombres están en español porque así se pedía en la prueba técnica.