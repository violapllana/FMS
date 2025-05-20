// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const passport = require('passport');
// const passportConfig = require('./passport'); // konfigurohet për Google/Facebook
// const contactRoutes = require('./routes/contactRoutes');
// const bookRoutes = require('./routes/bookRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const profesorRoutes = require('./routes/profesorRoutes');
// const studentRoutes = require('./routes/studentRoutes');
// const authRoutes = require('./routes/userRoutes');
// const departmentRoutes = require('./routes/departmentRoutes');


// dotenv.config();
// connectDB();

// const app = express();

// // ✅ Middleware për siguri
// app.use(helmet());
// app.use(rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 900,
// }));

// // ✅ CORS konfigurimi
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };
// app.use(cors(corsOptions));

// // ✅ Header manual për siguri CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// // ✅ Middleware bazë
// app.use(express.static('public'));
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Session dhe Passport konfigurimi (vetëm një herë!)
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'supersecret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 24 * 60 * 60 * 1000, // 1 ditë
//   }
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // ✅ Swagger Dokumentim
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Fakulteti API',
//       version: '1.0.0',
//       description: 'API për menaxhimin e fakultetit (Regjistrim, Login, etj.)',
//     },
//   },
//   apis: ['./routes/*.js'],
// };

// // Example endpoint to handle OAuth callback
// app.post('/google', async (req, res) => {
//   try {
//     const { email, name, profilePicture, googleId } = req.body; // These should come from the OAuth provider

//     // Check if the user already exists by email
//     let user = await User.findOne({ where: { email } });

//     if (!user) {
//       // If the user doesn't exist, create a new one
//       user = await User.create({
//         email,
//         name,
//         profilePicture, // You can also store other details like Google ID
//         googleId, // Store the googleId or any other provider's unique identifier
//         role: 'student', // You can set the default role based on the provider
//       });
//     }

//     // Optionally generate a JWT token for the user
//     const token = jwt.sign({ userId: user.id, role: user.role }, 'sekretishumifshehte', { expiresIn: '1h' });

//     // Send the token as a response (this token can be stored on the frontend)
//     res.json({ token });

//   } catch (error) {
//     console.error('Error during OAuth callback', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // ✅ Rrugët API
// app.use('/api/auth', authRoutes); 
// app.use('/books', bookRoutes); // Routes për librat
// app.use('/contact', contactRoutes);
// app.use('/api/admins', adminRoutes);
// app.use('/api/profesors', profesorRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/departments', departmentRoutes);




// // ✅ Startimi i serverit
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Serveri është duke dëgjuar në portin ${port}`);
//   console.log(`🔗 Swagger dokumentimi: http://localhost:${port}/api-docs`);
// });
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
const passportConfig = require('./passport'); // konfigurohet për Google/Facebook
const contactRoutes = require('./routes/contactRoutes');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const multer = require('multer');           // Shtojmë multer
const path = require('path');
const jwt = require('jsonwebtoken');        // Nëse përdoret jwt në endpoint
const User = require('./models/User');      // Sigurohu që ky model ekziston dhe rruge e saktë

dotenv.config();
connectDB();

const app = express();

// ✅ Konfigurimi i multer për ruajtjen e fotove
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // Emri i fotos: timestamp + extensioni origjinal
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

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

// ✅ Header manual për siguri CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// ✅ Middleware bazë
app.use(express.static('public'));  // Ruaj statikisht folderin public (përfshirë uploads)
app.use(express.json());
app.use(cookieParser());

// ✅ Session dhe Passport konfigurimi (vetëm një herë!)
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 1 ditë
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

// ----------------------------
// Example OAuth endpoint (pa ndryshime)
app.post('/google', async (req, res) => {
  try {
    const { email, name, profilePicture, googleId } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email,
        name,
        profilePicture,
        googleId,
        role: 'student',
      });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'sekretishumifshehte', { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    console.error('Error during OAuth callback', error);
    res.status(500).send('Internal Server Error');
  }
});

// ----------------------------
// API Routes
app.use('/api/auth', authRoutes);

// Për shembull: në bookRoutes, për upload foto përdor multer
// Në bookRoutes do përdorim middleware upload.single('image') për endpoint që ngarkon foto
app.use('/books', bookRoutes);

app.use('/contact', contactRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/profesors', profesorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/departments', departmentRoutes);

// ----------------------------
// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Serveri është duke dëgjuar në portin ${port}`);
  console.log(`🔗 Swagger dokumentimi: http://localhost:${port}/api-docs`);
});

// Eksportimi i multer-it për përdorim në routerët ku ka nevojë
module.exports = { upload };
