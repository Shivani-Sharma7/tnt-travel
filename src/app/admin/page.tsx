"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtection from '@/components/AdminProtection';

interface AdminStats {
  totalVisits: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats>({
    totalVisits: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch admin stats
    const fetchStats = async () => {
      try {
        // In production, this would fetch real data from your APIs
        setStats({
          totalVisits: 1250,
          totalOrders: 89,
          totalRevenue: 245000,
          activeUsers: 156
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const adminModules = [
    {
      title: 'Visit Logs',
      description: 'Monitor website visits and user activity',
      icon: '📊',
      gradient: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
      href: '/admin/visits',
      stats: stats.totalVisits
    },
    {
      title: 'Orders Management',
      description: 'View and manage all customer orders',
      icon: '📦',
      gradient: 'linear-gradient(90deg, #10b981, #059669)',
      href: '/admin/orders',
      stats: stats.totalOrders
    },
    {
      title: 'Analytics',
      description: 'Website performance and user analytics',
      icon: '📈',
      gradient: 'linear-gradient(90deg, #8b5cf6, #7c3aed)',
      href: '/admin/analytics',
      stats: 'Coming Soon'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: '👥',
      gradient: 'linear-gradient(90deg, #f59e0b, #d97706)',
      href: '/admin/users',
      stats: stats.activeUsers
    }
  ];

  return (
    <AdminProtection>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#fff'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              🛡️ Admin Dashboard
            </h1>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.9,
              margin: '0'
            }}>
              Manage your travel booking platform
            </p>
          </div>

          {/* Stats Overview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {loading ? '...' : stats.activeUsers}
              </div>
              <div style={{ opacity: 0.9 }}>Active Users</div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {loading ? '...' : stats.totalVisits}
              </div>
              <div style={{ opacity: 0.9 }}>Total Visits</div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {loading ? '...' : stats.totalOrders}
              </div>
              <div style={{ opacity: 0.9 }}>Total Orders</div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {loading ? '...' : formatCurrency(stats.totalRevenue)}
              </div>
              <div style={{ opacity: 0.9 }}>Total Revenue</div>
            </div>
          </div>

          {/* Admin Modules */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {adminModules.map((module, index) => (
              <div
                key={index}
                onClick={() => router.push(module.href)}
                style={{
                  background: '#fff',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e2e8f0',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
              >
                {/* Background gradient */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: module.gradient
                }} />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    marginRight: '1rem'
                  }}>
                    {module.icon}
                  </div>
                  <div>
                    <h3 style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#1e40af'
                    }}>
                      {module.title}
                    </h3>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      color: '#059669'
                    }}>
                      {typeof module.stats === 'number' ? module.stats.toLocaleString() : module.stats}
                    </div>
                  </div>
                </div>

                <p style={{
                  margin: '0 0 1.5rem 0',
                  color: '#6b7280',
                  lineHeight: '1.5'
                }}>
                  {module.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#3b82f6',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  <span>Access Module</span>
                  <span style={{ marginLeft: '0.5rem', fontSize: '1rem' }}>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{
            marginTop: '3rem',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '2rem',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{
              margin: '0 0 1rem 0',
              fontSize: '1.5rem',
              fontWeight: '600'
            }}>
              Quick Actions
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <button
                onClick={() => router.push('/admin/orders')}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              >
                📦 View Recent Orders
              </button>
              <button
                onClick={() => router.push('/admin/visits')}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              >
                📊 View Visit Logs
              </button>
              <button
                onClick={() => window.open('/admin/orders', '_blank')}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
              >
                📊 Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminProtection>
  );
}
