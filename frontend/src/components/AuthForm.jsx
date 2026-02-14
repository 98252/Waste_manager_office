/**
 * Authentication Form Component (Login & Register)
 * Reusable form component for authentication pages
 */

import { useState } from "react";

export default function AuthForm({
  title,
  onSubmit,
  isLoading,
  error,
  fields,
}) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h2 className='text-2xl font-bold text-dark mb-6'>{title}</h2>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg'>
          {error}
        </div>
      )}

      {fields.map((field) => (
        <div key={field.name}>
          <label className='block text-sm font-medium text-dark mb-2'>
            {field.label}
          </label>
          <input
            type={field.type || "text"}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required !== false}
            className='input-field'
          />
        </div>
      ))}

      <button
        type='submit'
        disabled={isLoading}
        className='w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isLoading ? "Processing..." : title}
      </button>
    </form>
  );
}
