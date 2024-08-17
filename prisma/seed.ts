import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create some payment methods
  const paymentMethod1 = await prisma.paymentMethod.create({
    data: {
      method_name: "Credit Card",
    },
  });

  const paymentMethod2 = await prisma.paymentMethod.create({
    data: {
      method_name: "PayPal",
    },
  });

  // Create a user
  const user1 = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      phone: "1234567890",
      password: "securepassword",
      first_name: "John",
      middle_name: "A",
      last_name: "Doe",
      username: "johndoe",
      birthdate: new Date("1990-01-01"),
    },
  });

  // Create a location
  const location1 = await prisma.location.create({
    data: {
      location_name: "City Center Hotel",
      address: "123 Main St",
      city: "Metropolis",
      state: "Stateville",
      country: "Countryland",
    },
  });

  // Create a room type
  const roomType1 = await prisma.roomType.create({
    data: {
      type_name: "Standard Room",
      description: "A comfortable room with standard amenities.",
    },
  });

  // Create some amenities
  const amenity1 = await prisma.amenity.create({
    data: {
      amenity_name: "Free Wi-Fi",
      description:
        "High-speed wireless internet available throughout the hotel.",
    },
  });

  const amenity2 = await prisma.amenity.create({
    data: {
      amenity_name: "Air Conditioning",
      description: "Individually controlled air conditioning in each room.",
    },
  });

  // Create a room
  const room1 = await prisma.room.create({
    data: {
      location_id: location1.id,
      room_type_id: roomType1.id,
      room_number: 101,
      capacity: 2,
      price_per_night: 100.0,
      roomAmenities: {
        create: [{ amenity_id: amenity1.id }, { amenity_id: amenity2.id }],
      },
    },
  });

  // Add an image to the room
  await prisma.roomImage.create({
    data: {
      room_id: room1.id,
      image_url: "https://example.com/room1.jpg",
    },
  });

  // Create room availability
  await prisma.roomAvailability.create({
    data: {
      room_id: room1.id,
      available_count: 10,
    },
  });

  // Create a reservation
  const reservation1 = await prisma.reservation.create({
    data: {
      user_id: user1.id,
      room_id: room1.id,
      start_datetime: new Date("2024-08-20T14:00:00Z"),
      end_datetime: new Date("2024-08-25T10:00:00Z"),
      reservation_notes: "Requesting a high floor.",
    },
  });

  // Create a payment for the reservation
  await prisma.payment.create({
    data: {
      reservation_id: reservation1.id,
      payment_method_id: paymentMethod1.id,
      amount: 500.0,
      payment_datetime: new Date(),
    },
  });

  // Create a review for the reservation
  await prisma.review.create({
    data: {
      reservation_id: reservation1.id,
      rating: 5,
      review_text: "Had an excellent stay. Highly recommended!",
      review_datetime: new Date(),
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
