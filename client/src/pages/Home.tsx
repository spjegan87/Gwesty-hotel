import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { SearchForm } from "@/components/shared/SearchForm";
import { HotelCard } from "@/components/shared/HotelCard";
import { BlogCard } from "@/components/shared/BlogCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, CreditCard, Search } from "lucide-react";
import { Hotel, Blog, Destination } from "@shared/schema";

export default function Home() {
  const { data: hotels, isLoading: isHotelsLoading } = useQuery<Hotel[]>({
    queryKey: ["/api/hotels/popular"],
  });

  const { data: destinations, isLoading: isDestinationsLoading } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  const { data: blogs, isLoading: isBlogsLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs/recent"],
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-neutral-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div 
          className="h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')" }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find the Best Hotel</h1>
            <p className="text-xl mb-8">Search and Book Hotel with Special Prices</p>
            
            {/* Search Box */}
            <div className="max-w-4xl mx-auto">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Destinations */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recommended Destinations</h2>
          
          {isDestinationsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-64 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destinations && destinations.length > 0 && destinations.slice(0, 3).map((destination) => (
                <div key={destination.id} className="relative rounded-lg overflow-hidden shadow-lg h-64 group">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <p>{destination.hotelCount} Hotels Available</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Search</h3>
              <p>Find hotels by city, price range or amenities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Choose</h3>
              <p>Select the perfect hotel for your stay</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Book</h3>
              <p>Secure your booking with instant confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Hotels */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Most Popular Hotels</h2>
          
          {isHotelsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between pt-2">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {hotels && hotels.length > 0 && hotels.slice(0, 3).map((hotel) => {
                // Extract the first image from the images array
                const hotelImages = hotel.images as string[];
                const firstImage = hotelImages && hotelImages.length > 0 
                  ? hotelImages[0] 
                  : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                
                return (
                  <HotelCard 
                    key={hotel.id}
                    id={hotel.id}
                    name={hotel.name}
                    location={hotel.location}
                    price={Number(hotel.price)}
                    discount={hotel.discount || undefined}
                    rating={hotel.rating}
                    image={firstImage}
                    featured={hotel.featured || undefined}
                  />
                );
              })}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link href="/hotels" onClick={(e) => {
              e.preventDefault();
              window.location.href = "/hotels";
            }}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                View All Hotels
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hotel Offers */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Hotels Offers</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">Featured</Button>
              <Button variant="outline" size="sm">Deals</Button>
              <Button variant="outline" size="sm">Discounts</Button>
            </div>
          </div>
          
          <div className="relative rounded-lg overflow-hidden shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=600" 
              alt="Crown Plaza Sydney" 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
              <div className="p-8 text-white max-w-xl">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">Limited Time Offer</span>
                <h3 className="text-3xl font-bold mb-4">Crown Plaza Sydney</h3>
                <p className="mb-6">Experience luxury stay with panoramic harbor views. Book now and enjoy a 30% discount on spa services and complimentary breakfast.</p>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold">$180</span>
                  <span className="line-through text-gray-400">$240</span>
                  <Link href="/hotels/special-offer">
                    <Button className="bg-white text-primary hover:bg-gray-100">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Blogs</h2>
          
          {isBlogsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs && blogs.length > 0 && blogs.slice(0, 3).map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-neutral-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Testimonial</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover rounded-full border-4 border-primary"
                />
              </div>
              <p className="text-lg mb-6">"I've been using Gwesty for all my business trips, and it has made booking accommodations so much easier. The interface is intuitive, and the customer service is excellent! Highly recommend this service to anyone who travels frequently."</p>
              <div>
                <p className="font-bold text-lg">Sarah Johnson</p>
                <p className="text-gray-400">Business Traveler</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition duration-300 flex justify-center">
                <svg className="h-12" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                  <rect width="180" height="80" x="10" y="10" rx="10" fill="#f0f0f0" />
                  <text x="100" y="55" fontSize="16" textAnchor="middle" fill="#333">
                    Partner {index + 1}
                  </text>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
