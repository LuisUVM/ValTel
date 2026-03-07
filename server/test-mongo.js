const mongoose = require('mongoose');
require('dotenv').config();

const TEST_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hotelvalera';

async function testMongoConnection() {
  console.log('🔍 Probando conexión a MongoDB...');
  console.log('📌 URI:', TEST_URI);
  
  try {
    // Intentar conectar con opciones que evitan problemas de IPv6
    await mongoose.connect(TEST_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4 // Fuerza IPv4
    });
    
    console.log('✅ CONEXIÓN EXITOSA a MongoDB');
    
    // Crear un modelo de prueba
    const Test = mongoose.model('Test', new mongoose.Schema({
      nombre: String,
      fecha: { type: Date, default: Date.now }
    }));
    
    // Guardar un documento de prueba
    const resultado = await Test.create({ nombre: 'prueba_' + Date.now() });
    console.log('✅ Documento guardado con ID:', resultado._id);
    
    // Contar documentos
    const total = await Test.countDocuments();
    console.log(`📊 Total de documentos en colección Test: ${total}`);
    
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('👋 Conexión cerrada correctamente');
    
  } catch (error) {
    console.error('❌ ERROR DE CONEXIÓN:');
    console.error('📝 Mensaje:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('💡 Sugerencia: Verifica que MongoDB esté corriendo en', TEST_URI);
    }
  }
}

// Ejecutar la prueba
testMongoConnection();