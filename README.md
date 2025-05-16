
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

## Product Architecture

### Overview
Gwesty follows a modern client-server architecture with a clear separation of concerns:

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────┐
│   React Client  │ <── │  Express API │ <── │  PostgreSQL │
│   (Frontend)    │     │  (Backend)   │     │  (Database) │
└─────────────────┘     └──────────────┘     └─────────────┘
```

### Architecture Layers

1. **Presentation Layer (React)**
   - Components-based UI architecture
   - Client-side routing with Wouter
   - State management with React Query
   - Form handling with React Hook Form
   - Type safety with TypeScript

2. **Application Layer (Express)**
   - RESTful API endpoints
   - Request validation
   - Business logic handling
   - Data transformation
   - Error handling

3. **Data Layer (PostgreSQL + Drizzle)**
   - Data persistence
   - Schema management
   - Data relationships
   - Query optimization

### Key Features Implementation

```
├── Authentication Flow
│   ├── Session-based auth
│   └── Protected routes
│
├── Hotel Management
│   ├── Search & filtering
│   ├── Booking system
│   └── Review system
│
├── Content Management
│   ├── Blog system
│   ├── Destination guides
│   └── Media handling
│
└── User Features
    ├── Profile management
    ├── Booking history
    └── Notifications
```

## Project Structure

```
├── client/           # React frontend application
│   ├── components/   # Reusable UI components
│   │   ├── shared/  # Common components
│   │   └── ui/      # UI component library
│   ├── pages/       # Route components
│   ├── hooks/       # Custom React hooks
│   └── lib/         # Utilities and config
├── server/          # Express backend server
│   ├── data/        # Seed data
│   ├── routes/      # API endpoints
│   └── db/          # Database operations
└── shared/          # Shared types and schemas
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
