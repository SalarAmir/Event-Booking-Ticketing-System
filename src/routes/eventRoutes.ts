import { Router } from 'express';
import { getEvents, createEvent } from '../controllers/eventController';
import { validateInput } from '../middleware/validateInput';
import { eventSchema } from '../validators/eventValidator';

const router = Router();

router.get('/', getEvents);
router.post('/', validateInput(eventSchema), createEvent);

export default router;