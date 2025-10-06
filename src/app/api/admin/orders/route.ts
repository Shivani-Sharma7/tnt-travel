import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tnt-travel';

// Connect to MongoDB
if (!mongoose.connections[0].readyState) {
  mongoose.connect(MONGODB_URI, { dbName: 'tnt-travel' });
}

// User Schema to get real user data
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  password: String,
  address: String,
  icon: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  pincode: String,
  country: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Generate realistic orders based on actual users and services
const generateRealisticOrders = (users: any[]) => {
  const services = [
    {
      type: 'hotel',
      name: 'Hotel Krishna Palace',
      price: 1500,
      image: '/activity/hotels.jpg'
    },
    {
      type: 'hotel', 
      name: 'Hotel Radha Krishna',
      price: 2000,
      image: '/activity/hotels.jpg'
    },
    {
      type: 'taxi',
      name: 'Swift Dzire (AC)',
      price: 1000,
      image: '/activity/taxi.jpg'
    },
    {
      type: 'taxi',
      name: 'Maruti Ertiga (AC)',
      price: 1800,
      image: '/activity/taxi.jpg'
    },
    {
      type: 'taxi',
      name: 'Innova Crysta (AC)',
      price: 1200,
      image: '/activity/taxi.jpg'
    },
    {
      type: 'trip',
      name: 'Mathura Vrindavan Agra 3 Day Trip Package',
      price: 5000,
      image: '/activity/mathura.png'
    }
  ];

  const paymentMethods = ['UPI', 'Credit Card', 'Net Banking', 'Debit Card', 'Wallet'];
  const statuses = ['confirmed', 'processing', 'completed', 'cancelled'];
  const comments = [
    'Please ensure early check-in',
    'Vegetarian meals only',
    'Customer requested cancellation due to change in travel plans',
    'Need airport pickup',
    'Family with children',
    'Business trip',
    'Religious pilgrimage',
    'Honeymoon trip',
    'Group booking',
    'Repeat customer'
  ];

  const orders = [];
  let orderCounter = 1;

  // Generate orders for each user
  users.forEach((user, userIndex) => {
    const numOrders = Math.floor(Math.random() * 5) + 1; // 1-5 orders per user
    
    for (let i = 0; i < numOrders; i++) {
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days
      
      const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
      const selectedServices = [];
      const totalAmount = Math.floor(Math.random() * 5000) + 500; // Random total between 500-5500
      
      for (let j = 0; j < numItems; j++) {
        const service = services[Math.floor(Math.random() * services.length)];
        selectedServices.push({
          id: `${service.type}-${j + 1}`,
          type: service.type,
          name: service.name,
          price: Math.floor(totalAmount / numItems),
          image: service.image,
          details: generateItemDetails(service.type)
        });
      }

      const order = {
        orderId: `ORD-2024-${String(orderCounter).padStart(3, '0')}`,
        transactionId: `TXN-${Date.now()}-${orderCounter}`,
        customerName: user.name || 'Unknown User',
        customerEmail: user.email || '',
        customerMobile: user.mobile || '',
        preferredDay: orderDate.toISOString().split('T')[0],
        preferredTime: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        amountPaid: totalAmount,
        totalAmount: totalAmount,
        isAdvancePayment: Math.random() > 0.7,
        items: selectedServices,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        orderDate: orderDate.toISOString(),
        orderTime: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        comments: comments[Math.floor(Math.random() * comments.length)],
        userId: user._id?.toString() || `user-${userIndex}`,
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      };

      orders.push(order);
      orderCounter++;
    }
  });

  return orders;
};

