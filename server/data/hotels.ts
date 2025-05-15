import { type Hotel } from "@shared/schema";

export const hotelData: Hotel[] = [
  {
    id: 1,
    name: "Fairmont Hotel Sydney",
    description: "Experience luxury in the heart of Sydney with panoramic harbor views and world-class amenities. Our spacious rooms offer modern comfort with a touch of elegance, while our facilities cater to both business and leisure travelers. Enjoy our award-winning restaurants, rejuvenating spa, and rooftop pool with stunning city views.",
    address: "1 Martin Place",
    city: "Sydney",
    country: "Australia",
    location: "St Marks, Randwick, Sydney",
    price: 152,
    discount: 0,
    rating: 5,
    reviewCount: 243,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Room Service", "Business Center", "Concierge", "Parking"],
    accommodates: 3,
    bathrooms: 1,
    bedrooms: 1,
    beds: 2,
    cleaningFee: 30,
    extraGuestFee: 25,
    securityDeposit: 100,
    minStay: 1,
    maxStay: 30,
    cancellationPolicy: "Full refund up to 7 days before check-in. 50% refund between 7 days and 24 hours before check-in. No refund within 24 hours of check-in.",
    reviews: [
      {
        id: 1,
        name: "John Smith",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "May 10, 2023",
        text: "Absolutely fantastic hotel with incredible views and service. The staff went above and beyond to make our stay memorable."
      },
      {
        id: 2,
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 4,
        date: "April 22, 2023",
        text: "Great location and beautiful rooms. The only downside was the pool was closed for maintenance during our stay."
      }
    ],
    createdAt: new Date("2023-01-15T08:30:00Z")
  },
  {
    id: 2,
    name: "The Ritz-Carlton Bali",
    description: "A breathtaking beachfront resort featuring luxury villas with private pools and stunning ocean views. Immerse yourself in Balinese culture while enjoying impeccable service and world-class amenities. Our resort offers a tranquil escape with direct beach access, multiple infinity pools, and authentic dining experiences celebrating local flavors.",
    address: "Jalan Raya Nusa Dua Selatan",
    city: "Bali",
    country: "Indonesia",
    location: "Nusa Dua, Bali, Indonesia",
    price: 235,
    discount: 20,
    rating: 5,
    reviewCount: 189,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Private Beach", "Infinity Pool", "Spa", "Fitness Center", "Multiple Restaurants", "Room Service", "Concierge", "Airport Shuttle"],
    accommodates: 4,
    bathrooms: 2,
    bedrooms: 2,
    beds: 3,
    cleaningFee: 50,
    extraGuestFee: 35,
    securityDeposit: 200,
    minStay: 2,
    maxStay: 30,
    cancellationPolicy: "Full refund up to 14 days before check-in. 25% refund between 14 days and 7 days before check-in. No refund within 7 days of check-in.",
    reviews: [
      {
        id: 1,
        name: "Michael Brown",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "May 5, 2023",
        text: "Paradise on earth! The private villa with ocean view was worth every penny. Staff was attentive and friendly."
      },
      {
        id: 2,
        name: "Emily Davis",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "March 18, 2023",
        text: "This resort exceeded all our expectations. The attention to detail is impeccable. We'll definitely be back!"
      }
    ],
    createdAt: new Date("2023-01-20T10:15:00Z")
  },
  {
    id: 3,
    name: "Burj Al Arab",
    description: "The iconic sail-shaped hotel known for its exceptional luxury and 7-star service. Each suite spans two floors with floor-to-ceiling windows offering breathtaking views of the Arabian Gulf. Indulge in our world-class dining options, including underwater and skyview restaurants, and enjoy exclusive access to our private beach and terrace.",
    address: "Jumeirah Road",
    city: "Dubai",
    country: "UAE",
    location: "Jumeirah Beach, Dubai, UAE",
    price: 499,
    discount: 0,
    rating: 5,
    reviewCount: 156,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Butler Service", "Private Beach", "Infinity Pool", "Spa", "Fitness Center", "Michelin Star Restaurants", "Helicopter Transfer", "Yacht Charter", "Rolls-Royce Fleet"],
    accommodates: 4,
    bathrooms: 3,
    bedrooms: 2,
    beds: 2,
    cleaningFee: 100,
    extraGuestFee: 75,
    securityDeposit: 1000,
    minStay: 1,
    maxStay: 30,
    cancellationPolicy: "50% refund up to 30 days before check-in. No refund within 30 days of check-in.",
    reviews: [
      {
        id: 1,
        name: "Robert Wilson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "April 12, 2023",
        text: "A truly once-in-a-lifetime experience. The opulence and service are unmatched anywhere in the world."
      },
      {
        id: 2,
        name: "Jessica Thompson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "February 28, 2023",
        text: "Worth every penny for the most luxurious hotel stay imaginable. The butler service sets a new standard."
      }
    ],
    createdAt: new Date("2023-01-25T14:20:00Z")
  },
  {
    id: 4,
    name: "Grand Hotel Amrath Amsterdam",
    description: "A historic landmark building transformed into a 5-star hotel in the heart of Amsterdam. Our rooms feature stunning Art Nouveau details while offering modern amenities. Perfectly located near Central Station, we offer easy access to all major attractions, as well as an award-winning spa and wellness center.",
    address: "Prins Hendrikkade 108",
    city: "Amsterdam",
    country: "Netherlands",
    location: "City Center, Amsterdam, Netherlands",
    price: 220,
    discount: 10,
    rating: 4,
    reviewCount: 178,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Indoor Pool", "Spa", "Fitness Center", "Restaurant", "Bar", "Room Service", "Concierge", "Parking"],
    accommodates: 2,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    cleaningFee: 35,
    extraGuestFee: 40,
    securityDeposit: 150,
    minStay: 1,
    maxStay: 21,
    cancellationPolicy: "Full refund up to 7 days before check-in. No refund within 7 days of check-in.",
    reviews: [
      {
        id: 1,
        name: "David Miller",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 4,
        date: "April 8, 2023",
        text: "Beautiful historic building with spacious rooms. The location is perfect for exploring Amsterdam."
      },
      {
        id: 2,
        name: "Linda Garcia",
        avatar: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "March 15, 2023",
        text: "The Art Nouveau details are stunning! Staff was very accommodating and the spa was exceptional."
      }
    ],
    createdAt: new Date("2023-02-01T09:10:00Z")
  },
  {
    id: 5,
    name: "Jolly Swagman Backpackers Sydney Hostel",
    description: "A friendly and affordable hostel in the heart of Sydney's vibrant Kings Cross district. We offer clean, comfortable accommodations with a range of room options from private rooms to shared dormitories. Enjoy our rooftop terrace, communal kitchen, and free activities organized by our staff.",
    address: "27 Orwell Street, Kings Cross",
    city: "Sydney",
    country: "Australia",
    location: "Kings Cross, Sydney, Australia",
    price: 35,
    discount: 0,
    rating: 3,
    reviewCount: 205,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1626265774643-3d0228bf5fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Communal Kitchen", "Rooftop Terrace", "Laundry Facilities", "Luggage Storage", "24/7 Reception", "Tour Desk", "Common Room", "Security Lockers"],
    accommodates: 1,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    cleaningFee: 5,
    extraGuestFee: 20,
    securityDeposit: 20,
    minStay: 1,
    maxStay: 30,
    cancellationPolicy: "Full refund up to 48 hours before check-in. No refund within 48 hours of check-in.",
    reviews: [
      {
        id: 1,
        name: "Tom White",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 4,
        date: "May 2, 2023",
        text: "Great value and location! The staff organized fun activities and I met amazing people."
      },
      {
        id: 2,
        name: "Emma Lewis",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 3,
        date: "April 10, 2023",
        text: "Clean hostel with good facilities. The area can be a bit noisy at night, but that's expected in Kings Cross."
      }
    ],
    createdAt: new Date("2023-02-05T11:25:00Z")
  },
  {
    id: 6,
    name: "Lord Wolseley Hotel",
    description: "A charming boutique hotel located in a historic building in Sydney's oldest neighborhood, The Rocks. Our elegantly appointed rooms blend heritage charm with modern comforts. Enjoy our rooftop garden with harbor views and our acclaimed restaurant serving seasonal local cuisine.",
    address: "7 Circular Quay",
    city: "Sydney",
    country: "Australia",
    location: "The Rocks, Sydney, Australia",
    price: 180,
    discount: 0,
    rating: 4,
    reviewCount: 142,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Rooftop Garden", "Restaurant", "Bar", "Room Service", "Concierge", "Laundry Service", "Air Conditioning", "In-room Safe"],
    accommodates: 2,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    cleaningFee: 25,
    extraGuestFee: 30,
    securityDeposit: 100,
    minStay: 1,
    maxStay: 14,
    cancellationPolicy: "Full refund up to 7 days before check-in. 50% refund between 7 days and 48 hours before check-in. No refund within 48 hours of check-in.",
    reviews: [
      {
        id: 1,
        name: "Paul Andrews",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 4,
        date: "April 25, 2023",
        text: "Beautiful historic hotel with excellent service. The rooftop views of the harbor are spectacular."
      },
      {
        id: 2,
        name: "Catherine Moore",
        avatar: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "March 30, 2023",
        text: "Perfectly located for exploring Sydney. The restaurant serves amazing food - don't miss breakfast!"
      }
    ],
    createdAt: new Date("2023-02-10T13:40:00Z")
  },
  {
    id: 7,
    name: "Radisson Blu Plaza Hotel Sydney",
    description: "An elegant five-star hotel housed in a historic building in Sydney's central business district. Our spacious rooms and suites offer sophisticated luxury with contemporary amenities. Enjoy our indoor pool, spa, and two award-winning restaurants, all within walking distance of Sydney's major attractions.",
    address: "27 O'Connell Street",
    city: "Sydney",
    country: "Australia",
    location: "CBD, Sydney, Australia",
    price: 210,
    discount: 15,
    rating: 5,
    reviewCount: 324,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Indoor Pool", "Spa", "Fitness Center", "2 Restaurants", "Bar", "Room Service", "Business Center", "Concierge", "Valet Parking"],
    accommodates: 3,
    bathrooms: 1,
    bedrooms: 1,
    beds: 2,
    cleaningFee: 40,
    extraGuestFee: 35,
    securityDeposit: 200,
    minStay: 1,
    maxStay: 30,
    cancellationPolicy: "Full refund up to 7 days before check-in. 50% refund between 7 days and 48 hours before check-in. No refund within 48 hours of check-in.",
    reviews: [
      {
        id: 1,
        name: "Daniel Jackson",
        avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "May 15, 2023",
        text: "Impeccable service in a beautiful historic building. The location is perfect for business and sightseeing."
      },
      {
        id: 2,
        name: "Olivia Parker",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "April 20, 2023",
        text: "Luxurious rooms with incredibly comfortable beds. The spa treatments were heavenly and staff was attentive."
      }
    ],
    createdAt: new Date("2023-02-15T15:50:00Z")
  },
  {
    id: 8,
    name: "Holiday Inn Potts Point-Sydney",
    description: "A modern and comfortable hotel located in the vibrant Potts Point neighborhood, offering exceptional value and convenience. Our well-appointed rooms feature panoramic views of Sydney's skyline and harbor. Enjoy easy access to public transportation, restaurants, and nightlife, all while being just minutes from the CBD.",
    address: "203 Victoria Street, Potts Point",
    city: "Sydney",
    country: "Australia",
    location: "Potts Point, Sydney, Australia",
    price: 165,
    discount: 10,
    rating: 4,
    reviewCount: 198,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Restaurant", "Bar", "Fitness Center", "Business Center", "Room Service", "Laundry Service", "Parking", "Air Conditioning"],
    accommodates: 4,
    bathrooms: 1,
    bedrooms: 1,
    beds: 2,
    cleaningFee: 25,
    extraGuestFee: 25,
    securityDeposit: 100,
    minStay: 1,
    maxStay: 30,
    cancellationPolicy: "Full refund up to 48 hours before check-in. No refund within 48 hours of check-in.",
    reviews: [
      {
        id: 1,
        name: "Ryan Collins",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 4,
        date: "May 8, 2023",
        text: "Great value hotel in a lively neighborhood. Room was clean and comfortable with amazing city views."
      },
      {
        id: 2,
        name: "Sophie Adams",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 4,
        date: "April 15, 2023",
        text: "Friendly staff and convenient location. Lots of great restaurants nearby and easy access to the train station."
      }
    ],
    createdAt: new Date("2023-02-20T12:35:00Z")
  },
  {
    id: 9,
    name: "Crown Plaza Sydney",
    description: "Experience luxury stay with panoramic harbor views. A premier hotel offering a blend of style and functionality in the heart of Darling Harbour. Our modern rooms feature panoramic city and water views. Enjoy our rooftop pool, gourmet dining options, and easy access to Sydney's top attractions.",
    address: "150 Day Street",
    city: "Sydney",
    country: "Australia",
    location: "Darling Harbour, Sydney, Australia",
    price: 240,
    discount: 25,
    rating: 5,
    reviewCount: 276,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Rooftop Pool", "Spa", "Fitness Center", "Multiple Restaurants", "Bar", "Room Service", "Business Center", "Concierge", "Valet Parking"],
    accommodates: 4,
    bathrooms: 2,
    bedrooms: 2,
    beds: 2,
    cleaningFee: 45,
    extraGuestFee: 40,
    securityDeposit: 250,
    minStay: 2,
    maxStay: 21,
    cancellationPolicy: "Full refund up to 14 days before check-in. 25% refund between 14 days and 7 days before check-in. No refund within 7 days of check-in.",
    reviews: [
      {
        id: 1,
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "May 20, 2023",
        text: "Exceptional experience from start to finish. The harbor views are stunning and the spa services are top-notch."
      },
      {
        id: 2,
        name: "Natalie Chen",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 4,
        date: "April 28, 2023",
        text: "Beautiful property with excellent amenities. The breakfast buffet offers amazing variety and quality."
      }
    ],
    createdAt: new Date("2023-02-25T16:15:00Z")
  },
  {
    id: 10,
    name: "The Langham, Sydney",
    description: "A luxury heritage hotel offering timeless elegance and unparalleled harbor views in Sydney's historic Rocks district. Our spacious rooms feature classic interiors with modern touches. Indulge in our renowned afternoon tea, relax in the day spa, or enjoy our indoor pool with star-dappled ceiling.",
    address: "89-113 Kent Street, Millers Point",
    city: "Sydney",
    country: "Australia",
    location: "The Rocks, Sydney, Australia",
    price: 320,
    discount: 0,
    rating: 5,
    reviewCount: 189,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Indoor Pool", "Day Spa", "Fitness Center", "Tennis Court", "Restaurant", "Bar", "Room Service", "Concierge", "Valet Parking"],
    accommodates: 3,
    bathrooms: 2,
    bedrooms: 1,
    beds: 2,
    cleaningFee: 60,
    extraGuestFee: 50,
    securityDeposit: 300,
    minStay: 1,
    maxStay: 30,
    cancellationPolicy: "Full refund up to 30 days before check-in. 50% refund between 30 days and 14 days before check-in. No refund within 14 days of check-in.",
    reviews: [
      {
        id: 1,
        name: "Alexandra Bennett",
        avatar: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "May 12, 2023",
        text: "The epitome of luxury. The service was impeccable and the afternoon tea is a must-experience tradition."
      },
      {
        id: 2,
        name: "Christopher Lee",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "April 5, 2023",
        text: "Stayed in many luxury hotels worldwide, and The Langham Sydney stands out. The indoor pool is magical!"
      }
    ],
    createdAt: new Date("2023-03-01T10:20:00Z")
  },
  {
    id: 11,
    name: "The Grace Hotel",
    description: "A heritage-listed Art Deco hotel in the heart of Sydney's CBD, offering a blend of old-world charm and modern comfort. Our beautifully restored building houses elegant rooms with high ceilings and classic furnishings. Enjoy our rooftop recreation center with indoor pool and gym, all within walking distance of Sydney's shopping and entertainment districts.",
    address: "77 York Street",
    city: "Sydney",
    country: "Australia",
    location: "CBD, Sydney, Australia",
    price: 190,
    discount: 10,
    rating: 4,
    reviewCount: 215,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1623625434462-e5e42318ae49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Indoor Pool", "Fitness Center", "Restaurant", "Bar", "Room Service", "Business Center", "Laundry Service", "Air Conditioning"],
    accommodates: 2,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    cleaningFee: 30,
    extraGuestFee: 30,
    securityDeposit: 150,
    minStay: 1,
    maxStay: 21,
    cancellationPolicy: "Full refund up to 7 days before check-in. 50% refund between 7 days and 48 hours before check-in. No refund within 48 hours of check-in.",
    reviews: [
      {
        id: 1,
        name: "Margaret Wilson",
        avatar: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 4,
        date: "May 5, 2023",
        text: "Beautiful Art Deco building with classic charm. Great location for shopping and business meetings."
      },
      {
        id: 2,
        name: "Steve Harris",
        avatar: "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "March 22, 2023",
        text: "Spacious rooms with high ceilings and comfortable beds. The rooftop pool is a great place to relax."
      }
    ],
    createdAt: new Date("2023-03-05T14:30:00Z")
  },
  {
    id: 12,
    name: "QT Sydney",
    description: "A designer boutique hotel with theatrical flair, set within two historic buildings in Sydney's CBD. Our eclectic rooms feature luxurious bedding, free-standing tubs, and quirky design elements. Enjoy our acclaimed restaurant, sophisticated bar, and indulgent spa, all while being steps away from the Queen Victoria Building and major shopping districts.",
    address: "49 Market Street",
    city: "Sydney",
    country: "Australia",
    location: "CBD, Sydney, Australia",
    price: 250,
    discount: 0,
    rating: 4,
    reviewCount: 167,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    ],
    amenities: ["Free WiFi", "Spa", "Restaurant", "Bar", "Room Service", "Concierge", "Laundry Service", "Air Conditioning", "In-room Safe"],
    accommodates: 2,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    cleaningFee: 40,
    extraGuestFee: 45,
    securityDeposit: 200,
    minStay: 1,
    maxStay: 14,
    cancellationPolicy: "Full refund up to 14 days before check-in. 50% refund between 14 days and 7 days before check-in. No refund within 7 days of check-in.",
    reviews: [
      {
        id: 1,
        name: "Tiffany Wong",
        avatar: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 5,
        date: "April 18, 2023",
        text: "Absolutely loved the quirky design and attentive staff. The bathtub in the room was divine!"
      },
      {
        id: 2,
        name: "Brian Taylor",
        avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        rating: 4,
        date: "March 10, 2023",
        text: "Fantastic boutique hotel with character. Great cocktails at the bar and excellent location for shopping."
      }
    ],
    createdAt: new Date("2023-03-10T11:55:00Z")
  }
];
