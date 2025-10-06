'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface OrderItem {
  id: string;
  type: 'hotel' | 'taxi' | 'trip';
  name: string;
  price: number;
  image: string;
  details: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    pickupLocation?: string;
    dropLocation?: string;
    pickupDate?: string;
    pickupTime?: string;
    passengers?: number;
    duration?: string;
    accommodation?: string;
    hotel?: string;
    transportation?: string;
    meals?: string;
    activities?: string;
    tripDate?: string;
    tripEndDate?: string;
  };
}

interface Order {
  orderId: string;
  transactionId: string;
  customerName: string;
  customerMobile: string;
  preferredDay?: string;
  preferredTime?: string;
  paymentMethod: string;
  amountPaid: number;
  totalAmount: number;
  isAdvancePayment: boolean;
  items: OrderItem[];
  status: 'confirmed' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
  orderTime: string;
  comments?: string;
}

export default function OrderHistoryPage() {
  const router = useRouter();
  const { user } = useCart();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadOrderHistory();
  }, []);

  const loadOrderHistory = () => {
    try {
      const savedOrders = localStorage.getItem('tnt_order_history');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        setOrders(parsedOrders.sort((a: Order, b: Order) => 
          new Date(b.orderDate + ' ' + b.orderTime).getTime() - 
          new Date(a.orderDate + ' ' + a.orderTime).getTime()
        ));
      }
    } catch (error) {
      console.error('Error loading order history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#1e6f5c';
      case 'processing': return '#f39c12';
      case 'completed': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return '✅';
      case 'processing': return '⏳';
      case 'completed': return '🎉';
      case 'cancelled': return '❌';
      default: return '📋';
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
    setShowOrderDetails(false);
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: '#f5f5f5',
        paddingTop: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '3rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #1e6f5c',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem'
          }} />
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            Loading Order History
          </h2>
          <p style={{ color: '#666' }}>
            Please wait while we fetch your orders...
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: '#f5f5f5',
      paddingTop: '100px'
    }}>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 300,
              color: '#1a1a1a',
              marginBottom: '0.5rem',
              fontFamily: 'serif'
            }}>
              Order History
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1rem'
            }}>
              {user ? `Welcome back, ${user.name}!` : 'Your booking history'}
            </p>
          </div>
          
          <button
            onClick={() => router.push('/cart')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#1e6f5c',
              color: '#fff',
              border: 'none',
              borderRadius: '0.4rem',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1a5a4a';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e6f5c';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🛒 Back to Cart
          </button>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: '#fff',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              📋
            </div>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 600,
              color: '#333',
              marginBottom: '1rem'
            }}>
              No Orders Yet
            </h2>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              marginBottom: '2rem',
              lineHeight: '1.5'
            }}>
              You haven't made any bookings yet. Start exploring our amazing travel services!
            </p>
            <button
              onClick={() => router.push('/')}
              style={{
                padding: '1rem 2rem',
                background: '#1e6f5c',
                color: '#fff',
                border: 'none',
                borderRadius: '0.4rem',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a5a4a';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1e6f5c';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Booking
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            {orders.map((order) => (
              <div
                key={order.orderId}
                style={{
                  background: '#fff',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
                onClick={() => viewOrderDetails(order)}
              >
                <div style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: '#333',
                        marginBottom: '0.25rem'
                      }}>
                        Order #{order.orderId}
                      </h3>
                      <p style={{
                        color: '#666',
                        fontSize: '0.9rem',
                        margin: 0
                      }}>
                        {order.orderDate} at {order.orderTime}
                      </p>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: `${getStatusColor(order.status)}20`,
                      borderRadius: '1rem',
                      border: `1px solid ${getStatusColor(order.status)}40`
                    }}>
                      <span style={{ fontSize: '1rem' }}>
                        {getStatusIcon(order.status)}
                      </span>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: getStatusColor(order.status),
                        textTransform: 'capitalize'
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        fontWeight: 500
                      }}>
                        Customer
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#333',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        {order.customerName}
                      </p>
                    </div>
                    
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        fontWeight: 500
                      }}>
                        Items
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#333',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        {order.items.length} item(s)
                      </p>
                    </div>
                    
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        fontWeight: 500
                      }}>
                        Amount Paid
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#1e6f5c',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        {formatPrice(order.amountPaid)}
                      </p>
                    </div>
                    
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        fontWeight: 500
                      }}>
                        Payment Method
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#333',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#666'
                    }}>
                      Click to view details
                    </div>
                    <div style={{
                      fontSize: '1.2rem',
                      color: '#1e6f5c'
                    }}>
                      →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '0.5rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}>
              {/* Modal Header */}
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#333',
                  margin: 0
                }}>
                  Order Details - #{selectedOrder.orderId}
                </h2>
                <button
                  onClick={closeOrderDetails}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#666',
                    padding: '0.5rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f0f0f0';
                    e.currentTarget.style.color = '#333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#666';
                  }}
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Order Status */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '2rem',
                  padding: '1rem',
                  background: `${getStatusColor(selectedOrder.status)}20`,
                  borderRadius: '0.5rem',
                  border: `1px solid ${getStatusColor(selectedOrder.status)}40`
                }}>
                  <span style={{ fontSize: '1.5rem' }}>
                    {getStatusIcon(selectedOrder.status)}
                  </span>
                  <div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: getStatusColor(selectedOrder.status),
                      margin: '0 0 0.25rem 0',
                      textTransform: 'capitalize'
                    }}>
                      Order {selectedOrder.status}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      margin: 0
                    }}>
                      {selectedOrder.orderDate} at {selectedOrder.orderTime}
                    </p>
                  </div>
                </div>

                {/* Customer Details */}
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '1rem'
                  }}>
                    Customer Information
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        fontWeight: 500
                      }}>
                        Name
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#333',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        {selectedOrder.customerName}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        fontWeight: 500
                      }}>
                        Mobile
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#333',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        {selectedOrder.customerMobile}
                      </p>
                    </div>
                                         {selectedOrder.preferredDay && selectedOrder.preferredTime && (
                       <div>
                         <p style={{
                           fontSize: '0.85rem',
                           color: '#666',
                           margin: '0 0 0.25rem 0',
                           fontWeight: 500
                         }}>
                           Preferred Contact
                         </p>
                         <p style={{
                           fontSize: '0.95rem',
                           color: '#333',
                           margin: 0,
                           fontWeight: 600
                         }}>
                           {selectedOrder.preferredDay} at {selectedOrder.preferredTime}
                         </p>
                       </div>
                     )}
                  </div>
                </div>

                {/* Items */}
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '1rem'
                  }}>
                    Booked Items
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1rem',
                          background: '#fff',
                          borderRadius: '0.4rem',
                          border: '1px solid #e0e0e0'
                        }}
                      >
                        <div>
                          <h4 style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#333',
                            margin: '0 0 0.25rem 0'
                          }}>
                            {item.name}
                          </h4>
                          <p style={{
                            fontSize: '0.85rem',
                            color: '#666',
                            margin: 0,
                            textTransform: 'capitalize'
                          }}>
                            {item.type}
                          </p>
                        </div>
                        <div style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#1e6f5c'
                        }}>
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Details */}
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '1rem'
                  }}>
                    Payment Information
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        fontWeight: 500
                      }}>
                        Transaction ID
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#333',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        {selectedOrder.transactionId}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        fontWeight: 500
                      }}>
                        Payment Method
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#333',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        {selectedOrder.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        margin: '0 0 0.25rem 0',
                        fontWeight: 500
                      }}>
                        Amount Paid
                      </p>
                      <p style={{
                        fontSize: '0.95rem',
                        color: '#1e6f5c',
                        margin: 0,
                        fontWeight: 600
                      }}>
                        {formatPrice(selectedOrder.amountPaid)}
                      </p>
                    </div>
                    {selectedOrder.isAdvancePayment && (
                      <div>
                        <p style={{
                          fontSize: '0.85rem',
                          color: '#666',
                          margin: '0 0 0.25rem 0',
                          fontWeight: 500
                        }}>
                          Due at Check-in
                        </p>
                        <p style={{
                          fontSize: '0.95rem',
                          color: '#e74c3c',
                          margin: 0,
                          fontWeight: 600
                        }}>
                          {formatPrice(selectedOrder.totalAmount - selectedOrder.amountPaid)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Requests */}
                {selectedOrder.comments && (
                  <div style={{
                    background: '#f8f9fa',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#333',
                      marginBottom: '1rem'
                    }}>
                      Special Requests
                    </h3>
                    <p style={{
                      fontSize: '0.95rem',
                      color: '#666',
                      margin: 0,
                      lineHeight: '1.5'
                    }}>
                      {selectedOrder.comments}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '1.5rem',
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem'
              }}>
                <button
                  onClick={closeOrderDetails}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#fff',
                    color: '#666',
                    border: '2px solid #e0e0e0',
                    borderRadius: '0.4rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#999';
                    e.currentTarget.style.color = '#333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0';
                    e.currentTarget.style.color = '#666';
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
