import { 
  type User, 
  type InsertUser, 
  type Hotel,
  type Destination, 
  type Blog,
  type Booking
} from "@shared/schema";
import { hotelData } from "./data/hotels";
import { blogData } from "./data/blogs";
import { destinationData } from "./data/destinations";
import { bookingData } from "./data/bookings";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Hotel methods
  getHotels(page: number, filters?: any): Promise<{ hotels: Hotel[], total: number, totalPages: number }>;
  getPopularHotels(): Promise<Hotel[]>;
  getHotelById(id: number): Promise<Hotel | undefined>;
  
  // Destination methods
  getDestinations(): Promise<Destination[]>;
  
  // Blog methods
  getBlogs(page: number, category?: string): Promise<{ blogs: Blog[], total: number, totalPages: number }>;
  getRecentBlogs(): Promise<Blog[]>;
  getBlogById(id: number): Promise<Blog | undefined>;
  getBlogCategories(): Promise<{ name: string, count: number }[]>;
  
  // Booking methods
  createBooking(booking: any): Promise<Booking>;
  getUserBookings(userId: number): Promise<Booking[]>;
  getLatestBooking(): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private hotels: Hotel[];
  private destinations: Destination[];
  private blogs: Blog[];
  private bookings: Booking[];
  private currentUserId: number;
  private currentBookingId: number;

  constructor() {
    this.users = new Map();
    this.hotels = [...hotelData];
    this.destinations = [...destinationData];
    this.blogs = [...blogData];
    this.bookings = [...bookingData];
    this.currentUserId = 1;
    this.currentBookingId = bookingData.length + 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, isAdmin: false, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Hotel methods
  async getHotels(
    page: number = 1, 
    filters: any = {}
  ): Promise<{ hotels: Hotel[], total: number, totalPages: number }> {
    const pageSize = 9;
    let filteredHotels = [...this.hotels];
    
    // Apply filters
    if (filters.destination) {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.city.toLowerCase().includes(filters.destination.toLowerCase()) || 
                hotel.country.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }
    
    if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
      filteredHotels = filteredHotels.filter(
        hotel => Number(hotel.price) >= filters.priceMin && Number(hotel.price) <= filters.priceMax
      );
    }
    
    if (filters.starRating && filters.starRating.length > 0) {
      filteredHotels = filteredHotels.filter(
        hotel => filters.starRating.includes(hotel.rating)
      );
    }
    
    if (filters.hotelFacilities && filters.hotelFacilities.length > 0) {
      filteredHotels = filteredHotels.filter(hotel => 
        filters.hotelFacilities.some((facility: string) => 
          hotel.amenities.includes(facility)
        )
      );
    }
    
    // Calculate pagination
    const total = filteredHotels.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedHotels = filteredHotels.slice(startIndex, endIndex);
    
    return {
      hotels: paginatedHotels,
      total,
      totalPages,
    };
  }

  async getPopularHotels(): Promise<Hotel[]> {
    return this.hotels
      .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
      .slice(0, 6);
  }

  async getHotelById(id: number): Promise<Hotel | undefined> {
    return this.hotels.find(hotel => hotel.id === id);
  }

  // Destination methods
  async getDestinations(): Promise<Destination[]> {
    return this.destinations;
  }

  // Blog methods
  async getBlogs(
    page: number = 1,
    category?: string
  ): Promise<{ blogs: Blog[], total: number, totalPages: number }> {
    const pageSize = 10;
    let filteredBlogs = [...this.blogs];
    
    if (category) {
      filteredBlogs = filteredBlogs.filter(blog => blog.category === category);
    }
    
    // Sort by date (newest first)
    filteredBlogs.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    const total = filteredBlogs.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
    
    return {
      blogs: paginatedBlogs,
      total,
      totalPages,
    };
  }

  async getRecentBlogs(): Promise<Blog[]> {
    return [...this.blogs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }

  async getBlogById(id: number): Promise<Blog | undefined> {
    return this.blogs.find(blog => blog.id === id);
  }

  async getBlogCategories(): Promise<{ name: string, count: number }[]> {
    const categories: Record<string, number> = {};
    
    this.blogs.forEach(blog => {
      const category = blog.category || 'Uncategorized';
      categories[category] = (categories[category] || 0) + 1;
    });
    
    return Object.entries(categories).map(([name, count]) => ({ name, count }));
  }

  // Booking methods
  async createBooking(bookingData: any): Promise<Booking> {
    const id = this.currentBookingId++;
    const hotel = await this.getHotelById(bookingData.hotelId);
    
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    
    // Calculate nights and total amount
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    
    const roomRate = Number(hotel.price) * nights;
    const tax = roomRate * 0.1; // 10% tax
    const discount = hotel.discount ? (roomRate * Number(hotel.discount) / 100) : 0;
    const paidEarlier = 100; // Mock value
    const totalAmount = roomRate + tax - discount;
    
    // Create guests object
    const guests = {
      adults: parseInt(bookingData.adults) || 1,
      children: parseInt(bookingData.children) || 0
    };
    
    const booking: Booking = {
      id,
      userId: bookingData.userId || null,
      hotelId: hotel.id,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      checkInTime: "12:00 PM",
      checkOutTime: "12:00 PM",
      guests,
      rooms: parseInt(bookingData.rooms) || 1,
      roomType: "Standard",
      roomRate: roomRate,
      tax,
      discount,
      paidEarlier,
      totalAmount,
      status: "confirmed",
      paymentMethod: "credit_card",
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      address: bookingData.address || "",
      city: bookingData.city || "",
      country: bookingData.country || "",
      zipCode: bookingData.zipCode || "",
      specialRequests: bookingData.specialRequests || "",
      bookingDate: new Date().toISOString().split('T')[0],
      createdAt: new Date()
    };
    
    this.bookings.unshift(booking); // Add to beginning of array
    return booking;
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    return this.bookings.filter(booking => booking.userId === userId);
  }

  async getLatestBooking(): Promise<Booking | undefined> {
    return this.bookings[0];
  }
}

export const storage = new MemStorage();
