
# Gwesty - Hotel Booking Application

A modern hotel booking platform built with React, TypeScript, and Express.js that allows users to search, view, and book hotels.

## Features

- **Hotel Search**: Search hotels by destination, check-in/out dates, and number of guests
- **Real-time Filtering**: Filter hotels by price range, star rating, and facilities
- **Grid/List View**: Toggle between grid and list view for hotel search results
- **Booking Management**: View and manage booking history
- **Blog Section**: Read travel-related articles and guides
- **Responsive Design**: Fully responsive interface for all devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query
- **Routing**: Wouter

## Getting Started

1. Click the "Run" button to start the development server
2. The application will be available at the provided URL
3. Use the search form to find hotels by entering:
   - Destination
   - Check-in date
   - Check-out date
   - Number of guests

## Project Structure

```
├── client/           # Frontend React application
├── server/           # Backend Express.js server
└── shared/           # Shared TypeScript types
```

## API Endpoints

- `/api/hotels` - Get filtered hotel listings
- `/api/destinations` - Get available destinations
- `/api/blogs` - Get blog posts
- `/api/bookings` - Manage hotel bookings

## Development

The application runs in development mode with hot-reload enabled. Any changes to the code will automatically refresh the application.

## Deployment

The application is configured for deployment on Replit. Use the "Deploy" button to publish your changes.
