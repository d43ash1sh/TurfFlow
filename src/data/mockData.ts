export interface Turf {
  id: string;
  name: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  sport: string;
  image: string;
  amenities: string[];
  description: string;
  ownerId: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  status: 'available' | 'booked' | 'selected';
}

export interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  location: string;
  date: string;
  slots: string[];
  totalAmount: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  sport: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'player' | 'owner' | 'admin';
  joinDate: string;
  status: 'active' | 'suspended';
  bookings: number;
}

export const turfs: Turf[] = [
  {
    id: '1',
    name: 'Goal Arena Turf',
    location: 'Beltola, Guwahati',
    city: 'Guwahati',
    price: 800,
    rating: 4.8,
    reviews: 124,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop',
    amenities: ['Changing Rooms', 'Parking', 'Floodlights', 'Drinking Water', 'First Aid'],
    description: 'Premium synthetic turf ground with international standard FIFA-quality surface. Perfect for 5-a-side and 7-a-side football matches with full floodlighting for evening games.',
    ownerId: 'owner1',
  },
  {
    id: '2',
    name: 'Shillong Elite Turf',
    location: 'Laitumkhrah, Shillong',
    city: 'Shillong',
    price: 900,
    rating: 4.6,
    reviews: 89,
    sport: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop',
    amenities: ['Changing Rooms', 'Cafeteria', 'Parking', 'Floodlights'],
    description: 'State-of-the-art cricket practice nets and open ground in the heart of Shillong. Ideal for batting and bowling practice sessions.',
    ownerId: 'owner2',
  },
  {
    id: '3',
    name: 'Green Zone Sports Hub',
    location: 'Zoo Road, Guwahati',
    city: 'Guwahati',
    price: 650,
    rating: 4.5,
    reviews: 67,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
    amenities: ['Parking', 'Floodlights', 'Drinking Water'],
    description: 'Budget-friendly turf facility with well-maintained artificial grass. Great for casual matches and weekend tournaments.',
    ownerId: 'owner1',
  },
  {
    id: '4',
    name: 'Thunder Badminton Court',
    location: 'Six Mile, Guwahati',
    city: 'Guwahati',
    price: 400,
    rating: 4.7,
    reviews: 201,
    sport: 'Badminton',
    image: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800&auto=format&fit=crop',
    amenities: ['AC Hall', 'Changing Rooms', 'Parking', 'Pro Shop'],
    description: 'Indoor air-conditioned badminton courts with professional wooden flooring. Suitable for both recreational and competitive play.',
    ownerId: 'owner3',
  },
];

export const timeSlots: TimeSlot[] = [
  { id: 's1', time: '06:00 AM', status: 'booked' },
  { id: 's2', time: '07:00 AM', status: 'booked' },
  { id: 's3', time: '08:00 AM', status: 'available' },
  { id: 's4', time: '09:00 AM', status: 'available' },
  { id: 's5', time: '10:00 AM', status: 'available' },
  { id: 's6', time: '11:00 AM', status: 'booked' },
  { id: 's7', time: '12:00 PM', status: 'booked' },
  { id: 's8', time: '01:00 PM', status: 'available' },
  { id: 's9', time: '02:00 PM', status: 'available' },
  { id: 's10', time: '03:00 PM', status: 'available' },
  { id: 's11', time: '04:00 PM', status: 'booked' },
  { id: 's12', time: '05:00 PM', status: 'booked' },
  { id: 's13', time: '06:00 PM', status: 'available' },
  { id: 's14', time: '07:00 PM', status: 'available' },
  { id: 's15', time: '08:00 PM', status: 'available' },
  { id: 's16', time: '09:00 PM', status: 'booked' },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    turfId: '1',
    turfName: 'Goal Arena Turf',
    location: 'Beltola, Guwahati',
    date: '2026-05-10',
    slots: ['06:00 PM', '07:00 PM'],
    totalAmount: 1600,
    status: 'upcoming',
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop',
  },
  {
    id: 'b2',
    turfId: '4',
    turfName: 'Thunder Badminton Court',
    location: 'Six Mile, Guwahati',
    date: '2026-04-28',
    slots: ['09:00 AM', '10:00 AM'],
    totalAmount: 800,
    status: 'completed',
    sport: 'Badminton',
    image: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800&auto=format&fit=crop',
  },
  {
    id: 'b3',
    turfId: '2',
    turfName: 'Shillong Elite Turf',
    location: 'Laitumkhrah, Shillong',
    date: '2026-04-20',
    slots: ['03:00 PM'],
    totalAmount: 900,
    status: 'cancelled',
    sport: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop',
  },
];

export const users: User[] = [
  { id: 'u1', name: 'Rahul Bora', email: 'rahul@example.com', phone: '9876543210', role: 'player', joinDate: '2026-01-10', status: 'active', bookings: 12 },
  { id: 'u2', name: 'Priya Das', email: 'priya@example.com', phone: '9876543211', role: 'player', joinDate: '2026-02-14', status: 'active', bookings: 7 },
  { id: 'u3', name: 'Ankit Sharma', email: 'ankit@example.com', phone: '9876543212', role: 'owner', joinDate: '2026-01-01', status: 'active', bookings: 0 },
  { id: 'u4', name: 'Meghna Roy', email: 'meghna@example.com', phone: '9876543213', role: 'player', joinDate: '2026-03-05', status: 'suspended', bookings: 2 },
  { id: 'u5', name: 'Sanjay Kalita', email: 'sanjay@example.com', phone: '9876543214', role: 'owner', joinDate: '2025-12-20', status: 'active', bookings: 0 },
];

export const ownerTurfs: Turf[] = [turfs[0], turfs[2]];

export const earningsData = {
  totalEarnings: 124500,
  thisMonth: 18900,
  lastMonth: 21400,
  totalBookings: 142,
  thisMonthBookings: 21,
  avgRating: 4.7,
  monthlyData: [
    { month: 'Jan', earnings: 14200 },
    { month: 'Feb', earnings: 16800 },
    { month: 'Mar', earnings: 19200 },
    { month: 'Apr', earnings: 21400 },
    { month: 'May', earnings: 18900 },
  ],
};

export const sports = ['All', 'Football', 'Cricket', 'Badminton', 'Basketball', 'Tennis'];
