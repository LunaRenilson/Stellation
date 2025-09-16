import express from 'express';
import personRoutes from './routes/personRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Use routes
app.use('/persons', personRoutes);
app.use('/properties', propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

