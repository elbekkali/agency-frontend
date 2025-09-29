'use client';

import { useState } from 'react';

export default function UserForm({ onSave, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    email: '',
    first_name: '',
    last_name: '',
    role: 'client',
    status: 'active',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{initialData ? 'Modifier utilisateur' : 'Créer utilisateur'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rôle</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="client">Client</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Statut</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
}