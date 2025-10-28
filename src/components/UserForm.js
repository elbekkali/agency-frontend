'use client';

import { useState } from 'react';
import { Camera, Save } from 'lucide-react';
import Image from 'next/image';

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

  const [formData, setFormData] = useState(
    initialData ? { ...initialFormData, ...initialData } : initialFormData
  );

  // Preview dynamique
  const [preview, setPreview] = useState(initialData?.profile_picture || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setPreview(result);
      setFormData({ ...formData, profile_picture: result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        {initialData ? 'Modifier un utilisateur' : 'Créer un utilisateur'}
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Prénom */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Prénom</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nom */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Nom</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Téléphone</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mot de passe (création uniquement) */}
        {!initialData && (
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Rôle */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Rôle</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="client">Client</option>
          </select>
        </div>

        {/* Statut */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Statut</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>

        {/* Date de naissance */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">
            Date de naissance
          </label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date || ''}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Adresse */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Adresse</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Photo de profil */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">Photo de profil</label>

          <div className="flex items-center gap-4">
            {/* Zone d'aperçu */}
            <label className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed bg-gray-100 transition hover:bg-gray-200">
              {preview ? (
                <Image
                  src={preview}
                  alt="Aperçu"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                  unoptimized
                />
              ) : (
                <Camera className="h-8 w-8 text-gray-500" />
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>

            {/* URL manuelle */}
            <input
              type="text"
              name="profile_picture"
              value={formData.profile_picture}
              onChange={handleChange}
              placeholder="Ou collez l’URL d’une image"
              className="flex-1 rounded-lg border border-gray-300 p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="Notes ou remarques..."
          />
        </div>

        {/* Bouton */}
        <div className="mt-6 text-center md:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
          >
            <Save className="h-5 w-5" />
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
}
