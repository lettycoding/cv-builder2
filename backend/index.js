import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import userRoutes from './Routes/userroute.js';
import linkedinroutes from './Routes/linkedin.router.js';
import aiRoutes from './Routes/ai.route.js';

const app = express();

// Enable CORS for your frontend (adjust origin as needed)
app.use(cors({
  origin: 'http://localhost:5173', // React dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/linkedin', linkedinroutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
})();