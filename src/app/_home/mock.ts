type RoomAmenities = {
  id: number;
};

type RoomPrice = {
  id: number;
  price_per_night: number;
};

type RoomType = {
  id: number;
  name: string;
  description: string;
};

export interface Room {
  id: number;
  room_number: string;
  room_type: RoomType;
  floor: number;
  status;
}

export const availableRooms = [
  {
    id: "1",
    roomNumber: "101",
    name: "Deluxe Double Room",
    thumbnail: {
      src: "/placeholder.svg",
      alt: "Room 1",
    },
    capacity: 2,
    description: "Cozy room with basic amenities.",
    roomType: "Standard Room",
    location: "Luxury Hotel, 123 Main Street, New York, NY, USA",
    amenities: [
      {
        name: "Swimming Pool",
        description: "Access to an outdoor swimming pool.",
      },
      {
        name: "Free WiFi",
        description: "Free Wi-Fi in the room.",
      },
      {
        name: "Free Parking",
        description: "Free parking available.",
      },
    ],
    availableCount: 5,
    price: 100,
    images: ["/room1.jpg", "/room2.jpg"],
  },
];
