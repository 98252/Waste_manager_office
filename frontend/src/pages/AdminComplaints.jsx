/**
 * Admin Complaints Management Page
 * View, update, and delete all complaints
 */

import { useState, useEffect } from "react";
import { complaintAPI } from "../services/api";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updateData, setUpdateData] = useState({ status: "", adminNotes: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

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

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setUpdateData({
      status: complaint.status,
      adminNotes: complaint.adminNotes,
    });
  };

  const handleUpdateComplaint = async () => {
    if (!selectedComplaint) return;

    try {
      setIsUpdating(true);
      const response = await complaintAPI.updateComplaint(
        selectedComplaint._id,
        updateData,
      );

      if (response.data.success) {
        setComplaints(
          complaints.map((c) =>
            c._id === selectedComplaint._id ? response.data.complaint : c,
          ),
        );
        setSelectedComplaint(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update complaint");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteComplaint = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        const response = await complaintAPI.deleteComplaint(id);
        if (response.data.success) {
          setComplaints(complaints.filter((c) => c._id !== id));
        }
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete complaint");
      }
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

  const filteredComplaints =
    filterStatus === "All"
      ? complaints
      : complaints.filter((c) => c.status === filterStatus);

  return (
    <div className='min-h-screen bg-light'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8 flex justify-between items-center'>
          <div>
            <h1 className='section-title'>Manage Complaints</h1>
            <p className='text-gray-600'>
              Review and update complaint statuses
            </p>
          </div>
          <button onClick={fetchComplaints} className='btn-secondary'>
            Refresh
          </button>
        </div>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6'>
            {error}
          </div>
        )}

        {/* Filter */}
        <div className='mb-6 flex gap-2'>
          {["All", "Pending", "In Progress", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterStatus === status
                  ? "bg-primary text-white"
                  : "bg-white text-dark border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Complaints List */}
        {loading ? (
          <div className='text-center py-8'>
            <div className='inline-block text-lg text-primary font-semibold'>
              Loading...
            </div>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className='card text-center py-12 text-gray-500'>
            <p className='text-lg'>No complaints found</p>
          </div>
        ) : (
          <div className='card'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b bg-gray-50'>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      User
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Type
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Location
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Date
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Status
                    </th>
                    <th className='px-4 py-3 text-left text-sm font-semibold text-dark'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((complaint) => (
                    <tr
                      key={complaint._id}
                      className='border-b hover:bg-gray-50'
                    >
                      <td className='px-4 py-3 text-sm font-medium'>
                        {complaint.userId?.name}
                        <br />
                        <span className='text-xs text-gray-500'>
                          {complaint.userId?.email}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {complaint.wasteType}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {complaint.location}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            complaint.status,
                          )}`}
                        >
                          {complaint.status}
                        </span>
                      </td>
                      <td className='px-4 py-3 text-sm'>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => handleSelectComplaint(complaint)}
                            className='text-blue-600 hover:text-blue-800 font-semibold'
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComplaint(complaint._id)}
                            className='text-red-600 hover:text-red-800 font-semibold'
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {selectedComplaint && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full p-6'>
            <h2 className='text-xl font-bold text-dark mb-4'>
              Update Complaint
            </h2>

            {/* Complaint Details */}
            <div className='mb-4 p-4 bg-gray-50 rounded-lg'>
              <p className='text-sm text-gray-600 mb-2'>
                <strong>Type:</strong> {selectedComplaint.wasteType}
              </p>
              <p className='text-sm text-gray-600 mb-2'>
                <strong>Location:</strong> {selectedComplaint.location}
              </p>
              <p className='text-sm text-gray-600'>
                <strong>Description:</strong>{" "}
                {selectedComplaint.description.substring(0, 100)}...
              </p>
            </div>

            {/* Image Preview */}
            {selectedComplaint.image && (
              <div className='mb-4'>
                <p className='text-sm font-semibold text-dark mb-2'>Image</p>
                <img
                  src={`http://localhost:5000${selectedComplaint.image}`}
                  alt='Complaint'
                  className='w-full h-40 object-cover rounded-lg'
                />
              </div>
            )}

            {/* Update Form */}
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Status
                </label>
                <select
                  value={updateData.status}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, status: e.target.value })
                  }
                  className='input-field'
                >
                  <option value='Pending'>Pending</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Completed'>Completed</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Admin Notes
                </label>
                <textarea
                  value={updateData.adminNotes}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, adminNotes: e.target.value })
                  }
                  placeholder='Add notes about this complaint...'
                  rows='3'
                  className='input-field'
                />
              </div>
            </div>

            {/* Buttons */}
            <div className='flex gap-3 mt-6'>
              <button
                onClick={handleUpdateComplaint}
                disabled={isUpdating}
                className='btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
              <button
                onClick={() => setSelectedComplaint(null)}
                className='px-6 py-2 bg-gray-300 text-dark rounded-lg hover:bg-gray-400 transition font-medium'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
