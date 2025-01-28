import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routers/authRouter.js';
import { studentRouter } from './routers/studentRouter.js';
import DBconnection from './database/connect.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = 5000;
app.use(cookieParser());

// Middleware to handle CORS
// app.use(cors());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));


// Middleware to parse JSON requests
app.use(express.json());
// app.use('/',function (req, res) {
//   var randomNumber=Math.random().toString();
//   randomNumber=randomNumber.substring(2,randomNumber.length);
//   res.cookie('cokkieName',randomNumber, { maxAge: 900000, httpOnly: true })

//   console.log('cookie have created successfully');
//   next();
// });
app.use('/auth', authRouter);
app.use('/dashboard', studentRouter);
//app.use('/', (req,res) => {
//  res.send('Welcome to the Home Page. Go to /auth to login or register');
//});
// Serve React app for undefined routes
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  } else {
      next();
  }
});

DBconnection().then(() => {
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
}).catch((error) => {
  console.error('Could not connect to database:', error);
});

