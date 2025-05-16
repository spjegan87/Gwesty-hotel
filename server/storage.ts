import { desc, eq, and, gte, lte, like, sql, or } from "drizzle-orm";
import { db } from "./db";
import { 
  type User, 
  type InsertUser, 
  type Hotel,
  type Destination, 
  type Blog,
  type Booking,
  users,
  hotels,
  destinations,
  blogs,
  bookings,
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

  // Database initialization
  initializeData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Hotel methods
  async getHotels(
    page: number = 1, 
    filters: any = {}
  ): Promise<{ hotels: Hotel[], total: number, totalPages: number }> {
    const pageSize = 9;
    let conditions: any[] = [];

    // Apply filters
    if (filters.destination) {
      // Filter by exact city name (case-insensitive)
      conditions.push(
        or(
          sql`LOWER(${hotels.city}) = LOWER(${filters.destination})`,
          sql`LOWER(${hotels.country}) = LOWER(${filters.destination})`
        )
      );
    }

    if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
      conditions.push(
        and(
          gte(hotels.price, filters.priceMin),
          lte(hotels.price, filters.priceMax)
        )
      );
    }

    // Get total count for pagination
    const countQuery = db.select({ count: sql<number>`count(*)` }).from(hotels);
    if (conditions.length > 0) {
      countQuery.where(and(...conditions));
    }
    const [countResult] = await countQuery;
    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / pageSize);

    // Get hotels with pagination
    const offset = (page - 1) * pageSize;
    const hotelsQuery = db.select().from(hotels);
    if (conditions.length > 0) {
      hotelsQuery.where(and(...conditions));
    }
    const result = await hotelsQuery.limit(pageSize).offset(offset);

    return {
      hotels: result,
      total,
      totalPages,
    };
  }

  async getPopularHotels(): Promise<Hotel[]> {
    return db
      .select()
      .from(hotels)
      .orderBy(desc(hotels.rating))
      .limit(6);
  }

  async getHotelById(id: number): Promise<Hotel | undefined> {
    const [hotel] = await db.select().from(hotels).where(eq(hotels.id, id));
    return hotel;
  }

  // Destination methods
  async getDestinations(): Promise<Destination[]> {
    return db.select().from(destinations);
  }

  // Blog methods
  async getBlogs(
    page: number = 1,
    category?: string
  ): Promise<{ blogs: Blog[], total: number, totalPages: number }> {
    const pageSize = 10;
    const conditions = category ? [eq(blogs.category, category)] : [];

    // Get total count
    const countQuery = db.select({ count: sql<number>`count(*)` }).from(blogs);
    if (conditions.length > 0) {
      countQuery.where(and(...conditions));
    }
    const [countResult] = await countQuery;
    const total = Number(countResult.count);
    const totalPages = Math.ceil(total / pageSize);

    // Get blogs with pagination
    const offset = (page - 1) * pageSize;
    const blogsQuery = db.select().from(blogs);
    if (conditions.length > 0) {
      blogsQuery.where(and(...conditions));
    }
    const result = await blogsQuery.orderBy(desc(blogs.date)).limit(pageSize).offset(offset);

    return {
      blogs: result,
      total,
      totalPages,
    };
  }

  async getRecentBlogs(): Promise<Blog[]> {
    return db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.date))
      .limit(6);
  }

  async getBlogById(id: number): Promise<Blog | undefined> {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog;
  }

  async getBlogCategories(): Promise<{ name: string, count: number }[]> {
    const result = await db
      .select({
        name: blogs.category,
        count: sql<number>`count(*)`
      })
      .from(blogs)
      .where(sql`${blogs.category} is not null`)
      .groupBy(blogs.category);

    return result.map(item => ({
      name: item.name || 'Uncategorized',
      count: Number(item.count)
    }));
  }

  // Booking methods
  async createBooking(bookingData: any): Promise<Booking> {
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

    const bookingValues = {
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

    const [booking] = await db
      .insert(bookings)
      .values(bookingValues)
      .returning();

    return booking;
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    return db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, userId));
  }

  async getLatestBooking(): Promise<Booking | undefined> {
    const [booking] = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(1);

    return booking;
  }

  // Database initialization
  async initializeData(): Promise<void> {
    // Check if data already exists
    const [hotelResult] = await db.select({ count: sql<number>`count(*)` }).from(hotels);
    const hotelCount = Number(hotelResult.count);

    if (hotelCount > 0) {
      console.log('Database already has data, skipping initialization');
      return;
    }

    console.log('Initializing database with seed data...');

    // Insert hotels
    console.log('Inserting hotels...');
    await db.insert(hotels).values(hotelData);

    // Insert destinations
    console.log('Inserting destinations...');
    await db.insert(destinations).values(destinationData);

    // Insert blogs
    console.log('Inserting blogs...');
    await db.insert(blogs).values(blogData);

    // Insert bookings
    console.log('Inserting bookings...');
    await db.insert(bookings).values(bookingData);

    console.log('Database initialized with seed data');
  }
}

// Export a new instance of DatabaseStorage
export const storage = new DatabaseStorage();