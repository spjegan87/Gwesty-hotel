
# Gwesty - Hotel Booking Application

A modern hotel booking platform built with React, TypeScript, and Express.js that allows users to search, view, and book hotels seamlessly.

## Features

- **Hotel Search & Filters**: 
  - Search hotels by destination
  - Filter by price range, amenities, and ratings
  - Toggle between grid and list views
  - Real-time search results

- **Booking Management**:
  - Easy booking process
  - Booking confirmation system
  - View booking history
  - Real-time availability checking

- **User Experience**:
  - Responsive design for all devices
  - Interactive hotel details with image galleries
  - Real-time pricing updates
  - Notification system
  - Newsletter subscription

- **Content Features**:
  - Travel blog section
  - Destination guides
  - Hotel reviews and ratings
  - Popular hotels showcase

## Technology Stack

### Frontend
- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight routing
- **State Management**: React Query for server state
- **UI Components**: 
  - Shadcn/ui components
  - Tailwind CSS for styling
  - Lucide React for icons
  - Framer Motion for animations

### Backend
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **API**: RESTful architecture
- **Authentication**: Session-based with Passport.js

### Development Tools
- **Build Tool**: Vite
- **Package Manager**: npm
- **Type Checking**: TypeScript
- **Form Handling**: React Hook Form with Zod validation

## Project Structure

```
├── client/           # React frontend application
│   ├── components/   # Reusable UI components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utility functions and configurations
├── server/           # Express backend server
│   ├── data/         # Sample data and seeds
│   └── routes/       # API route handlers
└── shared/           # Shared TypeScript types
```

## Development Workflow

1. **Setup**:
   ```bash
   npm install        # Install dependencies
   ```

2. **Development**:
   ```bash
   npm run dev        # Start development server
   ```
   - Frontend runs on port 5173
   - Backend API runs on port 5000

3. **Type Checking**:
   ```bash
   npm run check      # Run TypeScript checks
   ```

4. **Database**:
   ```bash
   npm run db:push    # Update database schema
   ```

## API Endpoints

- `GET /api/hotels` - List hotels with filters
- `GET /api/hotels/:id` - Get hotel details
- `GET /api/destinations` - List destinations
- `GET /api/blogs` - Get blog posts
- `POST /api/bookings` - Create booking
- `GET /api/bookings/history` - Get booking history

## Deployment

The application is configured for deployment on Replit:
1. Push your changes to the repository
2. Replit will automatically build and deploy the application
3. Access your application through the provided Replit URL

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL database connection string
- `SESSION_SECRET`: Secret for session management
- `NODE_ENV`: Application environment (development/production)
