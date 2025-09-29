'use client';

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b">Prénom</th>
          <th className="py-2 px-4 border-b">Nom</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Téléphone</th>
          <th className="py-2 px-4 border-b">Rôle</th>
          <th className="py-2 px-4 border-b">Statut</th>
          <th className="py-2 px-4 border-b">Date de naissance</th>
          <th className="py-2 px-4 border-b">Adresse</th>
          <th className="py-2 px-4 border-b">Photo de profil</th>
          <th className="py-2 px-4 border-b">Notes</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{user.first_name}</td>
            <td className="py-2 px-4 border-b">{user.last_name}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.phone_number}</td>
            <td className="py-2 px-4 border-b">{user.role}</td>
            <td className="py-2 px-4 border-b">{user.status}</td>
            <td className="py-2 px-4 border-b">{user.birth_date}</td>
            <td className="py-2 px-4 border-b">{user.address}</td>
            <td className="py-2 px-4 border-b">{user.profile_picture}</td>
            <td className="py-2 px-4 border-b">{user.notes}</td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => onEdit(user.id)}
                className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 mr-2"
              >
                Éditer
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}