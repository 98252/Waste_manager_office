/**
 * Submit Complaint Page
 * Form for users to submit waste complaints
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { complaintAPI } from "../services/api";

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    wasteType: "Plastic",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    image: null,
  });

  const wasteTypes = [
    "Plastic",
    "Organic",
    "Paper",
    "Metal",
    "Glass",
    "Electronic",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("wasteType", formData.wasteType);
      data.append("description", formData.description);
      data.append("location", formData.location);
      if (formData.latitude) data.append("latitude", formData.latitude);
      if (formData.longitude) data.append("longitude", formData.longitude);
      if (formData.image) data.append("image", formData.image);

      const response = await complaintAPI.createComplaint(data);

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/user/dashboard");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-light py-8'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='card'>
          <h1 className='section-title'>Submit Waste Complaint</h1>
          <p className='text-gray-600 mb-6'>
            Help us manage waste better by reporting it to our system.
          </p>

          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6'>
              {error}
            </div>
          )}

          {success && (
            <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6'>
              ✓ Complaint submitted successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Waste Type */}
            <div>
              <label className='block text-sm font-semibold text-dark mb-2'>
                Waste Type *
              </label>
              <select
                name='wasteType'
                value={formData.wasteType}
                onChange={handleChange}
                className='input-field'
                required
              >
                {wasteTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-semibold text-dark mb-2'>
                Description *
              </label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Describe the waste issue in detail...'
                rows='5'
                required
                className='input-field'
              />
              <p className='text-xs text-gray-500 mt-1'>Max 500 characters</p>
            </div>

            {/* Location */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='md:col-span-2'>
                <label className='block text-sm font-semibold text-dark mb-2'>
                  Location *
                </label>
                <input
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  placeholder='e.g., Main Street, Downtown'
                  required
                  className='input-field'
                />
              </div>
            </div>

            {/* Coordinates (Optional) */}
            <div>
              <label className='block text-sm font-semibold text-dark mb-2'>
                Coordinates (Optional)
              </label>
              <div className='grid grid-cols-2 gap-4'>
                <input
                  type='number'
                  name='latitude'
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder='Latitude'
                  step='0.0001'
                  className='input-field'
                />
                <input
                  type='number'
                  name='longitude'
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder='Longitude'
                  step='0.0001'
                  className='input-field'
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className='block text-sm font-semibold text-dark mb-2'>
                Upload Image (Optional)
              </label>
              <div className='border-2 border-dashed border-primary rounded-lg p-6 text-center'>
                <input
                  type='file'
                  name='image'
                  onChange={handleChange}
                  accept='image/*'
                  className='w-full'
                />
                <p className='text-sm text-gray-500 mt-2'>
                  Accepted formats: JPEG, PNG, GIF (Max 5MB)
                </p>
                {formData.image && (
                  <p className='text-sm text-primary font-semibold mt-2'>
                    ✓ {formData.image.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex gap-4'>
              <button
                type='submit'
                disabled={loading}
                className='btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-1'
              >
                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
              <button
                type='button'
                onClick={() => navigate("/user/dashboard")}
                className='px-6 py-2 bg-gray-300 text-dark rounded-lg hover:bg-gray-400 transition font-medium'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
