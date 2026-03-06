const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Intentando conectar a MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4 // <-- Esto fuerza IPv4 (importante)
    });
    
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📁 Base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;