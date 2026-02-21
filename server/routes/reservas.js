const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

// Crear transporter de Ethereal (pruebas)
const crearTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();
  
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
};

// Validaciones
const validarReserva = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('telefono').notEmpty().withMessage('El teléfono es obligatorio'),
  body('fechaEntrada').isISO8601().withMessage('Fecha de entrada inválida'),
  body('fechaSalida').isISO8601().withMessage('Fecha de salida inválida'),
  body('tipoHabitacion').notEmpty().withMessage('Tipo de habitación obligatorio'),
  body('huespedes').isInt({ min: 1, max: 6 }).withMessage('Número de huéspedes inválido')
];

router.post('/', validarReserva, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    nombre,
    email,
    telefono,
    fechaEntrada,
    fechaSalida,
    tipoHabitacion,
    huespedes,
    servicios,
    comentarios,
    noches,
    total
  } = req.body;

  const entrada = new Date(fechaEntrada).toLocaleDateString('es-ES');
  const salida = new Date(fechaSalida).toLocaleDateString('es-ES');

  try {
    const transporter = await crearTransporter();
    
    const serviciosMap = {
      desayuno: 'Desayuno Buffet',
      spa: 'Acceso al Spa',
      cena: 'Cena Gourmet',
      tour: 'Tour por los Andes'
    };
    
    const mailOptions = {
      from: '"Hotel Valera" <rodriguezhernandezlo@uvm.edu.ve>',
      to: email,
      subject: 'Confirmación de solicitud de reserva - Hotel Valera',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">¡Gracias por tu reserva, ${nombre}!</h1>
          
          <p>Hemos recibido tu solicitud de reserva en Hotel Valera. A continuación los detalles:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1f2937; margin-top: 0;">Detalles de la reserva</h2>
            
            <p><strong>Fechas:</strong> ${entrada} - ${salida}</p>
            <p><strong>Noches:</strong> ${noches}</p>
            <p><strong>Habitación:</strong> ${tipoHabitacion === 'estandar' ? 'Habitación Estándar' : 'Suite de Lujo'}</p>
            <p><strong>Huéspedes:</strong> ${huespedes}</p>
            <p><strong>Teléfono de contacto:</strong> ${telefono}</p>
            
            ${servicios && servicios.length > 0 ? `
              <p><strong>Servicios adicionales:</strong></p>
              <ul>
                ${servicios.map(s => `<li>${serviciosMap[s] || s}</li>`).join('')}
              </ul>
            ` : ''}
            
            ${comentarios ? `<p><strong>Comentarios:</strong> ${comentarios}</p>` : ''}
            
            <h3 style="color: #2563eb; font-size: 24px; margin-bottom: 0;">Total estimado: $${total}</h3>
          </div>
          
          <h2>Próximos pasos:</h2>
          <ol>
            <li>Uno de nuestros asesores se comunicará contigo en las próximas 24 horas</li>
            <li>Te enviaremos las opciones de pago disponibles</li>
            <li>Una vez confirmado el pago, tu reserva quedará asegurada</li>
          </ol>
          
          <div style="background-color: #e5f2ff; padding: 20px; border-radius: 8px;">
            <h3 style="color: #1f2937; margin-top: 0;">Información de contacto</h3>
            <p><strong>Hotel Valera</strong></p>
            <p>📞 0412-9089673</p>
            <p>✉️ rodriguezhernandezlo@uvm.edu.ve</p>
            <p>📍 Avenida Páez, entre calles 5 y 6, Sector Centro.  La Puerta, Valera, Estado Trujillo.</p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    
    console.log('📨 Reserva recibida de:', nombre, email);
    console.log('   Ver correo:', previewUrl);
    
    res.status(200).json({ 
      message: 'Reserva procesada correctamente',
      enviado: true,
      previewUrl
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error al procesar la reserva' 
    });
  }
});

module.exports = router;