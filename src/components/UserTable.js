'use client';

import { Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import Image from 'next/image';

export default function UserTable({ users, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg bg-white shadow-md">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
              Utilisateur
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
              Rôle
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
              Statut
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  {/* Avatar avec fill + relative */}
                  <div className="relative h-10 w-10">
                    {user.profile_picture ? (
                      <Image
                        src={user.profile_picture}
                        alt={user.first_name}
                        fill
                        className="rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
                        <span className="text-sm font-bold">
                          {user.first_name?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {user.first_name} {user.last_name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{user.email}</td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : user.role === 'agent'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    user.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(user.id)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Modifier"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onToggleStatus(user.id, user.status)}
                    className={`${
                      user.status === 'active' ? 'text-orange-600' : 'text-green-600'
                    } hover:opacity-80`}
                    title={user.status === 'active' ? 'Désactiver' : 'Activer'}
                  >
                    {user.status === 'active' ? (
                      <UserX className="h-4 w-4" />
                    ) : (
                      <UserCheck className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
