import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import History from './models/History.js'; // Asegúrate de importar tu modelo de historial

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a la base de datos
connectDB();

// Middleware
app.use(cors()); // Usa el middleware cors en todas las solicitudes

// Resto del código del servidor...

// Manejar las solicitudes OPTIONS manualmente
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

app.use(express.json());

// Modelo de Mongoose para el historial de búsquedas
const HistorySchema = new mongoose.Schema({
  city: String,
  country: String,
  temperature: Number,
  condition: Number,
  conditionText: String,
  icon: String,
  date: { type: Date, default: Date.now },
});


// Ruta para guardar el historial de búsquedas
app.post('/api/history', async (req, res) => {
    try {
      const { city, country, temperature, condition, conditionText, icon } = req.body;
      const newHistory = new History({ city, country, temperature, condition, conditionText, icon });
      await newHistory.save();
      console.log('Historial guardado correctamente:', newHistory); // Mensaje de consola para historial guardado correctamente
      res.status(201).json(newHistory);
    } catch (error) {
      console.error('Error al guardar el historial:', error); // Mensaje de consola para errores al guardar el historial
      res.status(500).json({ error: 'Failed to save history' });
    }
  });
  // Ruta para obtener el historial
  app.get('/api/history', async (req, res) => {
    try {
      const historial = await History.find().sort({ date: -1 });
      res.json(historial);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  


// Ruta de prueba para verificar la conexión a MongoDB
app.get('/api/test-connection', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ message: 'MongoDB connection is healthy' });
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection error', error });
  }
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
