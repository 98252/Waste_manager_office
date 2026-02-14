/**
 * Admin Dashboard
 * Displays statistics and overview of complaints
 */

import { useState, useEffect } from "react";
import { complaintAPI } from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    wasteTypeStats: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getStats();
      setStats(response.data.stats);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, color, icon }) => (
    <div className={`card bg-gradient-to-br from-${color}-50 to-${color}-100`}>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-gray-600 text-sm font-medium'>{title}</p>
          <p className={`text-4xl font-bold text-${color}-600 mt-2`}>{value}</p>
        </div>
        <div className={`text-5xl opacity-20`}>{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className='min-h-screen bg-light flex items-center justify-center'>
        <div className='text-2xl font-bold text-primary'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-light'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='section-title'>Admin Dashboard</h1>
          <p className='text-gray-600'>
            System overview and complaint statistics
          </p>
        </div>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6'>
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            title='Total Complaints'
            value={stats.total}
            color='blue'
            icon='📊'
          />
          <StatCard
            title='Pending'
            value={stats.pending}
            color='yellow'
            icon='⏳'
          />
          <StatCard
            title='In Progress'
            value={stats.inProgress}
            color='purple'
            icon='🔄'
          />
          <StatCard
            title='Completed'
            value={stats.completed}
            color='green'
            icon='✅'
          />
        </div>

        {/* Waste Type Statistics */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='card'>
            <h2 className='subsection-title'>Complaints by Waste Type</h2>
            {stats.wasteTypeStats && stats.wasteTypeStats.length > 0 ? (
              <div className='space-y-3'>
                {stats.wasteTypeStats.map((item) => (
                  <div
                    key={item._id}
                    className='flex items-center justify-between'
                  >
                    <span className='font-medium text-dark'>{item._id}</span>
                    <div className='flex items-center gap-3'>
                      <div className='w-32 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-primary h-2 rounded-full'
                          style={{
                            width: `${(item.count / stats.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className='font-bold text-primary w-8 text-right'>
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No complaints data available</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className='card'>
            <h2 className='subsection-title'>Quick Stats</h2>
            <div className='space-y-4'>
              <div className='flex justify-between items-center pb-3 border-b'>
                <span className='text-gray-600'>Completion Rate</span>
                <span className='font-bold text-lg text-primary'>
                  {stats.total > 0
                    ? Math.round((stats.completed / stats.total) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className='flex justify-between items-center pb-3 border-b'>
                <span className='text-gray-600'>Pending Complaints</span>
                <span className='font-bold text-lg text-yellow-600'>
                  {stats.pending}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600'>In Progress</span>
                <span className='font-bold text-lg text-purple-600'>
                  {stats.inProgress}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-8 flex gap-4'>
          <a href='/admin/complaints' className='btn-primary'>
            View All Complaints
          </a>
          <button
            onClick={fetchStats}
            className='px-6 py-2 bg-secondary text-white rounded-lg hover:bg-blue-600 transition font-medium'
          >
            Refresh Stats
          </button>
        </div>
      </div>
    </div>
  );
}
