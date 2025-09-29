'use client';

import { useState } from 'react';

export default function CallForm({ onSave, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    user_id: '',
    status: 'pending',
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
      <h1 className="text-3xl font-bold mb-4">{initialData ? 'Modifier appel' : 'Créer appel'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID Utilisateur</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Statut</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="pending">En attente</option>
            <option value="completed">Terminé</option>
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