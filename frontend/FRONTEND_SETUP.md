# Smart Waste Management System - Frontend

## Frontend Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create .env file in frontend folder (optional):**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

**Development mode:**

```bash
npm run dev
```

**Build for production:**

```bash
npm run build
```

**Preview production build:**

```bash
npm run preview
```

The frontend will start on `http://localhost:5173` (default Vite port)

### Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── AuthForm.jsx    # Auth form component
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── pages/              # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── SubmitComplaint.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── AdminComplaints.jsx
│   ├── services/           # API calls
│   │   └── api.js          # Axios configuration
│   ├── context/            # React Context
│   │   └── AuthContext.jsx # Auth state management
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.js      # Auth hook
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Tailwind CSS
├── public/                 # Static files
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

### Features

#### Public User

- Register new account
- Login with email and password
- View own complaints
- Submit new waste complaints with:
  - Waste type selection
  - Description
  - Location
  - Image upload
- Track complaint status:
  - Pending
  - In Progress
  - Completed

#### Admin User

- View all complaints
- See complaint statistics:
  - Total complaints
  - Pending count
  - In Progress count
  - Completed count
  - Breakdown by waste type
- Update complaint status
- Add admin notes to complaints
- Delete complaints
- View complaint images and user details

### API Integration

The frontend uses Axios to communicate with the backend API at `http://localhost:5000/api`

#### Authentication Flow

1. User registers or logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent in `Authorization: Bearer {token}` header for all requests
5. Token automatically refreshed via Axios interceptors

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Troubleshooting

- **API connection error:** Ensure backend is running on port 5000
- **Port already in use:** Change port in vite.config.js
- **Module not found:** Run `npm install` again
- **Tailwind not working:** Ensure tailwind.config.js and postcss.config.js exist
