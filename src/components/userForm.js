'use client';

import { useState } from 'react';

export default function UserForm({ onSave, initialData }) {
  const initialFormData = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: 'client',
    status: 'active',
    birth_date: '',
    address: '',
    profile_picture: '',
    notes: '',
  };
  const [formData, setFormData] = useState(initialData ? { ...initialFormData, ...initialData } : initialFormData);

  console.log('Initial data in UserForm:', initialData);
  console.log('Form data initialized:', formData);

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
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            autoComplete="given-name"
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
            autoComplete="family-name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            autoComplete="new-email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            autoComplete="tel"
          />
        </div>
        {!initialData && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password || ''} // Assure une valeur par défaut vide
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
              autoComplete="new-password"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700">Rôle</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            autoComplete="new-role"
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
            autoComplete="new-status"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            autoComplete="bday"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Adresse</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            autoComplete="street-address"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo de profil</label>
          <input
            type="text"
            name="profile_picture"
            value={formData.profile_picture || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            autoComplete="url"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            autoComplete="off"
          />
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