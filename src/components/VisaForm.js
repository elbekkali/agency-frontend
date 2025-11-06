'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Save, Camera } from 'lucide-react';

export default function VisaForm({ initialData, onSave }) {
  const defaultData = {
    personal_picture: '',
    nationality: '',
    firstNameEn: '',
    fatherNameEn: '',
    lastNameEn: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: '',
    countryOfBirth: '',
    cityOfBirth: '',
    profession: '',
    countryResidence: '',
    cityResidence: '',
    postalCode: '',
    address: '',
    passportType: '',
    passportNumber: '',
    passportIssuePlace: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    expectedDateEntry: '',
    expectedDateLeave: '',
    residenceAddressSaudi: '',
    hotelName: '',
  };

  const [formData, setFormData] = useState(
    initialData ? { ...defaultData, ...initialData } : defaultData
  );

  const [preview, setPreview] = useState(initialData?.personal_picture || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setPreview(result);
      setFormData((prev) => ({ ...prev, personal_picture: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        {initialData ? 'Modifier une demande de visa' : 'Créer une demande de visa'}
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* ✅ Photo */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Photo (scan passeport)
          </label>

          <div className="flex items-center gap-6">
            {/* Zone photo */}
            <label className="relative flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed bg-gray-100 transition hover:bg-gray-200">
              {preview ? (
                <Image
                  src={preview}
                  alt="Photo passeport"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <Camera className="h-10 w-10 text-gray-500" />
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>

            {/* URL */}
            <input
              type="text"
              name="personal_picture"
              placeholder="Ou collez l’URL d’une image"
              value={formData.personal_picture}
              onChange={handleChange}
              className="flex-1 rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ✅ Nom complet */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Prénom (EN)</label>
          <input
            name="firstNameEn"
            value={formData.firstNameEn}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Nom du père (EN)</label>
          <input
            name="fatherNameEn"
            value={formData.fatherNameEn}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Nom (EN)</label>
          <input
            name="lastNameEn"
            value={formData.lastNameEn}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Nationalité */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Nationalité</label>
          <input
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Genre */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Genre</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">—</option>
            <option value="Male">Homme</option>
            <option value="Female">Femme</option>
          </select>
        </div>

        {/* ✅ État civil */}
        <div>
          <label className="text-sm font-semibold text-gray-700">État civil</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">—</option>
            <option value="Single">Célibataire</option>
            <option value="Married">Marié(e)</option>
            <option value="Divorced">Divorcé(e)</option>
            <option value="Widow">Veuf / Veuve</option>
          </select>
        </div>

        {/* ✅ Date naissance */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Date de naissance</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Ville / Pays naissance */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Pays de naissance</label>
          <input
            name="countryOfBirth"
            value={formData.countryOfBirth}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Ville de naissance</label>
          <input
            name="cityOfBirth"
            value={formData.cityOfBirth}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Profession */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Profession</label>
          <input
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Adresse complète */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">Adresse</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Passeport */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Numéro de passeport</label>
          <input
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Type</label>
          <input
            name="passportType"
            value={formData.passportType}
            onChange={handleChange}
            placeholder="Ordinary, Diplomatic..."
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Lieu d’émission</label>
          <input
            name="passportIssuePlace"
            value={formData.passportIssuePlace}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Date d’émission</label>
          <input
            type="date"
            name="passportIssueDate"
            value={formData.passportIssueDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Date d’expiration</label>
          <input
            type="date"
            name="passportExpiryDate"
            value={formData.passportExpiryDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm"
          />
        </div>

        {/* ✅ Séjour */}
        <div>
          <label className="text-sm font-semibold text-gray-700">Date d’entrée prévue</label>
          <input
            type="date"
            name="expectedDateEntry"
            value={formData.expectedDateEntry}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Date de sortie prévue</label>
          <input
            type="date"
            name="expectedDateLeave"
            value={formData.expectedDateLeave}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">
            Adresse de résidence en Arabie Saoudite
          </label>
          <input
            name="residenceAddressSaudi"
            value={formData.residenceAddressSaudi}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-gray-700">Hôtel</label>
          <input
            name="hotelName"
            value={formData.hotelName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm"
          />
        </div>

        {/* ✅ Bouton Sauvegarder */}
        <div className="mt-6 text-center md:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
          >
            <Save className="h-5 w-5" />
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
}
