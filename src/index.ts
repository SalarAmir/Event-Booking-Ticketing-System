import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Proper RESTful route structure
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});