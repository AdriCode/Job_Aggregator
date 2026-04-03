# JobRadar 🔍
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

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally

### Installation
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
Create a `.env` file in the root directory:
```
MONGO_URI=mongodb://localhost:27017/jobAggregator
PORT=5000
JSEARCH_API_KEY=your_key_here
JWT_SECRET=your_secret_here
```
Get your JSearch API key from [RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch).

### Running the app
```bash
# Start backend (from root)
node server.js

# Start frontend (from client/)
npm start
```

### Manually trigger job fetch
```
GET http://localhost:5000/api/jobs/fetch-now
```

## API Endpoints

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/api/jobs` | Get all jobs with filters | No |
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/user/bookmark/:jobId` | Toggle bookmark | Yes |
| POST | `/api/user/application` | Track application | Yes |
| GET | `/api/user/applications` | Get all applications | Yes |
