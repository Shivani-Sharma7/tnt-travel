"use client";
import { useState, useEffect, useRef } from 'react';
import AdminProtection from '@/components/AdminProtection';

interface VisitLog {
  _id: string;
  ipAddress: string;
  userAgent: string;
  page: string;
  referer: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  deviceType?: string;
  browser?: string;
  os?: string;
}

interface VisitLogsResponse {
  success: boolean;
  data: VisitLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function VisitLogsPage() {
  const [visits, setVisits] = useState<VisitLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVisits, setTotalVisits] = useState(0);
  const [filterUserId, setFilterUserId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchVisits = async (page = 1, userId = '', search = '', dateRange = 'all') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '50', // Increased limit for better data
        ...(userId && { userId }),
        ...(search && { search }),
        ...(dateRange !== 'all' && { dateRange })
      });
      
      const response = await fetch(`/api/log-visit?${params}`);
      const data: VisitLogsResponse = await response.json();
      
      if (data.success) {
        setVisits(data.data);
        setTotalPages(data.pagination.pages);
        setTotalVisits(data.pagination.total);
        setLastUpdated(new Date());
      } else {
        setError('Failed to fetch visit logs');
      }
    } catch (err) {
      setError('Error fetching visit logs');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits(currentPage, filterUserId, searchTerm, dateFilter);
  }, [currentPage, filterUserId, searchTerm, dateFilter]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchVisits(currentPage, filterUserId, searchTerm, dateFilter);
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
  }, [autoRefresh, currentPage, filterUserId, searchTerm, dateFilter]);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getDeviceIcon = (deviceType: string | undefined) => {
    if (!deviceType) return '🖥️';
    switch (deviceType.toLowerCase()) {
      case 'mobile': return '📱';
      case 'tablet': return '📱';
      case 'desktop': return '💻';
      default: return '🖥️';
    }
  };

  const getBrowserIcon = (browser: string | undefined) => {
    if (!browser) return '🌐';
    switch (browser.toLowerCase()) {
      case 'chrome': return '🌐';
      case 'firefox': return '🦊';
      case 'safari': return '🧭';
      case 'edge': return '🔷';
      case 'opera': return '🎭';
      default: return '🌐';
    }
  };

  // Export to CSV functionality
  const exportToCSV = () => {
    const headers = ['Timestamp', 'IP Address', 'Page', 'Device Type', 'Browser', 'OS', 'User ID', 'Session ID', 'Referer'];
    const csvContent = [
      headers.join(','),
      ...visits.map(visit => [
        visit.timestamp,
        visit.ipAddress,
        visit.page,
        visit.deviceType || 'Unknown',
        visit.browser || 'Unknown',
        visit.os || 'Unknown',
        visit.userId || 'Guest',
        visit.sessionId,
        visit.referer
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visit-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Get analytics data
  const getAnalyticsData = () => {
    const pageStats: { [key: string]: number } = {};
    const deviceStats: { [key: string]: number } = {};
    const browserStats: { [key: string]: number } = {};
    const hourlyStats: { [key: number]: number } = {};
    const todayVisits = visits.filter(v => {
      const visitDate = new Date(v.timestamp);
      const today = new Date();
      return visitDate.toDateString() === today.toDateString();
    });

    visits.forEach(visit => {
      // Page stats
      pageStats[visit.page] = (pageStats[visit.page] || 0) + 1;
      
      // Device stats
      const device = visit.deviceType || 'Unknown';
      deviceStats[device] = (deviceStats[device] || 0) + 1;
      
      // Browser stats
      const browser = visit.browser || 'Unknown';
      browserStats[browser] = (browserStats[browser] || 0) + 1;
      
      // Hourly stats
      const hour = new Date(visit.timestamp).getHours();
      hourlyStats[hour] = (hourlyStats[hour] || 0) + 1;
    });

    return {
      pageStats: Object.entries(pageStats).sort((a, b) => b[1] - a[1]).slice(0, 5),
      deviceStats: Object.entries(deviceStats).sort((a, b) => b[1] - a[1]),
      browserStats: Object.entries(browserStats).sort((a, b) => b[1] - a[1]),
      hourlyStats: Object.entries(hourlyStats).sort((a, b) => parseInt(a[0]) - parseInt(b[0])),
      todayVisits: todayVisits.length,
      uniqueSessions: new Set(visits.map(v => v.sessionId)).size,
      loggedInUsers: visits.filter(v => v.userId).length
    };
  };

  const analytics = getAnalyticsData();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Loading visit logs...
      </div>
    );
  }

  return (
    <AdminProtection>
      <div style={{ 
        minHeight: '100vh', 
        background: '#fdf6f3', 
        padding: '2rem',
        paddingTop: '120px'
      }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#7A6B57',
            fontFamily: 'serif',
            margin: 0
          }}>
            📊 Visit Analytics Dashboard
          </h1>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Auto-refresh toggle */}
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem',
              color: '#4a5568'
            }}>
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                style={{ transform: 'scale(1.2)' }}
              />
              🔄 Auto-refresh (30s)
            </label>
            
            {/* Export button */}
            <button
              onClick={exportToCSV}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              📥 Export CSV
            </button>
            
            {/* Last updated */}
            <div style={{ 
              fontSize: '0.8rem', 
              color: '#666',
              background: '#f8f9fa',
              padding: '0.3rem 0.8rem',
              borderRadius: '1rem',
              border: '1px solid #e9ecef'
            }}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              {totalVisits}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Visits</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: '#fff',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 8px 25px rgba(240, 147, 251, 0.15)',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              {analytics.todayVisits}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Today's Visits</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: '#fff',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 8px 25px rgba(79, 172, 254, 0.15)',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              {analytics.uniqueSessions}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Unique Sessions</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: '#fff',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 8px 25px rgba(67, 233, 123, 0.15)',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              {analytics.loggedInUsers}
            </div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Logged In Users</div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
          padding: '1.5rem', 
          borderRadius: '1rem', 
          marginBottom: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#4a5568', fontSize: '1.2rem', fontWeight: 'bold' }}>
            🔍 Advanced Filters
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {/* Search */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>
                Search (IP, Page, User)
              </label>
              <input
                type="text"
                placeholder="Search visits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '2px solid #667eea',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  background: '#fff',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#764ba2';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            {/* User Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>
                Filter by User Email
              </label>
              <input
                type="text"
                placeholder="Enter user email..."
                value={filterUserId}
                onChange={(e) => setFilterUserId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '2px solid #667eea',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  background: '#fff',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#764ba2';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            {/* Date Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>
                Time Period
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '2px solid #667eea',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  background: '#fff',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#764ba2';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setFilterUserId('');
                setSearchTerm('');
                setDateFilter('all');
                setCurrentPage(1);
              }}
              style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(108, 117, 125, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(108, 117, 125, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(108, 117, 125, 0.3)';
              }}
            >
              🗑️ Clear All Filters
            </button>
            
            <button
              onClick={() => fetchVisits(currentPage, filterUserId, searchTerm, dateFilter)}
              style={{
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>

        {/* Analytics Charts */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          {/* Top Pages Chart */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <h4 style={{ color: '#4a5568', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
              📄 Top Pages
            </h4>
            {analytics.pageStats.map(([page, count], index) => (
              <div key={page} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '0.5rem',
                padding: '0.5rem',
                background: index < 3 ? '#f8f9fa' : 'transparent',
                borderRadius: '0.3rem'
              }}>
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {page}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: `${(count / analytics.pageStats[0][1]) * 100}px`,
                    height: '8px',
                    background: index < 3 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    borderRadius: '4px'
                  }}></div>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: '#4a5568',
                    fontSize: '0.9rem',
                    minWidth: '30px',
                    textAlign: 'right'
                  }}>
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Device Distribution */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <h4 style={{ color: '#4a5568', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
              📱 Device Distribution
            </h4>
            {analytics.deviceStats.map(([device, count]) => (
              <div key={device} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '0.8rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {getDeviceIcon(device)}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    {device}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '60px',
                    height: '8px',
                    background: '#f0f0f0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(count / analytics.deviceStats[0][1]) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: '#4a5568',
                    fontSize: '0.9rem',
                    minWidth: '30px',
                    textAlign: 'right'
                  }}>
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Browser Distribution */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            padding: '1.5rem',
            borderRadius: '1rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <h4 style={{ color: '#4a5568', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🌐 Browser Distribution
            </h4>
            {analytics.browserStats.map(([browser, count]) => (
              <div key={browser} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '0.8rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {getBrowserIcon(browser)}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    {browser}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '60px',
                    height: '8px',
                    background: '#f0f0f0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${(count / analytics.browserStats[0][1]) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: '#4a5568',
                    fontSize: '0.9rem',
                    minWidth: '30px',
                    textAlign: 'right'
                  }}>
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visit Logs Table */}
        <div style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
          borderRadius: '1rem', 
          overflow: 'hidden',
          boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: '#fff', 
            padding: '1rem', 
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            📊 Recent Visits
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', color: '#4a5568' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #667eea', fontWeight: 'bold' }}>⏰ Time</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #667eea', fontWeight: 'bold' }}>🌐 IP Address</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #667eea', fontWeight: 'bold' }}>📄 Page</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #667eea', fontWeight: 'bold' }}>📱 Device</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #667eea', fontWeight: 'bold' }}>🌐 Browser</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #667eea', fontWeight: 'bold' }}>👤 User</th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid #667eea', fontWeight: 'bold' }}>🔗 Referer</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit, index) => (
                  <tr 
                    key={visit._id} 
                    style={{ 
                      borderBottom: '1px solid #e2e8f0',
                      background: index % 2 === 0 ? '#fff' : '#f8fafc',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = index % 2 === 0 ? '#fff' : '#f8fafc';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                      {formatDate(visit.timestamp)}
                    </td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', color: '#667eea' }}>
                      {visit.ipAddress}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(102, 126, 234, 0.3)'
                      }}>
                        {visit.page}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ fontSize: '1.2rem' }}>
                        {getDeviceIcon(visit.deviceType)}
                      </span>
                      <div style={{ fontSize: '0.8rem', color: '#4a5568', fontWeight: '500' }}>
                        {visit.deviceType || 'Unknown'}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ fontSize: '1.2rem' }}>
                        {getBrowserIcon(visit.browser)}
                      </span>
                      <div style={{ fontSize: '0.8rem', color: '#4a5568', fontWeight: '500' }}>
                        {visit.browser || 'Unknown'}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {visit.userId ? (
                        <span style={{
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          color: '#fff',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(240, 147, 251, 0.3)'
                        }}>
                          {visit.userId}
                        </span>
                      ) : (
                        <span style={{ 
                          color: '#6c757d', 
                          background: '#f8f9fa',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>Guest</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.8rem', color: '#4a5568', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}>
                      {visit.referer === 'Direct' ? 'Direct' : visit.referer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '1rem',
            marginTop: '2rem'
          }}>
             <button
               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
               disabled={currentPage === 1}
               style={{
                 padding: '0.6rem 1.2rem',
                 background: currentPage === 1 ? '#e2e8f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 color: currentPage === 1 ? '#a0aec0' : '#fff',
                 border: 'none',
                 borderRadius: '0.6rem',
                 cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                 fontWeight: 'bold',
                 fontSize: '0.9rem',
                 transition: 'all 0.3s',
                 boxShadow: currentPage === 1 ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)'
               }}
               onMouseEnter={(e) => {
                 if (currentPage !== 1) {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                 }
               }}
               onMouseLeave={(e) => {
                 if (currentPage !== 1) {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                 }
               }}
             >
               ← Previous
             </button>
             
             <span style={{ 
               color: '#4a5568', 
               fontWeight: 'bold',
               fontSize: '1rem',
               background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
               padding: '0.6rem 1.2rem',
               borderRadius: '0.6rem',
               border: '2px solid #667eea'
             }}>
               Page {currentPage} of {totalPages}
             </span>
             
             <button
               onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
               disabled={currentPage === totalPages}
               style={{
                 padding: '0.6rem 1.2rem',
                 background: currentPage === totalPages ? '#e2e8f0' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                 color: currentPage === totalPages ? '#a0aec0' : '#fff',
                 border: 'none',
                 borderRadius: '0.6rem',
                 cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                 fontWeight: 'bold',
                 fontSize: '0.9rem',
                 transition: 'all 0.3s',
                 boxShadow: currentPage === totalPages ? 'none' : '0 4px 12px rgba(240, 147, 251, 0.3)'
               }}
               onMouseEnter={(e) => {
                 if (currentPage !== totalPages) {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.boxShadow = '0 6px 16px rgba(240, 147, 251, 0.4)';
                 }
               }}
               onMouseLeave={(e) => {
                 if (currentPage !== totalPages) {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = '0 4px 12px rgba(240, 147, 251, 0.3)';
                 }
               }}
             >
               Next →
             </button>
          </div>
        )}

        {error && (
          <div style={{
            background: '#ffebee',
            color: '#c62828',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
         )}
       </div>
       </div>
     </AdminProtection>
   );
 }
