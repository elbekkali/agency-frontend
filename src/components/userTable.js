'use client';

import Link from 'next/link';

export default function UserTable({ users, onEdit }) {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Rôle</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.role}</td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => onEdit(user.id)}
                className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600"
              >
                Éditer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}