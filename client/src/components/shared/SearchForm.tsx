import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search } from "lucide-react";

const formSchema = z.object({
  destination: z.string().min(1, { message: "Destination is required" }),
  checkIn: z.date({ required_error: "Check-in date is required" }),
  checkOut: z
    .date({ required_error: "Check-out date is required" })
    .refine((date) => date > new Date(), {
      message: "Check-out date must be in the future",
    }),
  adults: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface SearchFormProps {
  className?: string;
  compact?: boolean;
}

export function SearchForm({
  className = "",
  compact = false,
}: SearchFormProps) {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch destinations for dropdown
  interface Destination {
    id: number;
    name: string;
    image: string;
    hotelCount: number;
  }

  const { data: destinations = [] } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      checkIn: new Date(),
      checkOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      adults: "1",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      params.append("destination", data.destination);
      params.append("checkIn", format(data.checkIn, "yyyy-MM-dd"));
      params.append("checkOut", format(data.checkOut, "yyyy-MM-dd"));
      params.append("adults", data.adults);
      params.append("page", "1"); // Reset to first page on new search

      // Redirect to hotel listing with search params
      const searchUrl = `/hotels?${params.toString()}`;
      setLocation(searchUrl);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`grid grid-cols-1 ${compact ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}
        >
          <div className="relative">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => {
                const [hotels, setHotels] = useState<any[]>([]);

                useEffect(() => {
                  const fetchHotels = async () => {
                    if (field.value) {
                      try {
                        const response = await fetch(`/api/hotels?destination=${field.value}`);
                        const data = await response.json();
                        setHotels(data.hotels || []);
                      } catch (error) {
                        console.error("Error fetching hotels:", error);
                      }
                    } else {
                      setHotels([]);
                    }
                  };

                  const debounce = setTimeout(() => {
                    fetchHotels();
                  }, 300);

                  return () => clearTimeout(debounce);
                }, [field.value]);

                return (
                  <FormItem className="relative">
                    <FormLabel className="text-gray-900 text-sm font-medium">
                      Destination
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter city name"
                        className="text-gray-900"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    {field.value && hotels.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg text-gray-900 text-left max-h-60 overflow-y-auto">
                        {hotels.map((hotel) => (
                          <div
                            key={hotel.id}
                            className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                            onClick={() => field.onChange(hotel.city)}
                          >
                            <div className="flex items-center gap-3">
                              <img 
                                src={hotel.images[0]} 
                                alt={hotel.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <div className="font-medium">{hotel.name}</div>
                                <div className="text-sm text-gray-600">{hotel.city}, {hotel.country}</div>
                                <div className="text-sm text-primary">From ${hotel.price}/night</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-white text-sm font-medium">
                    Check In
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full flex justify-start text-left font-normal text-gray-900"
                        >
                          {field.value ? (
                            format(field.value, "MMM dd, yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-white text-sm font-medium">
                    Check Out
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full flex justify-start text-left font-normal text-gray-900"
                        >
                          {field.value ? (
                            format(field.value, "MMM dd, yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-white text-sm font-medium">
                    Guests
                  </FormLabel>
                  <div className="flex space-x-4 text-gray-900">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                          <SelectItem value="4">4 Adults</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white"
                      disabled={isSubmitting}
                    >
                      <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
