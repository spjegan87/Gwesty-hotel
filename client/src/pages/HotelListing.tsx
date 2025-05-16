import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { HotelCard } from "@/components/shared/HotelCard";
import { SearchForm } from "@/components/shared/SearchForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { SlidersHorizontal } from "lucide-react";
import { Hotel } from "@shared/schema";

export default function HotelListing() {
  const [location] = useLocation();
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 1000,
    starRating: [] as number[],
    hotelFacilities: [] as string[],
  });

  // Parse search params from URL
  const params = new URLSearchParams(location.split("?")[1]);
  const destination = params.get("destination") || "";
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const adults = params.get("adults") || "1";

  // Construct search params for API query
  const searchParams = new URLSearchParams({
    page: page.toString(),
    destination: destination,
    checkIn: checkIn,
    checkOut: checkOut,
    adults: adults,
    priceMin: filters.priceMin.toString(),
    priceMax: filters.priceMax.toString()
  });

  // Add star rating filters if any
  if (filters.starRating.length > 0) {
    searchParams.append('starRating', filters.starRating.join(','));
  }

  // Add facilities filters if any
  if (filters.hotelFacilities.length > 0) {
    searchParams.append('hotelFacilities', filters.hotelFacilities.join(','));
  }

  // Query for hotels with search params and filters
  const queryString = `/api/hotels?${searchParams.toString()}`;
  
  interface HotelListingResponse {
    hotels: Hotel[];
    total: number;
    totalPages: number;
  }
  
  const { data, isLoading } = useQuery<HotelListingResponse>({
    queryKey: [queryString, filters.starRating, filters.hotelFacilities],
  });
  
  const hotels = data?.hotels || [];
  const totalPages = data?.totalPages || 1;

  // Available filters
  const facilities = [
    "Gym/Spa", "Restaurant", "Swimming Pool", "WiFi", "Business Center", "Room Service", 
    "Laundry Service", "Travel Center"
  ];

  // Handle filter changes
  const handleStarRatingChange = (rating: number) => {
    setFilters(prev => {
      const newRatings = prev.starRating.includes(rating)
        ? prev.starRating.filter(r => r !== rating)
        : [...prev.starRating, rating];
      return { ...prev, starRating: newRatings };
    });
  };

  const handleFacilityChange = (facility: string) => {
    setFilters(prev => {
      const newFacilities = prev.hotelFacilities.includes(facility)
        ? prev.hotelFacilities.filter(f => f !== facility)
        : [...prev.hotelFacilities, facility];
      return { ...prev, hotelFacilities: newFacilities };
    });
  };

  const handlePriceChange = (min: string | number, max: string | number) => {
    setFilters(prev => ({
      ...prev,
      priceMin: typeof min === 'string' ? parseInt(min) || 0 : min,
      priceMax: typeof max === 'string' ? parseInt(max) || 1000 : max,
    }));
  };

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
            <h1 className="text-4xl font-bold text-center">Hotels</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <SearchForm 
            className="max-w-full" 
            compact={true} 
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden w-full mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {filterOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Filters Sidebar */}
          <div className={`${filterOpen ? 'block' : 'hidden'} md:block w-full md:w-1/4 bg-white rounded-lg shadow-md p-6`}>
            <h2 className="font-bold text-lg mb-4">Filter Hotels</h2>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Price</h3>
              <div className="flex items-center">
                <Input
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) => handlePriceChange(e.target.value, filters.priceMax)}
                  className="w-1/2 mr-2"
                />
                <Input
                  type="number"
                  min="0"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) => handlePriceChange(filters.priceMin, e.target.value)}
                  className="w-1/2"
                />
              </div>
              <div className="mt-2 relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute top-0 left-0 h-2 bg-primary rounded-full" 
                  style={{ 
                    width: `${((filters.priceMax - filters.priceMin) / 1000) * 100}%`,
                    left: `${(filters.priceMin / 1000) * 100}%`
                  }} 
                />
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Star Rating */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Star Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`rating-${rating}`} 
                      checked={filters.starRating.includes(rating)}
                      onCheckedChange={() => handleStarRatingChange(rating)}
                    />
                    <label 
                      htmlFor={`rating-${rating}`}
                      className="text-sm flex items-center"
                    >
                      {Array.from({ length: rating }).map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400"></i>
                      ))}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Hotel Facilities */}
            <div>
              <h3 className="font-semibold mb-3">Hotel Facilities</h3>
              <div className="space-y-2">
                {facilities.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`facility-${facility}`} 
                      checked={filters.hotelFacilities.includes(facility)}
                      onCheckedChange={() => handleFacilityChange(facility)}
                    />
                    <label 
                      htmlFor={`facility-${facility}`}
                      className="text-sm"
                    >
                      {facility} ({Math.floor(Math.random() * 20) + 10})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Hotel Listings */}
          <div className="w-full md:w-3/4">
            {/* Results summary and view toggle */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {isLoading ? (
                  <Skeleton className="w-48 h-5" />
                ) : (
                  `Showing ${(page - 1) * 9 + 1}-${Math.min(page * 9, data?.total || 0)} of ${data?.total || 0} hotels`
                )}
              </p>
              <div className="flex space-x-2">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <i className="fas fa-th"></i>
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <i className="fas fa-list"></i>
                </Button>
              </div>
            </div>
            
            {/* Hotel grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
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
            ) : hotels.length > 0 ? (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'flex flex-col gap-4'}`}>
                {hotels.map((hotel) => (
                  <HotelCard 
                    key={hotel.id}
                    id={hotel.id}
                    name={hotel.name}
                    location={hotel.location}
                    price={Number(hotel.price)}
                    discount={hotel.discount || undefined}
                    rating={hotel.rating}
                    image={Array.isArray(hotel.images) && hotel.images.length > 0 ? hotel.images[0] : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    featured={hotel.featured || undefined}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            )}
            
            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                      >
                        <span className="sr-only">Go to previous page</span>
                        <span className="h-4 w-4">←</span> Previous
                      </Button>
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={page === i + 1}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      >
                        Next <span className="h-4 w-4">→</span>
                        <span className="sr-only">Go to next page</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
