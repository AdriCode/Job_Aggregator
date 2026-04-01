import { Router } from 'express';
const router = Router();
import { getAllJobs } from '../controllers/jobController.js';
import fetchFromJSearch from '../cron/fetchJobs.js';

router.get('/', getAllJobs);

router.get('/fetch-now', async (req, res) => {
  await fetchFromJSearch();
  res.json({ message: 'Fetch complete' });
});

export default router;