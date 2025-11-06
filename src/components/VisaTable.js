'use client';

import Image from 'next/image';
import { Edit, Trash2, User } from 'lucide-react';

export default function VisaTable({ visaList, onEdit, onDelete }) {
  return (
    <div className="mt-6 flex w-full">
      <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
        <table className="w-full table-auto border-collapse">
          {/* 🧭 En-tête */}
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-sm tracking-wide text-white uppercase">
              <th className="w-[8%] rounded-tl-2xl px-4 py-3 text-left">Photo</th>
              <th className="w-[15%] px-4 py-3 text-left">Nom complet</th>
              <th className="w-[10%] px-4 py-3 text-left">Nationalité</th>
              <th className="w-[8%] px-4 py-3 text-left">Genre</th>
              <th className="w-[10%] px-4 py-3 text-left">Naissance</th>
              <th className="w-[12%] px-4 py-3 text-left">Passeport</th>
              <th className="w-[12%] px-4 py-3 text-left">Séjour prévu</th>
              <th className="w-[10%] px-4 py-3 text-left">Hôtel</th>
              <th className="w-[6%] rounded-tr-2xl px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* 📄 Corps du tableau */}
          <tbody>
            {visaList?.length > 0 ? (
              visaList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 transition duration-150 hover:bg-blue-50"
                >
                  {/* ✅ Photo */}
                  <td className="px-4 py-3">
                    <Image
                      src={item.personal_picture || '/default-avatar.png'}
                      alt="Photo"
                      width={45}
                      height={45}
                      className="h-12 w-12 rounded-full border object-cover shadow-sm"
                    />
                  </td>

                  {/* ✅ Nom complet */}
                  <td className="flex items-center gap-2 px-4 py-3 font-semibold text-gray-800">
                    <User className="h-4 w-4 text-blue-500" />
                    {item.firstNameEn} {item.fatherNameEn} {item.lastNameEn}
                  </td>

                  {/* ✅ Nationalité */}
                  <td className="px-4 py-3 text-gray-700">{item.nationality}</td>

                  {/* ✅ Genre */}
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        item.gender === 'Male'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {item.gender === 'Male' ? 'Homme' : 'Femme'}
                    </span>
                  </td>

                  {/* ✅ Date + Ville naissance */}
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex flex-col">
                      <span>{item.dateOfBirth}</span>
                      <span className="text-xs text-gray-500">
                        {item.cityOfBirth}, {item.countryOfBirth}
                      </span>
                    </div>
                  </td>

                  {/* ✅ Passeport */}
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex flex-col">
                      <span>{item.passportNumber}</span>
                      <span className="text-xs text-gray-500">Exp: {item.passportExpiryDate}</span>
                    </div>
                  </td>

                  {/* ✅ Séjour */}
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex flex-col">
                      <span>{item.expectedDateEntry}</span>
                      <span className="text-xs text-gray-500">→ {item.expectedDateLeave}</span>
                    </div>
                  </td>

                  {/* ✅ Hôtel */}
                  <td className="px-4 py-3 font-medium text-gray-700">{item.hotelName}</td>

                  {/* ✅ Actions */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(item.id)}
                        className="rounded-full bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => onDelete(item.id)}
                        className="rounded-full bg-red-100 p-2 text-red-600 transition hover:bg-red-600 hover:text-white"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-6 text-center text-gray-500 italic">
                  Aucune demande enregistrée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
