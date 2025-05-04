const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fakulteti API',
      version: '1.0.0',
      description: 'API për menaxhimin e fakultetit (Regjistrim, Login, etj.)',
    },
  },
  apis: ['./routes/*.js'], // rrugët për dokumentimin (përfshihet `userRoutes.js`)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', require('./routes/userRoutes'));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Serveri është duke dëgjuar në portin ${port}`);
  console.log(`🔗 Swagger dokumentimi: http://localhost:${port}/api-docs`);
});
