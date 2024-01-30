// // seed.ts
// import { NestFactory } from '@nestjs/core';
// import { SeederModule } from './seeder/seeder.module'; // Import your seeder module
// import { SeederService } from './seeder/seeder.service'; // Import your seeder module

// async function seed() {
//   const app = await NestFactory.createApplicationContext(SeederModule);
//   const seeder = app.get(SeederService); // Import your seeder service
//   await seeder.seed(); // Call the seed method in your service
//   await app.close();
// }

// seed();
