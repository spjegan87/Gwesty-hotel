import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize database with seed data
  try {
    log("Initializing database with seed data...");
    await storage.initializeData();
    log("Database initialization complete");
  } catch (error) {
    log(`Error initializing database: ${error}`, "error");
  }
  // Hotels endpoints
  app.get("/api/hotels", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const filters = {
        destination: req.query.destination,
        priceMin: req.query.priceMin ? parseInt(req.query.priceMin as string) : undefined,
        priceMax: req.query.priceMax ? parseInt(req.query.priceMax as string) : undefined,
        starRating: req.query.starRating ? (req.query.starRating as string).split(',').map(Number) : undefined,
        hotelFacilities: req.query.hotelFacilities ? (req.query.hotelFacilities as string).split(',') : undefined,
      };
      
      const result = await storage.getHotels(page, filters);
      res.json(result);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      res.status(500).json({ message: "Failed to fetch hotels" });
    }
  });

  app.get("/api/hotels/popular", async (req, res) => {
    try {
      const hotels = await storage.getPopularHotels();
      res.json(hotels);
    } catch (error) {
      console.error("Error fetching popular hotels:", error);
      res.status(500).json({ message: "Failed to fetch popular hotels" });
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const hotelId = parseInt(req.params.id);
      const hotel = await storage.getHotelById(hotelId);
      
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      
      res.json(hotel);
    } catch (error) {
      console.error("Error fetching hotel:", error);
      res.status(500).json({ message: "Failed to fetch hotel details" });
    }
  });

  // Destinations endpoints
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  // Blogs endpoints
  app.get("/api/blogs", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const category = req.query.category as string;
      
      const result = await storage.getBlogs(page, category);
      res.json(result);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/recent", async (req, res) => {
    try {
      const blogs = await storage.getRecentBlogs();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
      res.status(500).json({ message: "Failed to fetch recent blogs" });
    }
  });

  app.get("/api/blogs/categories", async (req, res) => {
    try {
      const categories = await storage.getBlogCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching blog categories:", error);
      res.status(500).json({ message: "Failed to fetch blog categories" });
    }
  });

  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const blogId = parseInt(req.params.id);
      const blog = await storage.getBlogById(blogId);
      
      if (!blog) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ message: "Failed to fetch blog details" });
    }
  });

  // Bookings endpoints
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = req.body;
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings/history", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the auth session
      // For demo purposes, we'll return all bookings
      const bookings = await storage.getUserBookings(1);
      
      // Enhance bookings with hotel data
      const enhancedBookings = await Promise.all(
        bookings.map(async (booking) => {
          const hotel = await storage.getHotelById(booking.hotelId);
          return {
            ...booking,
            hotel: {
              id: hotel?.id,
              name: hotel?.name,
              image: hotel?.images[0],
              location: hotel?.location,
              rating: hotel?.rating
            },
            originalPrice: Number(booking.roomRate) + Number(booking.tax),
            discountedPrice: Number(booking.totalAmount)
          };
        })
      );
      
      res.json(enhancedBookings);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      res.status(500).json({ message: "Failed to fetch booking history" });
    }
  });

  app.get("/api/bookings/latest", async (req, res) => {
    try {
      const booking = await storage.getLatestBooking();
      
      if (!booking) {
        return res.status(404).json({ message: "No booking found" });
      }
      
      const hotel = await storage.getHotelById(booking.hotelId);
      
      // Enhance booking with hotel data
      const enhancedBooking = {
        ...booking,
        hotel: {
          id: hotel?.id,
          name: hotel?.name,
          image: hotel?.images[0],
          location: hotel?.location
        },
        nights: 2 // Mock value
      };
      
      res.json(enhancedBooking);
    } catch (error) {
      console.error("Error fetching latest booking:", error);
      res.status(500).json({ message: "Failed to fetch latest booking" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
