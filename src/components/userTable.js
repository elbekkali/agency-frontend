'use client';

import { Edit, Trash2, Power, PowerOff } from 'lucide-react';

export default function UserTable({ users, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm uppercase tracking-wide">
            <th className="py-3 px-4 text-left rounded-tl-xl">Photo</th>
            <th className="py-3 px-4 text-left">Prénom</th>
            <th className="py-3 px-4 text-left">Nom</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Téléphone</th>
            <th className="py-3 px-4 text-left">Rôle</th>
            <th className="py-3 px-4 text-left">Statut</th>
            <th className="py-3 px-4 text-left">Date de naissance</th>
            <th className="py-3 px-4 text-left">Adresse</th>
            <th className="py-3 px-4 text-left">Notes</th>
            <th className="py-3 px-4 text-center rounded-tr-xl">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-blue-50 transition duration-150 border-b border-gray-100"
              >
                {/* Photo de profil */}
                <td className="py-3 px-4">
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.first_name}
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-semibold text-blue-800">
                      {user.first_name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                  )}
                </td>

                <td className="py-3 px-4 font-medium text-gray-800">
                  {user.first_name}
                </td>
                <td className="py-3 px-4 text-gray-700">{user.last_name}</td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                <td className="py-3 px-4 text-gray-600">{user.phone_number}</td>

                {/* Rôle */}
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : user.role === 'agent'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Statut */}
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {user.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>

                <td className="py-3 px-4 text-gray-600">{user.birth_date}</td>
                <td className="py-3 px-4 text-gray-600">{user.address}</td>
                <td className="py-3 px-4 text-gray-600">{user.notes}</td>

                {/* Actions */}
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Éditer */}
                    <button
                      onClick={() => onEdit(user.id)}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    {/* Supprimer */}
                    <button
                      onClick={() => onDelete(user.id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Activer / Désactiver */}
                    <button
                      onClick={() => onToggleStatus(user.id, user.status)}
                      className={`p-2 rounded-full transition ${
                        user.status === 'active'
                          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white'
                          : 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white'
                      }`}
                      title={
                        user.status === 'active'
                          ? 'Désactiver'
                          : 'Activer'
                      }
                    >
                      {user.status === 'active' ? (
                        <PowerOff className="w-4 h-4" />
                      ) : (
                        <Power className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="11"
                className="py-6 text-center text-gray-500 italic"
              >
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
