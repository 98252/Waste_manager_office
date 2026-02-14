/**
 * User Dashboard
 * Shows user's submitted complaints and their status
 */

import { useState, useEffect } from "react";
import { complaintAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export default function UserDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintAPI.getComplaints();
      setComplaints(response.data.complaints);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    completed: complaints.filter((c) => c.status === "Completed").length,
  };

  return (
    <div className='min-h-screen bg-light'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='section-title'>My Complaints Dashboard</h1>
          <p className='text-gray-600'>
            Track your waste management complaints
          </p>
        </div>

        {/* Statistics Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <div className='card bg-gradient-to-br from-blue-50 to-blue-100'>
            <div className='text-3xl font-bold text-blue-600'>
              {stats.total}
            </div>
            <div className='text-gray-600'>Total Complaints</div>
          </div>
          <div className='card bg-gradient-to-br from-yellow-50 to-yellow-100'>
            <div className='text-3xl font-bold text-yellow-600'>
              {stats.pending}
            </div>
            <div className='text-gray-600'>Pending</div>
          </div>
          <div className='card bg-gradient-to-br from-purple-50 to-purple-100'>
            <div className='text-3xl font-bold text-purple-600'>
              {stats.inProgress}
            </div>
            <div className='text-gray-600'>In Progress</div>
          </div>
          <div className='card bg-gradient-to-br from-green-50 to-green-100'>
            <div className='text-3xl font-bold text-green-600'>
              {stats.completed}
            </div>
            <div className='text-gray-600'>Completed</div>
          </div>
        </div>

        {/* Complaints List */}
        <div className='card'>
          <h2 className='subsection-title'>Your Complaints</h2>

          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4'>
              {error}
            </div>
          )}

          {loading ? (
            <div className='text-center py-8'>
              <div className='inline-block text-lg text-primary font-semibold'>
                Loading...
              </div>
            </div>
          ) : complaints.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              <p className='mb-4'>No complaints submitted yet.</p>
              <a href='/user/submit' className='btn-primary'>
                Submit Your First Complaint
              </a>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b bg-gray-50'>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Date
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Type
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Location
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Status
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr
                      key={complaint._id}
                      className='border-b hover:bg-gray-50'
                    >
                      <td className='px-4 py-3 text-sm'>
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {complaint.wasteType}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {complaint.location}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}
                        >
                          {complaint.status}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-600'>
                        {complaint.adminNotes || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
