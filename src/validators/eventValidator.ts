import { z } from 'zod';

export const eventSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    dateTime: z.string().datetime({ message: "Invalid ISO datetime string (e.g., 2026-05-15T10:00:00Z)" }),
    capacity: z.number().int().positive("Capacity must be a positive integer"),
    organiserId: z.string().uuid("Invalid Organiser ID format") // Passed in body for now!
  })
});