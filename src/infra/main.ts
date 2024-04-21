import 'reflect-metadata';
import 'dotenv/config';
import './config/module-alias';

import { prisma } from './database/connection';

const main = async (): Promise<void> => {
  try {
    await prisma.$connect();
    const app = (await import('./app')).default;

    const server = app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

    ['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, async (): Promise<void> => {
        await prisma.$disconnect();
        server.close();
        process.exit();
      });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main().catch(console.error);
