import cron from 'node-cron';
console.log('Ejecutando tarea cada 5 s');

export const scheduleJobs = () => {
  cron.schedule('*/5 * * * * *', () => {
    console.log('tick');
    // Aquí va tu función
  });
};

scheduleJobs();