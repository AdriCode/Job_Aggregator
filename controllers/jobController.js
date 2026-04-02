import Job from '../models/Job.js';

// Get jobs with filtering and sorting
export async function getAllJobs(req, res) {
  try {
    const { type, location, search, sortByDeadline } = req.query;

    let filter = { isActive: true };

    if (type) filter.type = type;

    if (location) filter.location = { $regex: location, $options: 'i' };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    let query = Job.find(filter);

    if (sortByDeadline === 'true') {
      // Sort by deadline: jobs with deadline first (soonest first), then jobs without deadline
      query = query.sort({ 
        deadline: 1,  // Ascending: soonest first
        postedAt: -1  // Then by posted date (newest first)
      });
    } else {
      query = query.sort({ postedAt: -1 });  // Default: newest first
    }

    const jobs = await query.limit(50);

    res.json({ count: jobs.length, jobs });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get job by ID
export async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new job
export async function createJob(req, res) {
  const job = new Job(req.body);
  try {
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update a job
export async function updateJob(req, res) {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete a job
export async function deleteJob(req, res) {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
