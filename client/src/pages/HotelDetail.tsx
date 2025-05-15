import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, MapPin, Star, User } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  checkIn: z.date(),
  checkOut: z.date().refine(date => date > new Date(), { message: "Check-out date must be in the future" }),
  rooms: z.string().min(1),
  adults: z.string().min(1),
  children: z.string(),
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  specialRequests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function HotelDetail() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/hotels/:id");
  const hotelId = params?.id;
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isBooking, setIsBooking] = useState(false);

  // Fetch hotel details
  const { data: hotel, isLoading } = useQuery({
    queryKey: [`/api/hotels/${hotelId}`],
  });

  // Booking form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      rooms: "1",
      adults: "1",
      children: "0",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      zipCode: "",
      specialRequests: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsBooking(true);
    try {
      await apiRequest("POST", `/api/bookings`, {
        hotelId,
        ...data,
        checkIn: format(data.checkIn, "yyyy-MM-dd"),
        checkOut: format(data.checkOut, "yyyy-MM-dd"),
      });
      
      toast({
        title: "Booking Successful",
        description: "Your booking has been confirmed.",
      });
      
      // Redirect to confirmation page
      navigate("/booking/confirm");
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  // Calculate number of nights and total price
  const checkIn = form.watch("checkIn");
  const checkOut = form.watch("checkOut");
  const nights = checkIn && checkOut ? 
    Math.max(1, Math.floor((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))) : 1;
  const roomPrice = hotel?.price || 0;
  const totalPrice = roomPrice * nights;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-8/12">
            <Skeleton className="h-96 w-full rounded-lg mb-4" />
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          </div>
          <div className="lg:w-4/12">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Hotel Not Found</h2>
        <p className="mb-8">The hotel you're looking for doesn't exist or has been removed.</p>
        <Link href="/hotels">
          <Button>Browse All Hotels</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hotel Name Banner */}
      <section className="relative bg-neutral-800 text-white h-64">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div
          className="h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${hotel.images?.[0] || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d'})` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center">{hotel.name}</h1>
            <nav className="flex justify-center mt-4">
              <ol className="flex items-center space-x-2 text-sm">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li>/</li>
                <li><Link href="/hotels" className="hover:underline">Hotels</Link></li>
                <li>/</li>
                <li>{hotel.name}</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Hotel Images and Details */}
          <div className="lg:w-8/12">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img
                  src={hotel.images?.[selectedImageIndex]}
                  alt={`${hotel.name} - Image ${selectedImageIndex + 1}`}
                  className="w-full h-96 object-cover"
                />
                {hotel.discount && (
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    {hotel.discount}% Off
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {hotel.images?.map((image: string, index: number) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${hotel.name} - Thumbnail ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Details Tabs */}
            <Tabs defaultValue="info">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="info">Additional Information</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="p-4 bg-white rounded-b-lg">
                <h3 className="font-bold text-lg mb-3">About This Listing</h3>
                <p className="mb-4">{hotel.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold mb-2">The Space</h4>
                    <ul className="space-y-1">
                      <li>• Accommodates: {hotel.accommodates}</li>
                      <li>• Bathrooms: {hotel.bathrooms}</li>
                      <li>• Bedrooms: {hotel.bedrooms}</li>
                      <li>• Beds: {hotel.beds}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Prices</h4>
                    <ul className="space-y-1">
                      <li>• Base Price: ${hotel.price}</li>
                      <li>• Cleaning Fee: ${hotel.cleaningFee}</li>
                      <li>• Extra Guests: ${hotel.extraGuestFee}/night</li>
                      <li>• Security Deposit: ${hotel.securityDeposit}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Availability</h4>
                  <ul className="space-y-1">
                    <li>• Min Stay: {hotel.minStay} nights</li>
                    <li>• Max Stay: {hotel.maxStay} nights</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Cancellation</h4>
                  <p>{hotel.cancellationPolicy}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="facilities" className="p-4 bg-white rounded-b-lg">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities?.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <i className="fas fa-check text-primary"></i>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="p-4 bg-white rounded-b-lg">
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-2">Location</h3>
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {hotel.address}, {hotel.city}, {hotel.country}
                  </p>
                </div>
                
                <div className="h-80 bg-gray-200 rounded-lg w-full flex items-center justify-center">
                  <p className="text-gray-500">Map view would be displayed here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-4 bg-white rounded-b-lg">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                      {hotel.rating}
                    </div>
                    <div>
                      <div className="text-lg font-semibold">Overall Rating</div>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < hotel.rating ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p>Based on {hotel.reviewCount} reviews</p>
                </div>
                
                {/* Sample Reviews */}
                {hotel.reviews?.map((review: any, index: number) => (
                  <div key={index} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-start mb-2">
                      <div className="mr-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                          <img 
                            src={review.avatar || `https://ui-avatars.com/api/?name=${review.name}&background=random`} 
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="text-sm text-gray-500 mb-1">{review.date}</div>
                        <div className="flex text-yellow-400 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < review.rating ? 'fill-current' : ''}`} 
                            />
                          ))}
                        </div>
                        <p>{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full">Write a Review</Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:w-4/12">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-2xl font-bold">${hotel.price}</span>
                  <span className="text-gray-500 ml-2">per night</span>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Date Selection */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="checkIn"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Check-in</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={`w-full justify-start text-left font-normal`}
                                  type="button"
                                >
                                  {field.value ? (
                                    format(field.value, "MMM dd, yyyy")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                              <div className="absolute top-full mt-1 z-50">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="checkOut"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Check-out</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={`w-full justify-start text-left font-normal`}
                                  type="button"
                                >
                                  {field.value ? (
                                    format(field.value, "MMM dd, yyyy")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                              <div className="absolute top-full mt-1 z-50">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date <= form.getValues("checkIn")}
                                  initialFocus
                                />
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Guests */}
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="rooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rooms</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Rooms" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map(n => (
                                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="adults"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adults</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Adults" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6].map(n => (
                                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="children"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Children</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Children" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[0, 1, 2, 3, 4].map(n => (
                                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Price Breakdown */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>${hotel.price} x {nights} nights</span>
                        <span>${hotel.price * nights}</span>
                      </div>
                      {hotel.cleaningFee > 0 && (
                        <div className="flex justify-between mb-2">
                          <span>Cleaning fee</span>
                          <span>${hotel.cleaningFee}</span>
                        </div>
                      )}
                      {hotel.discount > 0 && (
                        <div className="flex justify-between mb-2 text-primary">
                          <span>Discount ({hotel.discount}%)</span>
                          <span>-${(totalPrice * hotel.discount / 100).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-300 my-2 pt-2 font-bold flex justify-between">
                        <span>Total</span>
                        <span>${hotel.discount 
                          ? (totalPrice - (totalPrice * hotel.discount / 100)).toFixed(2)
                          : totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Guest Information */}
                    <div>
                      <h3 className="font-bold text-lg mb-4">Guest Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input {...field} type="tel" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="specialRequests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Special Requests</FormLabel>
                              <FormControl>
                                <Textarea {...field} rows={3} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      disabled={isBooking}
                    >
                      {isBooking ? "Processing..." : "Book Now"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