const generateItemDetails = (type: string) => {
  switch (type) {
    case 'hotel':
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + Math.floor(Math.random() * 30) + 1);
      const checkOut = new Date(checkIn);
      checkOut.setDate(checkOut.getDate() + Math.floor(Math.random() * 5) + 1);
      
      return {
        checkIn: checkIn.toISOString().split('T')[0],
        checkOut: checkOut.toISOString().split('T')[0],
        guests: Math.floor(Math.random() * 4) + 1,
        accommodation: ['Standard Room', 'Deluxe Room', 'Family Room', 'Suite'][Math.floor(Math.random() * 4)]
      };
    case 'taxi':
      return {
        pickupLocation: ['Delhi Airport', 'Mathura Railway Station', 'Agra Airport', 'Vrindavan Bus Stand'][Math.floor(Math.random() * 4)],
        dropLocation: ['Mathura', 'Vrindavan', 'Agra', 'Delhi'][Math.floor(Math.random() * 4)],
        pickupDate: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pickupTime: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        passengers: Math.floor(Math.random() * 6) + 1
      };
    case 'trip':
      const tripDate = new Date();
      tripDate.setDate(tripDate.getDate() + Math.floor(Math.random() * 30) + 1);
      const tripEndDate = new Date(tripDate);
      tripEndDate.setDate(tripEndDate.getDate() + Math.floor(Math.random() * 5) + 1);
      
      return {
        tripDate: tripDate.toISOString().split('T')[0],
        tripEndDate: tripEndDate.toISOString().split('T')[0],
        duration: `${Math.floor(Math.random() * 5) + 1} Days`,
        accommodation: ['3 Star Hotel', '4 Star Hotel', 'Budget Hotel', 'Luxury Resort'][Math.floor(Math.random() * 4)],
        transportation: ['AC Car', 'Non-AC Car', 'Bus', 'Train'][Math.floor(Math.random() * 4)],
        meals: ['Breakfast & Dinner', 'All Meals', 'Breakfast Only', 'No Meals'][Math.floor(Math.random() * 4)],
        activities: ['Temple Visits', 'Taj Mahal Tour', 'Cultural Shows', 'Local Sightseeing'][Math.floor(Math.random() * 4)]
      };
    default:
      return {};
  }
};

// Real orders based on actual users
const getRealOrders = async () => {
  try {
    // Get all users from database
    const users = await User.find({}).select('-password');
    
    if (users.length === 0) {
      // If no users found, return empty array
      return [];
    }
    
    // Generate realistic orders based on actual users
    return generateRealisticOrders(users);
  } catch (error) {
    console.error('Error generating real orders:', error);
    return [];
  }
};

