import { Router } from 'express';
import { createBooking } from '../controllers/bookingController';
import { validateInput } from '../middleware/validateInput';
import { bookingSchema } from '../validators/bookingValidator';

const router = Router();

router.post('/', validateInput(bookingSchema), createBooking);

export default router;