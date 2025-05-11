# School Vaccination Portal - Backend

This is the backend server for the School Vaccination Portal, using Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a PostgreSQL database:
```sql
CREATE DATABASE school_vaccination_portal;
```

3. Create a `.env` file in the root directory with the following variables:
```
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=school_vaccination_portal
DB_PASSWORD=your_db_password
DB_PORT=5432
PORT=5000
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /api/test-db`: Test database connection

## Database Schema

The database schema will be created using migrations. See the `migrations` directory for details.

## Development

- The server runs on port 5000 by default
- Nodemon is used for development to automatically restart the server on file changes
- CORS is enabled for development purposes

## Production

For production deployment:
1. Set `NODE_ENV=production` in the `.env` file
2. Configure SSL for the database connection
3. Use proper security measures for environment variables 