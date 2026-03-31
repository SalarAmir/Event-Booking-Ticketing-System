import { z } from 'zod';

export const bookingSchema = z.object({
  body: z.object({
    eventId: z.string().uuid("Invalid Event ID"),
    attendeeId: z.string().uuid("Invalid Attendee ID") // Passed in body for now!
  })
});