export interface Turf {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  reviews: number;
  sport: string;
  image: string;      // main display image
  images: string[];   // gallery images
  amenities: string[];
  description: string;
  ownerId: string;
  lat: number;
  lng: number;
  basePrice: number;
  extraHourPrice: number;
}

export interface TimeSlot {
  time: string; // "10:00", "11:00"
  status: 'available' | 'booked' | 'selected';
}

export interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
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
    name: 'Chumu Futsal Ground (CFG)',
    location: 'Itanagar',
    city: 'Itanagar',
    basePrice: 1200,
    extraHourPrice: 1000,
    rating: 4.9,
    reviews: 119,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1431324155629-1a6eda1fedeb?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop'
    ],
    amenities: ['Parking', 'Floodlights', 'Drinking Water', 'Washroom'],
    description: 'Best turf and available parking area. Open 24 hours for non-stop action.',
    ownerId: 'owner1',
    lat: 27.0844,
    lng: 93.6053,
  },
  {
    id: '2',
    name: "Baller's Arena Itanagar",
    location: 'Opposite Mahindra Workshop',
    city: 'Itanagar',
    basePrice: 1000,
    extraHourPrice: 800,
    rating: 3.2,
    reviews: 17,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526189291168-581369fe24b1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?w=800&auto=format&fit=crop'
    ],
    amenities: ['Parking', 'Maintenance Staff', 'Floodlights'],
    description: 'Well equipped soccer field with regular maintenance of the pitch.',
    ownerId: 'owner2',
    lat: 27.0912,
    lng: 93.6120,
  },
  {
    id: '3',
    name: 'STRIKERS ARENA FUTSAL',
    location: 'Naharlagun',
    city: 'Naharlagun',
    basePrice: 1100,
    extraHourPrice: 900,
    rating: 4.6,
    reviews: 11,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524015324113-ad2768567d02?w=800&auto=format&fit=crop'
    ],
    amenities: ['Parking', 'Vibe Zone', 'Floodlights'],
    description: 'Great futsal quality and vibe.',
    ownerId: 'owner1',
    lat: 27.1055,
    lng: 93.6922,
  },
  {
    id: '4',
    name: 'EVENORI The Ground',
    location: 'Jully Basti Rd',
    city: 'Itanagar',
    basePrice: 1300,
    extraHourPrice: 1100,
    rating: 4.1,
    reviews: 84,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526189291168-581369fe24b1?w=800&auto=format&fit=crop'
    ],
    amenities: ['Parking', 'Cafeteria', 'Floodlights'],
    description: 'One of the best turf grounds in the capital.',
    ownerId: 'owner3',
    lat: 27.0722,
    lng: 93.6215,
  },
  {
    id: '5',
    name: 'Més Que Football Arena',
    location: 'Rooftop O.T. Building',
    city: 'Itanagar',
    basePrice: 1500,
    extraHourPrice: 1200,
    rating: 4.0,
    reviews: 186,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6eda1fedeb?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1431324155629-1a6eda1fedeb?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop'
    ],
    amenities: ['Rooftop View', 'Parking', 'Floodlights'],
    description: 'Nice ground with unique rooftop experience.',
    ownerId: 'owner2',
    lat: 27.1000,
    lng: 93.6000,
  },
  {
    id: '6',
    name: 'JITO BADMINTON ARENA',
    location: 'Chimpu',
    city: 'Itanagar',
    basePrice: 800,
    extraHourPrice: 600,
    rating: 3.5,
    reviews: 53,
    sport: 'Badminton',
    image: 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1626224580194-860c36f67554?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621360341396-4190906757f1?w=800&auto=format&fit=crop'
    ],
    amenities: ['Indoor Court', 'Parking', 'Floodlights'],
    description: 'Professional indoor badminton courts in Chimpu.',
    ownerId: 'owner3',
    lat: 27.0500,
    lng: 93.6000,
  },
  {
    id: '7',
    name: 'Soku Basketball Court',
    location: '6 Kilo',
    city: 'Itanagar',
    basePrice: 1100,
    extraHourPrice: 900,
    rating: 4.1,
    reviews: 52,
    sport: 'Basketball',
    image: 'https://images.unsplash.com/photo-1544919396-d1306bc39971?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544919396-d1306bc39971?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&auto=format&fit=crop'
    ],
    amenities: ['Professional Hoops', 'Parking', 'Washroom'],
    description: 'High-quality basketball court with amazing views.',
    ownerId: 'owner1',
    lat: 27.0650,
    lng: 93.6300,
  },
  {
    id: '8',
    name: 'TMT CRICKET ARENA',
    location: 'Naharlagun',
    city: 'Naharlagun',
    basePrice: 1400,
    extraHourPrice: 1100,
    rating: 4.3,
    reviews: 60,
    sport: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&auto=format&fit=crop'
    ],
    amenities: ['Bowling Machines', 'Nets', 'Parking'],
    description: 'Premier cricket facility in Naharlagun for practice and matches.',
    ownerId: 'owner2',
    lat: 27.1100,
    lng: 93.7000,
  },
  {
    id: '9',
    name: 'Aku amu Tennis Court',
    location: 'Niya colony',
    city: 'Itanagar',
    basePrice: 900,
    extraHourPrice: 700,
    rating: 4.0,
    reviews: 22,
    sport: 'Tennis',
    image: 'https://images.unsplash.com/photo-1595435064219-c80ce5444206?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595435064219-c80ce5444206?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554062614-6da4d67399b1?w=800&auto=format&fit=crop'
    ],
    amenities: ['Synthetic Court', 'Floodlights', 'Parking'],
    description: 'Standard synthetic tennis court for singles and doubles.',
    ownerId: 'owner3',
    lat: 27.0800,
    lng: 93.6400,
  },
  {
    id: '10',
    name: 'Anfield Football Ground',
    location: 'Nirjuli',
    city: 'Nirjuli',
    basePrice: 1000,
    extraHourPrice: 800,
    rating: 4.2,
    reviews: 71,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1526189291168-581369fe24b1?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1526189291168-581369fe24b1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524015324113-ad2768567d02?w=800&auto=format&fit=crop'
    ],
    amenities: ['Easily Accessible', 'Parking', 'Floodlights'],
    description: 'Nice turf, medium size and easily accessible.',
    ownerId: 'owner1',
    lat: 27.1200,
    lng: 93.7500,
  },
  {
    id: '11',
    name: 'G Tennis Arena',
    location: 'Bage tinali',
    city: 'Naharlagun',
    basePrice: 1100,
    extraHourPrice: 900,
    rating: 4.1,
    reviews: 25,
    sport: 'Tennis',
    image: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595435064219-c80ce5444206?w=800&auto=format&fit=crop'
    ],
    amenities: ['Pro Coaching', 'Parking', 'Floodlights'],
    description: 'Best tennis court in the region with coaching facilities.',
    ownerId: 'owner2',
    lat: 27.1300,
    lng: 93.7200,
  },
  {
    id: '12',
    name: 'Football A.S Arena',
    location: 'Itanagar',
    city: 'Itanagar',
    basePrice: 1000,
    extraHourPrice: 800,
    rating: 4.3,
    reviews: 26,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop'
    ],
    amenities: ['High Quality Turf', 'Parking', 'Drinking Water'],
    description: 'Best ground in my experience.',
    ownerId: 'owner3',
    lat: 27.0900,
    lng: 93.6500,
  },
  {
    id: '13',
    name: 'Hornbill Basketball Club',
    location: 'Naharlagun',
    city: 'Naharlagun',
    basePrice: 1200,
    extraHourPrice: 1000,
    rating: 3.9,
    reviews: 19,
    sport: 'Basketball',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544919396-d1306bc39971?w=800&auto=format&fit=crop'
    ],
    amenities: ['Roof Cover', 'Indoor Feel', 'Parking'],
    description: 'Good indoor basketball court with roof.',
    ownerId: 'owner1',
    lat: 27.1400,
    lng: 93.6800,
  },
  {
    id: '14',
    name: 'GJ FUTSAL ARENA',
    location: 'Naharlagun',
    city: 'Naharlagun',
    basePrice: 1100,
    extraHourPrice: 900,
    rating: 4.0,
    reviews: 60,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1524015324113-ad2768567d02?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1524015324113-ad2768567d02?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?w=800&auto=format&fit=crop'
    ],
    amenities: ['Awesome Quality', 'Good Location', 'Floodlights'],
    description: 'Loved it, turf quality is awesome.',
    ownerId: 'owner2',
    lat: 27.1000,
    lng: 93.7100,
  },
  {
    id: '15',
    name: 'N.K VOLLEYBALL TURF',
    location: 'Naharlagun',
    city: 'Naharlagun',
    basePrice: 600,
    extraHourPrice: 400,
    rating: 4.2,
    reviews: 12,
    sport: 'Volleyball',
    image: 'https://images.unsplash.com/photo-1592656670411-591e413fb315?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592656670411-591e413fb315?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1579758629938-03607cc9ab95?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544919396-d1306bc39971?w=800&auto=format&fit=crop'
    ],
    amenities: ['Volleyball Net', 'Parking', 'Floodlights'],
    description: 'Freshly launched volleyball turf in Naharlagun.',
    ownerId: 'owner3',
    lat: 27.1150,
    lng: 93.7300,
  },
  {
    id: '16',
    name: 'Cloud 9 Cricket Ground',
    location: 'Lekhi',
    city: 'Naharlagun',
    basePrice: 1300,
    extraHourPrice: 1100,
    rating: 3.8,
    reviews: 54,
    sport: 'Cricket',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop'
    ],
    amenities: ['Pitch Covers', 'Parking', 'Washroom'],
    description: 'Big cricket ground with multiple practice nets.',
    ownerId: 'owner1',
    lat: 27.1500,
    lng: 93.7800,
  },
  {
    id: '17',
    name: 'Gecko Sports Hub',
    location: 'Itanagar',
    city: 'Itanagar',
    basePrice: 1400,
    extraHourPrice: 1200,
    rating: 3.9,
    reviews: 135,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6eda1fedeb?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1431324155629-1a6eda1fedeb?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Restaurant', 'Washroom'],
    description: 'Complete sporting complex with futsal, swimming, and more.',
    ownerId: 'owner2',
    lat: 27.0850,
    lng: 93.6200,
  },
  {
    id: '18',
    name: 'K.D Badminton Futsal',
    location: 'Ganga',
    city: 'Itanagar',
    basePrice: 1000,
    extraHourPrice: 800,
    rating: 4.8,
    reviews: 4,
    sport: 'Badminton',
    image: 'https://images.unsplash.com/photo-1626224580194-860c36f67554?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1626224580194-860c36f67554?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800&auto=format&fit=crop'
    ],
    amenities: ['Sufficient Space', 'Parking', 'Floodlights'],
    description: 'Very nice indoor badminton facility.',
    ownerId: 'owner3',
    lat: 27.0950,
    lng: 93.6150,
  },
  {
    id: '19',
    name: 'T-Arena Volleyball Court',
    location: '6 Kilo',
    city: 'Itanagar',
    basePrice: 700,
    extraHourPrice: 500,
    rating: 5.0,
    reviews: 5,
    sport: 'Volleyball',
    image: 'https://images.unsplash.com/photo-1579758629938-03607cc9ab95?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1579758629938-03607cc9ab95?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592656670411-591e413fb315?w=800&auto=format&fit=crop'
    ],
    amenities: ['Pro Net', 'Parking', 'Services'],
    description: 'Top rated volleyball court in Itanagar.',
    ownerId: 'owner1',
    lat: 27.0680,
    lng: 93.6320,
  },
  {
    id: '20',
    name: 'Mes Que Champions Arena',
    location: 'Naharlagun',
    city: 'Naharlagun',
    basePrice: 1600,
    extraHourPrice: 1300,
    rating: 4.2,
    reviews: 66,
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop'
    ],
    amenities: ['Biggest Turf', 'Parking', 'Floodlights'],
    description: 'Best & the biggest turf in the state.',
    ownerId: 'owner2',
    lat: 27.1250,
    lng: 93.6950,
  },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    turfId: '1',
    turfName: 'Chumu Futsal Ground (CFG)',
    location: 'Itanagar',
    date: '2026-05-10',
    startTime: '18:00',
    endTime: '20:00',
    duration: 2,
    totalAmount: 2200,
    status: 'upcoming',
    sport: 'Football',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop',
  },
];

export const users: User[] = [
  { id: 'u1', name: 'Rahul Bora', email: 'rahul@example.com', phone: '9876543210', role: 'player', joinDate: '2026-01-10', status: 'active', bookings: 12 },
  { id: 'u2', name: 'Priya Das', email: 'priya@example.com', phone: '9876543211', role: 'player', joinDate: '2026-02-14', status: 'active', bookings: 7 },
  { id: 'u3', name: 'Ankit Sharma', email: 'ankit@example.com', phone: '9876543212', role: 'owner', joinDate: '2026-01-01', status: 'active', bookings: 0 },
  { id: 'u4', name: 'Meghna Roy', email: 'meghna@example.com', phone: '9876543213', role: 'player', joinDate: '2026-03-05', status: 'suspended', bookings: 2 },
  { id: 'u5', name: 'Sanjay Kalita', email: 'sanjay@example.com', phone: '9876543214', role: 'owner', joinDate: '2025-12-20', status: 'active', bookings: 0 },
];

export const ownerTurfs: Turf[] = [turfs[0], turfs[2], turfs[9]];

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

export const sports = ['All', 'Football', 'Cricket', 'Badminton', 'Basketball', 'Tennis', 'Volleyball'];
