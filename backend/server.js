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
const passport = require('passport');
const contactRoutes = require('./routes/contactRoutes');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const multer = require('multer');        
const path = require('path');
const jwt = require('jsonwebtoken');       
const User = require('./models/User');    
const wishlistRouter = require('./routes/wishlistRouter');



dotenv.config();
connectDB();

const app = express();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {

    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 900,
}));

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));


app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  next();
});

app.use(helmet.crossOriginOpenerPolicy({ policy: "unsafe-none" }));


app.use(express.static('public'));  
app.use(express.json());
app.use(cookieParser());


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



const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fakulteti API',
      version: '1.0.0',
      description: 'API për menaxhimin e fakultetit ',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/contact', contactRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/professors', profesorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/wishlist', wishlistRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Serveri është duke dëgjuar në portin ${port}`);
  console.log(`🔗 Swagger dokumentimi: http://localhost:${port}/api-docs`);
});


module.exports = { upload };
