# JobRadar 🔍
<<<<<<< HEAD
A full-stack MERN job aggregator that automatically collects internship 
and full-time listings daily from multiple sources and displays them in 
one place with smart filtering, bookmarks, and application tracking.

---

## Features
- 🔄 **Automated daily pipeline** — cron job fetches fresh listings every midnight
- 🌐 **Multi-source aggregation** — JSearch API (LinkedIn/Indeed) + Puppeteer scraper (Internshala)
- 🔍 **Smart filtering** — filter by role, type, location, deadline
- 🔐 **JWT Authentication** — secure register/login with bcrypt password hashing
- 🔖 **Per-user bookmarks** — saved jobs stored in MongoDB per account
- 📊 **Application tracker** — track status across Saved, Applied, Interviewing, Rejected, Offered
- ⚡ **Debounced search** — API called only when user stops typing

---

## Tech Stack

**Backend**
- Node.js, Express
- MongoDB, Mongoose
- JWT (jsonwebtoken), bcryptjs
- node-cron, Puppeteer, Axios

**Frontend**
- React, React Router v6
- Context API
- Axios with request interceptors

---

## Architecture
Internshala (Puppeteer scraper) ──┐
├──→ MongoDB ──→ Express REST API ──→ React UI
JSearch API (Axios) ───────────────┘          ↑
node-cron
(runs daily at midnight)
Auth: JWT + bcrypt → per-user bookmarks + application tracker

---

## Project Structure
job-aggregator/
├── server.js
├── .env
├── models/
│   ├── Job.js
│   └── User.js
├── controllers/
│   ├── jobController.js
│   ├── authController.js
│   └── userController.js
├── routes/
│   ├── jobs.js
│   ├── auth.js
│   └── user.js
├── middleware/
│   └── auth.js
├── cron/
│   ├── scheduler.js
│   └── fetchJobs.js
├── scrapers/
│   └── internshala.js
└── client/                  (React frontend)
└── src/
├── api/
├── context/
├── components/
└── pages/

---
=======
A full-stack job aggregator that automatically collects internship and 
full-time job listings daily from multiple sources and displays them 
in one place with smart filtering.

## Features
- 🔄 **Automated daily fetch** — cron job pulls fresh listings every midnight
- 🌐 **Multi-source aggregation** — JSearch API (LinkedIn/Indeed) + Internshala scraper
- 🔍 **Smart filtering** — by role, type, location, deadline
- 🔐 **Auth system** — JWT-based login/register
- 🔖 **Bookmarks** — save jobs per user, stored in MongoDB
- 📊 **Application tracker** — track status (Applied / Interviewing / Rejected / Offered)

## Tech Stack
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs  
**Frontend:** React, React Router, Axios, Context API  
**Data pipeline:** node-cron, Puppeteer, Cheerio, JSearch API  

## Architecture
```
Internshala (Puppeteer) ─┐
                          ├──→ MongoDB ──→ Express API ──→ React UI
JSearch API (Axios) ─────┘          ↑
                               node-cron (daily midnight)
```
>>>>>>> e7dc497 (final)

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally
<<<<<<< HEAD
- RapidAPI account with JSearch subscription (free tier)

### Installation

=======

### Installation
>>>>>>> e7dc497 (final)
```bash
# Clone the repo
git clone https://github.com/AdriCode/Job_Aggregator.git
cd Job_Aggregator

# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install
```

### Environment Variables
<<<<<<< HEAD

Create a `.env` file in the root directory:
MONGO_URI=mongodb://localhost:27017/jobAggregator
PORT=5000
JSEARCH_API_KEY=your_jsearch_key_from_rapidapi
JWT_SECRET=your_long_random_secret_string

Get your JSearch API key from [RapidAPI — JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch). Free tier gives 100 requests/day.

### Running the App

=======
Create a `.env` file in the root directory:
```
MONGO_URI=mongodb://localhost:27017/jobAggregator
PORT=5000
JSEARCH_API_KEY=your_key_here
JWT_SECRET=your_secret_here
```
Get your JSearch API key from [RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch).

### Running the app
>>>>>>> e7dc497 (final)
```bash
# Start backend (from root)
node server.js

# Start frontend (from client/)
npm start
```

<<<<<<< HEAD
Backend runs on `http://localhost:5000`  
Frontend runs on `http://localhost:3000`

### Manually trigger job fetch (development)
GET http://localhost:5000/api/jobs/fetch-now

---

## API Reference

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/jobs` | Get jobs with filters | No |
| GET | `/api/jobs?type=internship` | Filter by type | No |
| GET | `/api/jobs?search=react` | Search by keyword | No |
| GET | `/api/jobs?sortByDeadline=true` | Sort by deadline | No |
| POST | `/api/auth/register` | Register new user | No |
=======
### Manually trigger job fetch
```
GET http://localhost:5000/api/jobs/fetch-now
```

## API Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/api/jobs` | Get all jobs with filters | No |
| POST | `/api/auth/register` | Register user | No |
>>>>>>> e7dc497 (final)
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/user/bookmark/:jobId` | Toggle bookmark | Yes |
| POST | `/api/user/application` | Track application | Yes |
| GET | `/api/user/applications` | Get all applications | Yes |
<<<<<<< HEAD

---

## How the Data Pipeline Works

1. `node-cron` fires every midnight (`0 0 * * *`)
2. `fetchFromJSearch()` calls JSearch API with 3 search queries
3. `scrapeInternshala()` launches headless Chrome via Puppeteer, navigates to Internshala, waits for dynamic content to load, extracts job cards
4. Both sources normalize data into the same Job schema
5. MongoDB unique index on `applyLink` silently prevents duplicates
6. Fresh jobs are immediately available via the REST API

---

## Key Implementation Details

**Why Puppeteer over Cheerio for Internshala**  
Internshala renders job listings dynamically with JavaScript. Cheerio only parses static HTML and cannot execute scripts — the job cards simply don't exist in the raw HTML. Puppeteer launches a real headless Chrome browser, waits for JavaScript to execute and the DOM to populate, then extracts data from the fully rendered page.

**JWT Authentication flow**  
On login/register, server signs a JWT with a secret key and returns it. React stores it in localStorage. An axios interceptor automatically attaches it as a Bearer token on every subsequent request. The `protect` middleware on the backend verifies the signature on every protected route.

**Duplicate prevention**  
A unique index on the `applyLink` field in the Job schema ensures no duplicate listings accumulate across daily cron runs. Duplicate key errors (code 11000) are caught and silently skipped.

**Debounced search**  
Search input uses a 500ms debounce via `setTimeout` inside `useEffect`. The cleanup function cancels the previous timer on each keystroke, ensuring only one API call fires after the user stops typing.

---

## Planned Improvements
- Email notifications via Nodemailer when bookmarked job deadlines are within 3 days
- Pagination instead of fixed 50-job limit
- Add Unstop.com scraper for college-specific listings
- Admin dashboard to manage job sources
- Deploy backend on Railway, frontend on Vercel

---

## Author
**Ashwath Bhuyan**  
B.Tech Information Technology, Delhi Technological University  
[GitHub](https://github.com/AdriCode) • ashbhuyan26@gmail.com
=======
>>>>>>> e7dc497 (final)
