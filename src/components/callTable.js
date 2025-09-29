'use client';

import Link from 'next/link';

export default function CallTable({ calls, onEdit }) {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Utilisateur</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call) => (
          <tr key={call.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{call.id}</td>
            <td className="py-2 px-4 border-b">{call.user_id}</td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => onEdit(call.id)}
                className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 mr-2"
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