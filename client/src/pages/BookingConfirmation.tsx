import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingConfirmation() {
  // Fetch the latest booking
  const { data: booking, isLoading } = useQuery({
    queryKey: ["/api/bookings/latest"],
  });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-neutral-800 text-white h-64">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div
          className="h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">Confirm</h1>
            <nav className="flex justify-center mt-4">
              <ol className="flex items-center space-x-2 text-sm">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li>/</li>
                <li><Link href="/hotels" className="hover:underline">Book Now</Link></li>
                <li>/</li>
                <li><Link href="/checkout" className="hover:underline">Checkout</Link></li>
                <li>/</li>
                <li>Confirm</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-80" />
              <Skeleton className="h-80" />
            </div>
          </div>
        ) : booking ? (
          <>
            <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full p-2 mr-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-medium">Thank you! Your booking has been placed. We will contact you to confirm about the booking soon.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Booking :-</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Hotel Details */}
              <div>
                <div className="flex mb-6">
                  <img
                    src={booking.hotel.image}
                    alt={booking.hotel.name}
                    className="w-32 h-32 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-xl mb-2">{booking.hotel.name}</h3>
                    <p className="text-gray-600 mb-1">{booking.roomType} for {booking.nights} Nights</p>
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{booking.hotel.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <div>
                        <span>Check-in: {booking.checkIn}, {booking.checkInTime}</span>
                        <span className="mx-1">•</span>
                        <span>Check-out: {booking.checkOut}, {booking.checkOutTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-2">Guests</h4>
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{booking.adults} Adult, {booking.children} Children</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-2">Primary Traveler In This Trip :-</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">First Name:</p>
                      <p>{booking.firstName}</p>
                    </div>
                    <div>
                      <p className="font-medium">Last Name:</p>
                      <p>{booking.lastName}</p>
                    </div>
                    <div>
                      <p className="font-medium">Email:</p>
                      <p>{booking.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone:</p>
                      <p>{booking.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium">Address:</p>
                      <p>{booking.address}</p>
                    </div>
                    <div>
                      <p className="font-medium">City:</p>
                      <p>{booking.city}</p>
                    </div>
                    <div>
                      <p className="font-medium">Country:</p>
                      <p>{booking.country}</p>
                    </div>
                    <div>
                      <p className="font-medium">Zip:</p>
                      <p>{booking.zipCode}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-2">Request:</h4>
                  <p className="text-gray-700">{booking.specialRequests || "No special requests"}</p>
                </div>
              </div>

              {/* Right Column: Payment Details */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-4">Payment Receipt</h3>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span>Id: {booking.id}</span>
                      <div className="flex space-x-1">
                        <svg className="h-6 w-auto" viewBox="0 0 40 24" fill="none">
                          <rect width="40" height="24" rx="4" fill="#EB001B" fillOpacity="0.15" />
                          <path d="M13.5 14.5C17.09 14.5 20 11.59 20 8C20 4.41 17.09 1.5 13.5 1.5C9.91 1.5 7 4.41 7 8C7 11.59 9.91 14.5 13.5 14.5Z" fill="#EB001B" />
                          <path d="M26.5 14.5C30.09 14.5 33 11.59 33 8C33 4.41 30.09 1.5 26.5 1.5C22.91 1.5 20 4.41 20 8C20 11.59 22.91 14.5 26.5 14.5Z" fill="#F79E1B" />
                        </svg>
                        <svg className="h-6 w-auto" viewBox="0 0 40 24" fill="none">
                          <rect width="40" height="24" rx="4" fill="#1A1F71" fillOpacity="0.15" />
                          <path d="M15.51 15H13.26L14.8 9H17.05L15.51 15Z" fill="#1A1F71" />
                          <path d="M24 9.23C23.52 9.02 22.72 8.8 21.72 8.8C19.85 8.8 18.53 9.76 18.52 11.11C18.5 12.11 19.47 12.68 20.2 13.01C20.95 13.35 21.2 13.57 21.2 13.87C21.19 14.34 20.59 14.55 20.04 14.55C19.24 14.55 18.8 14.41 18.11 14.08L17.83 13.95L17.53 15.73C18.09 15.99 19.11 16.22 20.17 16.23C22.14 16.23 23.44 15.28 23.46 13.83C23.47 13.04 22.92 12.43 21.82 11.93C21.14 11.61 20.71 11.39 20.71 11.05C20.72 10.75 21.05 10.44 21.78 10.44C22.38 10.43 22.82 10.6 23.15 10.78L23.35 10.87L23.65 9.15L24 9.23Z" fill="#1A1F71" />
                          <path d="M27.76 12.85C27.92 12.41 28.49 10.92 28.49 10.92C28.48 10.94 28.64 10.53 28.73 10.28L28.86 10.84C28.86 10.84 29.21 12.47 29.28 12.85H27.76V12.85ZM30.17 9H28.5C28.05 9 27.71 9.13 27.53 9.61L25 15H27.11C27.11 15 27.41 14.14 27.48 13.93C27.69 13.93 29.94 13.93 30.21 13.93C30.26 14.21 30.42 15 30.42 15H32.31L30.17 9V9Z" fill="#1A1F71" />
                          <path d="M12.92 9L11 13.11L10.8 12.19C10.45 11.08 9.35 9.87 8.11 9.26L9.87 15H12L15 9H12.92V9Z" fill="#1A1F71" />
                          <path d="M9.5 9.22H6.13L6.09 9.39C8.43 10 9.97 11.44 10.55 13.19L9.88 9.61C9.77 9.26 9.66 9.24 9.5 9.22Z" fill="#1A1F71" />
                        </svg>
                        <svg className="h-6 w-auto" viewBox="0 0 40 24" fill="none">
                          <rect width="40" height="24" rx="4" fill="#003087" fillOpacity="0.15" />
                          <path d="M15.04 8.3H11.5C11.28 8.3 11.09 8.48 11.05 8.72L10 15.7C9.97 15.88 10.1 16.05 10.28 16.05H12.04C12.26 16.05 12.45 15.87 12.49 15.63L12.76 13.78C12.8 13.54 12.99 13.36 13.21 13.36H14.29C16.31 13.36 17.44 12.32 17.76 10.32C17.91 9.46 17.77 8.78 17.35 8.3C16.89 7.77 16.08 8.3 15.04 8.3ZM15.42 10.46C15.25 11.56 14.41 11.56 13.58 11.56H13.11L13.37 9.77C13.39 9.64 13.5 9.54 13.62 9.54H13.84C14.4 9.54 14.93 9.54 15.21 9.84C15.37 10.02 15.43 10.2 15.42 10.46Z" fill="#003087" />
                          <path d="M22.97 10.43H21.21C21.09 10.43 20.98 10.53 20.96 10.66L20.9 11.04L20.8 10.9C20.45 10.4 19.78 10.24 19.12 10.24C17.55 10.24 16.22 11.47 15.95 13.16C15.81 14 16.03 14.8 16.52 15.35C16.97 15.85 17.61 16.06 18.35 16.06C19.63 16.06 20.31 15.16 20.31 15.16L20.24 15.54C20.21 15.71 20.34 15.88 20.51 15.88H22.1C22.32 15.88 22.51 15.7 22.55 15.46L23.25 10.77C23.27 10.59 23.15 10.43 22.97 10.43ZM20.75 13.21C20.61 14.03 19.94 14.57 19.12 14.57C18.71 14.57 18.38 14.45 18.17 14.22C17.96 13.99 17.87 13.66 17.94 13.29C18.07 12.47 18.76 11.92 19.56 11.92C19.96 11.92 20.29 12.05 20.5 12.28C20.72 12.52 20.82 12.84 20.75 13.21Z" fill="#003087" />
                          <path d="M29.66 10.43H27.89C27.75 10.43 27.62 10.5 27.54 10.61L25.83 13.16L25.08 10.72C25.02 10.55 24.87 10.43 24.69 10.43H22.96C22.77 10.43 22.64 10.62 22.69 10.8L24.17 15.24L22.77 17.27C22.66 17.44 22.79 17.65 22.98 17.65H24.74C24.88 17.65 25.01 17.58 25.09 17.47L30 10.81C30.1 10.65 29.98 10.43 29.66 10.43Z" fill="#003087" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="text-gray-600">Credit Card</div>
                      <div>5213 xxxx xxxx 2346</div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <h4 className="font-bold mb-4">Total Charge</h4>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Room rate:</span>
                        <span>₹{Math.round(booking.roomRate * 83.5)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>₹{Math.round(booking.tax * 83.5)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>- ₹{Math.round(booking.discount * 83.5)}</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Paid earlier:</span>
                        <span>₹{Math.round(booking.paidEarlier * 83.5)}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>₹{Math.round(booking.totalAmount * 83.5)}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 flex space-x-4">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <i className="fas fa-print mr-2"></i> Print
                  </Button>
                  <Link href="/my-bookings" className="flex-1">
                    <Button variant="outline" className="w-full">
                      View All Bookings
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No Booking Found</h2>
            <p className="mb-8">It seems you haven't made any bookings yet.</p>
            <Link href="/hotels">
              <Button className="bg-primary hover:bg-primary/90">Browse Hotels</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
