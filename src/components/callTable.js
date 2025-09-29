// src/components/CallTable.js
'use client';

export default function CallTable({ calls, onEdit, onDelete }) {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b">Date</th>
          <th className="py-2 px-4 border-b">Heure</th>
          <th className="py-2 px-4 border-b">Reçu de</th>
          <th className="py-2 px-4 border-b">Nom du client</th>
          <th className="py-2 px-4 border-b">Numéro de contact</th>
          <th className="py-2 px-4 border-b">Type de requête</th>
          <th className="py-2 px-4 border-b">Raison de l'appel</th>
          <th className="py-2 px-4 border-b">Répondu par</th>
          <th className="py-2 px-4 border-b">Répondu à</th>
          <th className="py-2 px-4 border-b">Méthode de réponse</th>
          <th className="py-2 px-4 border-b">Répondu par</th>
          <th className="py-2 px-4 border-b">Assigné à</th>
          <th className="py-2 px-4 border-b">Action à prendre par</th>
          <th className="py-2 px-4 border-b">Actions à prendre</th>
          <th className="py-2 px-4 border-b">Action prise</th>
          <th className="py-2 px-4 border-b">Autres commentaires</th>
          <th className="py-2 px-4 border-b">Statut</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call) => (
          <tr key={call.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{call.date}</td>
            <td className="py-2 px-4 border-b">{call.time}</td>
            <td className="py-2 px-4 border-b">{call.recieved_from}</td>
            <td className="py-2 px-4 border-b">{call.client_name}</td>
            <td className="py-2 px-4 border-b">{call.contact_number}</td>
            <td className="py-2 px-4 border-b">{call.type_of_query_id}</td>
            <td className="py-2 px-4 border-b">{call.reason_of_call}</td>
            <td className="py-2 px-4 border-b">{call.answered_by}</td>
            <td className="py-2 px-4 border-b">{call.replied_to_id}</td>
            <td className="py-2 px-4 border-b">{call.replied_method_id}</td>
            <td className="py-2 px-4 border-b">{call.replied_by}</td>
            <td className="py-2 px-4 border-b">{call.assigned_to_id}</td>
            <td className="py-2 px-4 border-b">{call.action_to_be_taken_by}</td>
            <td className="py-2 px-4 border-b">{call.actions_to_be_taken}</td>
            <td className="py-2 px-4 border-b">{call.action_taken}</td>
            <td className="py-2 px-4 border-b">{call.other_comments}</td>
            <td className="py-2 px-4 border-b">{call.status}</td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => onEdit(call.id)}
                className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 mr-2"
              >
                Éditer
              </button>
              <button
                onClick={() => onDelete(call.id)}
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