import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

export interface HotelCardProps {
  id: number;
  name: string;
  location: string;
  price: number;
  discount?: number | null;
  rating: number;
  image: string;
  featured?: boolean;
  viewMode?: 'grid' | 'list';
}

export function HotelCard({
  id,
  name,
  location,
  price,
  discount,
  rating,
  image,
  featured,
  viewMode = 'grid',
}: HotelCardProps) {
  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <Card className={`hotel-card overflow-hidden shadow-md hover:shadow-xl ${viewMode === 'list' ? 'flex' : ''}`}>
      <div className={`relative ${viewMode === 'list' ? 'w-72' : ''}`}>
        <img
          src={image}
          alt={name}
          className={`${viewMode === 'list' ? 'w-72 h-full' : 'w-full h-48'} object-cover`}
        />
        {featured && (
          <Badge className="absolute top-4 left-4 bg-white text-secondary">
            Featured
          </Badge>
        )}
        {discount && (
          <Badge className="absolute top-4 left-4 bg-primary text-white">
            {discount}% Off
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: rating }).map((_, index) => (
              <Star key={index} className="h-4 w-4 fill-current" />
            ))}
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          <span>{location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <span className="text-gray-500 text-sm">Per night</span>
          <div className="font-bold text-lg flex items-center">
            ₹{Math.round(discountedPrice * 83.5)} {/* Converted to INR */}
            {discount && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ₹{Math.round(price * 83.5)}
              </span>
            )}
          </div>
        </div>
        <Link href={`/hotels/${id}`} onClick={(e) => {
          e.preventDefault();
          window.location.href = `/hotels/${id}`;
        }}>
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
