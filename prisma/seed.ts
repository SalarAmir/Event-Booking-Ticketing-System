import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Initialize Prisma exactly as we did for the database connection
const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // 1. Create an Organiser
  const organiser = await prisma.user.create({
    data: {
      email: 'admin@events.com',
      password: 'password123', 
      role: 'ORGANISER',
    },
  });

  // 2. Create an Attendee
  const attendee = await prisma.user.create({
    data: {
      email: 'student@uni.edu',
      password: 'password123',
      role: 'ATTENDEE',
    },
  });

  // 3. Create an Event linked to the Organiser
  const event = await prisma.event.create({
    data: {
      title: 'Spring Tech Conference',
      description: 'A massive gathering of tech enthusiasts and developers.',
      dateTime: new Date('2026-05-15T10:00:00Z'),
      capacity: 100,
      organiserId: organiser.id,
    },
  });

  console.log('Database seeded successfully!');
  console.log({ organiser, attendee, event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });