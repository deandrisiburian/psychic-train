# EpanDCloud - REST API Platform

EpanDCloud is a modern, responsive platform to create, manage, and test your REST API endpoints.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT, bcryptjs

## Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
# Install frontend dependencies
npm install

# Install server dependencies (separate directory)
cd server
npm install
```

### 2. Configuration
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Running the application
```bash
# Run frontend
npm run dev

# Run backend
cd server
node index.js
```

### 4. Admin Credentials
The following account is auto-seeded on first run:
- **Username**: `epandcloudnesia`
- **Password**: `epandcloudpunyaepand`

## API Usage Examples

### Authentication
**POST** `/api/auth/login`
```json
{
  "username": "epandcloudnesia",
  "password": "epandcloudpunyaepand"
}
```

### Dynamic Endpoints
Any endpoint you create via the Admin Panel can be accessed by replacing `/api/` with `/api/dynamic/` in the URL (on the real server implementation).
Example: If you created `/api/v1/test`, you can access it via:
**GET** `http://localhost:5000/api/dynamic/v1/test`

## Features
- **Playground**: Test endpoints with real-time response visualization.
- **Admin Panel**: Full CRUD operations for endpoints.
- **Traffic Logs**: Monitor every request and its status.
- **Mobile Responsive**: Custom bottom navigation for mobile users.
- **Secure**: Protected administrative routes and rate limiting.

---
© 2026 EpanDCloud Indonesia
