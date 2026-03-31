import { Request, Response } from 'express';
import { prisma } from '../db';

// POST /api/bookings to Book a ticket
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { eventId, attendeeId } = req.body;

    // 1. Fetch the event and count current bookings
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { bookings: true } } }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // 2. Validate Capacity (Prevent Overbooking)
    if (event._count.bookings >= event.capacity) {
      return res.status(400).json({ error: 'Event is fully booked' });
    }

    // 3. Create the booking
    const booking = await prisma.booking.create({
      data: { eventId, attendeeId },
    });

    return res.status(201).json({ message: 'Ticket booked successfully!', booking });
  } catch (error: any) {
    //(User already booked this event)
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'You have already booked a ticket for this event' });
    }
    return res.status(500).json({ error: 'Failed to process booking' });
  }
};