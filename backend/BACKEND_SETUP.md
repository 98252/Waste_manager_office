# Smart Waste Management System - Backend

## Backend Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud connection string)
- npm or yarn

### Installation

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create .env file in backend folder with:**

   ```
   MONGO_URI=mongodb://localhost:27017/waste_management
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   PORT=5000
   NODE_ENV=development
   ```

4. **Replace MongoDB connection string if using cloud:**
   - For MongoDB Atlas: `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/waste_management`
   - Make sure database name is `waste_management`

### Running the Server

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will start on `http://localhost:5000`

### API Endpoints

#### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

#### Complaint Endpoints

- `POST /api/complaints` - Create complaint with image (requires token)
- `GET /api/complaints` - Get complaints (all for admin, own for user)
- `GET /api/complaints/:id` - Get single complaint
- `PATCH /api/complaints/:id` - Update complaint status (admin only)
- `DELETE /api/complaints/:id` - Delete complaint
- `GET /api/complaints/stats` - Get statistics (admin only)

### Testing API with cURL or Postman

1. **Register:**

   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "phone": "1234567890",
       "address": "123 Main St"
     }'
   ```

2. **Login:**

   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "password123"
     }'
   ```

3. **Create Complaint (with token from login):**
   ```bash
   curl -X POST http://localhost:5000/api/complaints \
     -H "Content-Type: multipart/form-data" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -F "wasteType=Plastic" \
     -F "description=Plastic bags on the street" \
     -F "location=Main Street" \
     -F "latitude=40.7128" \
     -F "longitude=-74.0060" \
     -F "image=@/path/to/image.jpg"
   ```

### Troubleshooting

- **MongoDB connection error:** Ensure MongoDB is running or connection string is correct
- **Port already in use:** Change PORT in .env file
- **CORS error:** Check origin in server.js matches frontend URL
- **Image upload fails:** Ensure uploads folder has write permissions
