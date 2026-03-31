import { Request, Response } from 'express';
import { prisma } from '../db';

// GET /api/events -> Fetch all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        organiser: { select: { email: true } },
        _count: { select: { bookings: true } } // Shows how many people booked!
      }
    });
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// POST /api/events -> Create a new event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, dateTime, capacity, organiserId } = req.body;
    
    const event = await prisma.event.create({
      data: { title, description, dateTime: new Date(dateTime), capacity, organiserId },
    });

    return res.status(201).json({ message: 'Event created', event });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create event' });
  }
};