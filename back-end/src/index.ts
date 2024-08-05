import prisma from './client';

// Declare an asynchronous main
async function main() {
  console.log('Database connected');
}

// Run main
main()
  .catch((e) => {
    // Throw on error	
    throw new Error(`Failed to initialize database: ${e}`);
  })
  .finally(async () => {
    // Disconnect client after main
    await prisma.$disconnect();
  });