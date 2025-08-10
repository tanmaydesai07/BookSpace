import React, { useState, useEffect } from 'react';

// Import components from their organized barrel files
import { RecentBookings, PageHeader } from '../components/shared';
import { AdminStatsGrid, AdminQuickActions } from '../components/admin';
import AvailablePlacesGrid from '../components/shared/AvailablePlacesGrid';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalPlaces: { value: 0, change: '' },
    activeBookings: { value: 0, change: '' },
    pendingApprovals: { value: 0, change: '' },
    todayBookings: { value: 0, change: '' },
    monthlyGrowth: { value: '0%', change: '' },
    utilizationRate: { value: '0%', change: '' },
    issuesReported: { value: 0, change: '' },
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, bookingsRes, placesRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/bookings/recent'),
          fetch('/api/places'),
        ]);

        const statsData = await statsRes.json();
        const bookingsData = await bookingsRes.json();
        const placesData = await placesRes.json();

        setStats(statsData);
        setRecentBookings(bookingsData);
        setAvailablePlaces(placesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);


  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        <PageHeader title="Admin Dashboard" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <AvailablePlacesGrid places={availablePlaces} role={role} />
          <AdminStatsGrid stats={stats} />
        </main>
      </div>
    </>
  );
}