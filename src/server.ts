import 'dotenv/config';
import 'reflect-metadata';
import app from "./app"
import { PostgresConfig } from './configs/postgres.config';

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    // Inicializar conexión a DB
    await PostgresConfig.initialize();
    console.log('📦 Base de datos conectada correctamente');

    // Levantar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

main();