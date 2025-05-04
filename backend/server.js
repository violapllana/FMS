const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport'); // ✅ mungonte

dotenv.config(); // ngarko .env përpara çdo gjëje që e përdor
connectDB();     // lidhu me DB

const app = express();

// ✅ Middleware për siguri
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 900,
}));

// ✅ CORS konfigurimi
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// ✅ Header manual për kontroll më të plotë
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// ✅ Middleware bazë
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// ✅ Session dhe Passport konfigurimi
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Swagger Dokumentim
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fakulteti API',
      version: '1.0.0',
      description: 'API për menaxhimin e fakultetit (Regjistrim, Login, etj.)',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Rrugët
app.use('/api/auth', require('./routes/userRoutes'));

// ✅ Nisja e serverit
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Serveri është duke dëgjuar në portin ${port}`);
  console.log(`🔗 Swagger dokumentimi: http://localhost:${port}/api-docs`);
});
