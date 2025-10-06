"use client";
import { useState, useEffect } from 'react';

interface VisitData {
  sessionId?: string;
  userId?: string;
  page: string;
  deviceType?: string;
  browser?: string;
}

interface AnalyticsData {
  totalVisits: number;
  uniqueSessions: number;
  loggedInUsers: number;
  topPages: { page: string; count: number }[];
  deviceStats: { deviceType: string; count: number }[];
  browserStats: { browser: string; count: number }[];
}

export default function AnalyticsWidget() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/log-visit?limit=1000');
        const data = await response.json();
        
        if (data.success) {
          const visits: VisitData[] = data.data;
          
          // Calculate analytics
          const totalVisits = visits.length;
          const uniqueSessions = new Set(visits.map((v: VisitData) => v.sessionId)).size;
          const loggedInUsers = visits.filter((v: VisitData) => v.userId).length;
          
          // Top pages
          const pageCounts: { [key: string]: number } = {};
          visits.forEach(visit => {
            pageCounts[visit.page] = (pageCounts[visit.page] || 0) + 1;
          });
          const topPages = Object.entries(pageCounts)
            .map(([page, count]) => ({ page, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
          
          // Device stats
          const deviceCounts: { [key: string]: number } = {};
          visits.forEach(visit => {
            const deviceType = visit.deviceType || 'Unknown';
            deviceCounts[deviceType] = (deviceCounts[deviceType] || 0) + 1;
          });
          const deviceStats = Object.entries(deviceCounts)
            .map(([deviceType, count]) => ({ deviceType, count }))
            .sort((a, b) => b.count - a.count);
          
          // Browser stats
          const browserCounts: { [key: string]: number } = {};
          visits.forEach(visit => {
            const browser = visit.browser || 'Unknown';
            browserCounts[browser] = (browserCounts[browser] || 0) + 1;
          });
          const browserStats = Object.entries(browserCounts)
            .map(([browser, count]) => ({ browser, count }))
            .sort((a, b) => b.count - a.count);
          
          setAnalytics({
            totalVisits,
            uniqueSessions,
            loggedInUsers,
            topPages,
            deviceStats,
            browserStats
          });
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div style={{
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        Loading analytics...
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div style={{
      background: '#fff',
      padding: '1.5rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      margin: '1rem 0'
    }}>
      <h3 style={{ 
        color: '#7A6B57', 
        marginBottom: '1.5rem',
        fontSize: '1.3rem',
        fontWeight: 'bold'
      }}>
        📊 Quick Analytics
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f29927' }}>
            {analytics.totalVisits}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Visits</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#7A6B57' }}>
            {analytics.uniqueSessions}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Sessions</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#E2B89B' }}>
            {analytics.loggedInUsers}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Logged In</div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem' 
      }}>
        {/* Top Pages */}
        <div>
          <h4 style={{ color: '#7A6B57', marginBottom: '0.5rem', fontSize: '1rem' }}>
            Top Pages
          </h4>
          {analytics.topPages.map(({ page, count }) => (
            <div key={page} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '0.3rem',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: '#666' }}>{page}</span>
              <span style={{ fontWeight: 'bold', color: '#f29927' }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Device Stats */}
        <div>
          <h4 style={{ color: '#7A6B57', marginBottom: '0.5rem', fontSize: '1rem' }}>
            Devices
          </h4>
          {analytics.deviceStats.map(({ deviceType, count }) => (
            <div key={deviceType} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '0.3rem',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: '#666' }}>{deviceType}</span>
              <span style={{ fontWeight: 'bold', color: '#7A6B57' }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Browser Stats */}
        <div>
          <h4 style={{ color: '#7A6B57', marginBottom: '0.5rem', fontSize: '1rem' }}>
            Browsers
          </h4>
          {analytics.browserStats.map(({ browser, count }) => (
            <div key={browser} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '0.3rem',
              fontSize: '0.9rem'
            }}>
              <span style={{ color: '#666' }}>{browser}</span>
              <span style={{ fontWeight: 'bold', color: '#E2B89B' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        textAlign: 'center' 
      }}>
        <a 
          href="/admin/visits" 
          style={{
            background: '#f29927',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}
        >
          View Full Analytics →
        </a>
      </div>
    </div>
  );
}
