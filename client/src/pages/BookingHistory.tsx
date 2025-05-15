import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin } from "lucide-react";

export default function BookingHistory() {
  // Fetch user bookings
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["/api/bookings/history"],
  });

  return (
    <>
      {/* Hero Banner */}
      <div className="h-8 bg-primary"></div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">My History</h1>
        
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 w-full" />
            ))}
          </div>
        ) : bookings?.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking: any) => (
              <div 
                key={booking.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4 md:p-6 flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                    <img
                      src={booking.hotel.image}
                      alt={booking.hotel.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="md:w-2/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="text-yellow-400 flex mr-2">
                          {Array.from({ length: booking.hotel.rating }).map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                        </div>
                        <h3 className="font-bold text-lg">{booking.hotel.name}</h3>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{booking.hotel.location}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Check-in</div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            <div>
                              <div>{booking.checkIn}</div>
                              <div className="text-sm">{booking.checkInTime}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-600">Check-out</div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            <div>
                              <div>{booking.checkOut}</div>
                              <div className="text-sm">{booking.checkOutTime}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <div className="mr-4">
                          <span className="text-sm">Booking Date: </span>
                          <span>{booking.bookingDate}</span>
                        </div>
                        <Link href={`/booking/${booking.id}`} className="text-primary hover:underline text-sm">
                          See Your payment Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/4 mt-4 md:mt-0 md:ml-auto flex flex-col items-end justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Price</div>
                      <div className="flex flex-col items-end">
                        <div className="text-gray-500 line-through text-sm">${booking.originalPrice}</div>
                        <div className="text-2xl font-bold text-green-600">${booking.discountedPrice}</div>
                      </div>
                    </div>
                    
                    <div className="w-full mt-4">
                      <Button 
                        variant="destructive"
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">No Booking History Found</h2>
            <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start exploring hotels and plan your next trip!</p>
            <Link href="/hotels">
              <Button className="bg-primary hover:bg-primary/90">Browse Hotels</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
