import { pgTable, text, serial, integer, boolean, json, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  phone: text("phone"),
  avatar: text("avatar"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  avatar: true,
});

// Hotels
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  location: text("location").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discount: integer("discount"),
  rating: integer("rating").notNull(),
  reviewCount: integer("review_count"),
  featured: boolean("featured"),
  images: jsonb("images").notNull(),
  amenities: jsonb("amenities").notNull(),
  accommodates: integer("accommodates"),
  bathrooms: integer("bathrooms"),
  bedrooms: integer("bedrooms"),
  beds: integer("beds"),
  cleaningFee: decimal("cleaning_fee", { precision: 10, scale: 2 }),
  extraGuestFee: decimal("extra_guest_fee", { precision: 10, scale: 2 }),
  securityDeposit: decimal("security_deposit", { precision: 10, scale: 2 }),
  minStay: integer("min_stay"),
  maxStay: integer("max_stay"),
  cancellationPolicy: text("cancellation_policy"),
  reviews: jsonb("reviews"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHotelSchema = createInsertSchema(hotels).pick({
  name: true,
  description: true,
  address: true,
  city: true,
  country: true,
  location: true,
  price: true,
  discount: true,
  rating: true,
  reviewCount: true,
  featured: true,
  images: true,
  amenities: true,
  accommodates: true,
  bathrooms: true,
  bedrooms: true,
  beds: true,
  cleaningFee: true,
  extraGuestFee: true,
  securityDeposit: true,
  minStay: true,
  maxStay: true,
  cancellationPolicy: true,
  reviews: true,
});

// Destinations
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  hotelCount: integer("hotel_count").notNull(),
});

export const insertDestinationSchema = createInsertSchema(destinations).pick({
  name: true,
  image: true,
  hotelCount: true,
});

// Blogs
export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  date: text("date").notNull(),
  author: text("author").notNull(),
  category: text("category"),
  tags: jsonb("tags"),
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBlogSchema = createInsertSchema(blogs).pick({
  title: true,
  excerpt: true,
  content: true,
  image: true,
  date: true,
  author: true,
  category: true,
  tags: true,
});

// Bookings
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  hotelId: integer("hotel_id").notNull(),
  checkIn: text("check_in").notNull(),
  checkOut: text("check_out").notNull(),
  checkInTime: text("check_in_time").default("12:00 PM"),
  checkOutTime: text("check_out_time").default("12:00 PM"),
  guests: jsonb("guests").notNull(),
  rooms: integer("rooms").notNull(),
  roomType: text("room_type").default("Standard"),
  roomRate: decimal("room_rate", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }),
  discount: decimal("discount", { precision: 10, scale: 2 }),
  paidEarlier: decimal("paid_earlier", { precision: 10, scale: 2 }),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("confirmed"),
  paymentMethod: text("payment_method"),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  zipCode: text("zip_code"),
  specialRequests: text("special_requests"),
  bookingDate: text("booking_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Hotel = typeof hotels.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;

export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;

export type Blog = typeof blogs.$inferSelect;
export type InsertBlog = z.infer<typeof insertBlogSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
