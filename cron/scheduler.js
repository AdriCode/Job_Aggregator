import { schedule } from 'node-cron';
import fetchFromJSearch from './fetchJobs.js';

// runs every day at midnight
schedule('0 0 * * *', async () => {
  console.log('Cron triggered — fetching jobs...');
  await fetchFromJSearch();
});

console.log('Scheduler initialized');
