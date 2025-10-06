"use client";
import { useState, useEffect, useRef } from 'react';
import AdminProtection from '@/components/AdminProtection';

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
  customerEmail: string;
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
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

interface OrdersResponse {
  success: boolean;
  data: Order[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchOrders = async (page = 1, status = 'all', type = 'all', search = '', dateRange = 'all') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(status !== 'all' && { status }),
        ...(type !== 'all' && { type }),
        ...(search && { search }),
        ...(dateRange !== 'all' && { dateRange }),
      });

      const response = await fetch(`/api/admin/orders?${params}`);
      const data: OrdersResponse = await response.json();

      if (data.success) {
        setOrders(data.data);
        setTotalPages(data.pagination.pages);
        setTotalOrders(data.pagination.total);
        setLastUpdated(new Date());
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('Error fetching orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage, filterStatus, filterType, searchTerm, dateFilter);
  }, [currentPage, filterStatus, filterType, searchTerm, dateFilter]);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchOrders(currentPage, filterStatus, filterType, searchTerm, dateFilter);
      }, 30000); // Refresh every 30 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRefresh, currentPage, filterStatus, filterType, searchTerm, dateFilter]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/orders/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        // Refresh the orders list
        fetchOrders(currentPage, filterStatus, filterType, searchTerm, dateFilter);
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'processing': return '#f59e0b';
      case 'completed': return '#059669';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel': return '🏨';
      case 'taxi': return '🚗';
      case 'trip': return '✈️';
      default: return '📦';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const exportOrders = () => {
    const csvContent = [
      ['Order ID', 'Customer Name', 'Mobile', 'Email', 'Type', 'Status', 'Total Amount', 'Order Date', 'Payment Method'],
      ...orders.map(order => [
        order.orderId,
        order.customerName,
        order.customerMobile,
        order.customerEmail,
        order.items.map(item => item.type).join(', '),
        order.status,
        order.totalAmount.toString(),
        formatDate(order.orderDate),
        order.paymentMethod
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminProtection>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
            color: '#fff',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: '0 0 0.5rem 0',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              📊 Orders Management
            </h1>
            <p style={{
              fontSize: '1.1rem',
              opacity: 0.9,
              margin: '0 0 1rem 0'
            }}>
              Monitor and manage all customer orders placed by users
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              color: '#10b981'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981'
              }}></div>
              <span>Showing orders from real users</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '2rem',
            background: '#f8fafc'
          }}>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e40af' }}>{totalOrders}</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Total Orders</div>
            </div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#059669' }}>
                {orders.filter(o => o.status === 'completed').length}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Completed</div>
            </div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b' }}>
                {orders.filter(o => o.status === 'processing').length}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Processing</div>
            </div>
            <div style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#7c3aed' }}>
                {formatCurrency(orders.reduce((sum, order) => sum + order.totalAmount, 0))}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Total Revenue</div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div style={{
            padding: '1.5rem 2rem',
            background: '#f1f5f9',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="all">All Types</option>
                <option value="hotel">Hotels</option>
                <option value="taxi">Taxis</option>
                <option value="trip">Trips</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  background: '#fff',
                  fontSize: '0.9rem',
                  minWidth: '200px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: autoRefresh ? '#10b981' : '#6b7280',
                  color: '#fff',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                {autoRefresh ? '🔄 Auto Refresh ON' : '⏸️ Auto Refresh OFF'}
              </button>

              <button
                onClick={exportOrders}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: '#3b82f6',
                  color: '#fff',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                📊 Export CSV
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div style={{ padding: '0' }}>
            {loading ? (
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                Loading orders...
              </div>
            ) : error ? (
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                color: '#ef4444'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
                {error}
              </div>
            ) : orders.length === 0 ? (
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  No orders found
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  {searchTerm || filterStatus !== 'all' || filterType !== 'all' || dateFilter !== 'all' 
                    ? 'Try adjusting your search filters' 
                    : 'No users have placed orders yet'
                  }
                </div>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem'
                }}>
                  <thead>
                    <tr style={{
                      background: '#f8fafc',
                      borderBottom: '2px solid #e2e8f0'
                    }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Order ID</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Customer</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Type</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>Amount</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Date</th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.orderId} style={{
                        borderBottom: '1px solid #e2e8f0',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      >
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: '600', color: '#1e40af' }}>
                            {order.orderId}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                            {order.transactionId}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: '600' }}>{order.customerName}</div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                            {order.customerMobile}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                            {order.customerEmail}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {order.items.map((item, index) => (
                              <span key={index} style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '0.25rem 0.5rem',
                                background: '#f1f5f9',
                                borderRadius: '0.375rem',
                                fontSize: '0.8rem',
                                fontWeight: '500'
                              }}>
                                {getTypeIcon(item.type)} {item.type}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            background: `${getStatusColor(order.status)}20`,
                            color: getStatusColor(order.status),
                            textTransform: 'capitalize'
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#059669' }}>
                            {formatCurrency(order.totalAmount)}
                          </div>
                          {order.isAdvancePayment && (
                            <div style={{ fontSize: '0.8rem', color: '#f59e0b' }}>
                              Advance Payment
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ fontWeight: '500' }}>
                            {formatDate(order.orderDate)}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                            {order.orderTime}
                          </div>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderModal(true);
                              }}
                              style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #d1d5db',
                                background: '#fff',
                                color: '#374151',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                              }}
                            >
                              👁️ View
                            </button>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.orderId, e.target.value)}
                              style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #d1d5db',
                                background: '#fff',
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              padding: '1.5rem 2rem',
              background: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, totalOrders)} of {totalOrders} orders
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1d5db',
                    background: currentPage === 1 ? '#f3f4f6' : '#fff',
                    color: currentPage === 1 ? '#9ca3af' : '#374151',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Previous
                </button>
                <span style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: '#fff',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1d5db',
                    background: currentPage === totalPages ? '#f3f4f6' : '#fff',
                    color: currentPage === totalPages ? '#9ca3af' : '#374151',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Last Updated */}
          <div style={{
            padding: '1rem 2rem',
            background: '#f1f5f9',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '0.8rem'
          }}>
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        </div>

        {/* Order Details Modal */}
        {showOrderModal && selectedOrder && (
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
          }}
          onClick={() => setShowOrderModal(false)}
          >
            <div style={{
              background: '#fff',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #e2e8f0'
              }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
                  Order Details - {selectedOrder.orderId}
                </h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {/* Customer Info */}
                <div>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Customer Information</h3>
                  <div style={{
                    background: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>Name</div>
                      <div style={{ fontWeight: '600' }}>{selectedOrder.customerName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>Mobile</div>
                      <div style={{ fontWeight: '600' }}>{selectedOrder.customerMobile}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>Email</div>
                      <div style={{ fontWeight: '600' }}>{selectedOrder.customerEmail}</div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Order Items</h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} style={{
                        background: '#f8fafc',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '0.5rem'
                        }}>
                          <div>
                            <div style={{ fontWeight: '600', fontSize: '1rem' }}>
                              {getTypeIcon(item.type)} {item.name}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#6b7280', textTransform: 'capitalize' }}>
                              {item.type}
                            </div>
                          </div>
                          <div style={{ fontWeight: '600', color: '#059669' }}>
                            {formatCurrency(item.price)}
                          </div>
                        </div>
                        {Object.keys(item.details).length > 0 && (
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                            gap: '0.5rem',
                            fontSize: '0.8rem'
                          }}>
                            {Object.entries(item.details).map(([key, value]) => (
                              <div key={key}>
                                <span style={{ color: '#6b7280' }}>{key}:</span> {value}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Order Summary</h3>
                  <div style={{
                    background: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>Total Amount</div>
                      <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#059669' }}>
                        {formatCurrency(selectedOrder.totalAmount)}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>Amount Paid</div>
                      <div style={{ fontWeight: '600' }}>
                        {formatCurrency(selectedOrder.amountPaid)}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>Payment Method</div>
                      <div style={{ fontWeight: '600' }}>{selectedOrder.paymentMethod}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.25rem' }}>Status</div>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        background: `${getStatusColor(selectedOrder.status)}20`,
                        color: getStatusColor(selectedOrder.status),
                        textTransform: 'capitalize'
                      }}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedOrder.comments && (
                  <div>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Comments</h3>
                    <div style={{
                      background: '#f8fafc',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      fontStyle: 'italic'
                    }}>
                      {selectedOrder.comments}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminProtection>
  );
}