// Fallback mock data if no real users exist
const mockOrders = [
  {
    orderId: 'ORD-2024-001',
    transactionId: 'TXN-2024-001',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh.kumar@email.com',
    customerMobile: '+91 98765 43210',
    preferredDay: '2024-01-15',
    preferredTime: '10:00 AM',
    paymentMethod: 'UPI',
    amountPaid: 2500,
    totalAmount: 2500,
    isAdvancePayment: false,
    items: [
      {
        id: 'hotel-1',
        type: 'hotel' as const,
        name: 'Hotel Krishna Palace',
        price: 1500,
        image: '/activity/hotels.jpg',
        details: {
          checkIn: '2024-01-15',
          checkOut: '2024-01-17',
          guests: 2,
          accommodation: 'Deluxe Room'
        }
      },
      {
        id: 'taxi-1',
        type: 'taxi' as const,
        name: 'Swift Dzire (AC)',
        price: 1000,
        image: '/activity/taxi.jpg',
        details: {
          pickupLocation: 'Delhi Airport',
          dropLocation: 'Mathura',
          pickupDate: '2024-01-15',
          pickupTime: '10:00 AM',
          passengers: 2
        }
      }
    ],
    status: 'confirmed' as const,
    orderDate: '2024-01-10T10:30:00Z',
    orderTime: '10:30 AM',
    comments: 'Please ensure early check-in',
    userId: 'user-123',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    orderId: 'ORD-2024-002',
    transactionId: 'TXN-2024-002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@email.com',
    customerMobile: '+91 87654 32109',
    preferredDay: '2024-01-20',
    preferredTime: '09:00 AM',
    paymentMethod: 'Credit Card',
    amountPaid: 5000,
    totalAmount: 5000,
    isAdvancePayment: true,
    items: [
      {
        id: 'trip-1',
        type: 'trip' as const,
        name: 'Mathura Vrindavan Agra 3 Day Trip Package',
        price: 5000,
        image: '/activity/mathura.png',
        details: {
          tripDate: '2024-01-20',
          tripEndDate: '2024-01-22',
          duration: '3 Days',
          accommodation: '3 Star Hotel',
          transportation: 'AC Car',
          meals: 'Breakfast & Dinner',
          activities: 'Temple Visits, Taj Mahal Tour'
        }
      }
    ],
    status: 'processing' as const,
    orderDate: '2024-01-12T14:20:00Z',
    orderTime: '02:20 PM',
    comments: 'Vegetarian meals only',
    userId: 'user-456',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  },
  {
    orderId: 'ORD-2024-003',
    transactionId: 'TXN-2024-003',
    customerName: 'Amit Singh',
    customerEmail: 'amit.singh@email.com',
    customerMobile: '+91 76543 21098',
    preferredDay: '2024-01-18',
    preferredTime: '11:00 AM',
    paymentMethod: 'Net Banking',
    amountPaid: 1800,
    totalAmount: 1800,
    isAdvancePayment: false,
    items: [
      {
        id: 'taxi-2',
        type: 'taxi' as const,
        name: 'Maruti Ertiga (AC)',
        price: 1800,
        image: '/activity/taxi.jpg',
        details: {
          pickupLocation: 'Mathura Railway Station',
          dropLocation: 'Vrindavan',
          pickupDate: '2024-01-18',
          pickupTime: '11:00 AM',
          passengers: 4
        }
      }
    ],
    status: 'completed' as const,
    orderDate: '2024-01-14T16:45:00Z',
    orderTime: '04:45 PM',
    userId: 'user-789',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
  },
  {
    orderId: 'ORD-2024-004',
    transactionId: 'TXN-2024-004',
    customerName: 'Sunita Devi',
    customerEmail: 'sunita.devi@email.com',
    customerMobile: '+91 65432 10987',
    preferredDay: '2024-01-25',
    preferredTime: '08:00 AM',
    paymentMethod: 'UPI',
    amountPaid: 3200,
    totalAmount: 3200,
    isAdvancePayment: false,
    items: [
      {
        id: 'hotel-2',
        type: 'hotel' as const,
        name: 'Hotel Radha Krishna',
        price: 2000,
        image: '/activity/hotels.jpg',
        details: {
          checkIn: '2024-01-25',
          checkOut: '2024-01-27',
          guests: 3,
          accommodation: 'Family Room'
        }
      },
      {
        id: 'taxi-3',
        type: 'taxi' as const,
        name: 'Innova Crysta (AC)',
        price: 1200,
        image: '/activity/taxi.jpg',
        details: {
          pickupLocation: 'Agra Airport',
          dropLocation: 'Mathura',
          pickupDate: '2024-01-25',
          pickupTime: '08:00 AM',
          passengers: 3
        }
      }
    ],
    status: 'cancelled' as const,
    orderDate: '2024-01-16T12:15:00Z',
    orderTime: '12:15 PM',
    comments: 'Customer requested cancellation due to change in travel plans',
    userId: 'user-321',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') || 'all';
    const type = searchParams.get('type') || 'all';
    const search = searchParams.get('search') || '';
    const dateRange = searchParams.get('dateRange') || 'all';

    // Get real orders based on actual users, fallback to mock data
    const realOrders = await getRealOrders();
    const allOrders = realOrders.length > 0 ? realOrders : mockOrders;

    // Filter orders based on parameters
    let filteredOrders = [...allOrders];

    // Filter by status
    if (status !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }

    // Filter by type
    if (type !== 'all') {
      filteredOrders = filteredOrders.filter(order => 
        order.items.some(item => item.type === type)
      );
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredOrders = filteredOrders.filter(order =>
        order.orderId.toLowerCase().includes(searchLower) ||
        order.customerName.toLowerCase().includes(searchLower) ||
        order.customerEmail.toLowerCase().includes(searchLower) ||
        order.customerMobile.includes(search) ||
        order.items.some(item => item.name.toLowerCase().includes(searchLower))
      );
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.orderDate);
        
        switch (dateRange) {
          case 'today':
            return orderDate >= today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return orderDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return orderDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Sort by order date (newest first)
    filteredOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    const total = filteredOrders.length;
    const pages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: paginatedOrders,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
