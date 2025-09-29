'use client';

import { useState, useEffect } from 'react';
import { useReference } from '@/lib/reference';

export default function CallForm({ onSave, initialData }) {
  const { callTypeQueries, methodOfReplyOptions, responseStatuses, users } = useReference();
  const [formData, setFormData] = useState(initialData || {
    date: '',
    time: '',
    recieved_from: '',
    client_name: '',
    contact_number: '',
    type_of_query_id: '',
    reason_of_call: '',
    answered_by: '',
    replied_to_id: '',
    replied_method_id: '',
    replied_by: '',
    assigned_to_id: '',
    action_to_be_taken_by: '',
    actions_to_be_taken: '',
    action_taken: '',
    other_comments: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Fonction pour trouver l'ID dans les données de référence
  const getIdFromLabelOrId = (value, referenceArray) => {
    if (!value) return '';
    const item = referenceArray.find((ref) => ref.id === value || ref.label === value);
    return item ? item.id : value; // Retourne l'ID si trouvé, sinon garde la valeur brute
  };

  // Initialisation avec conversion des ID en valeurs initiales
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        type_of_query_id: getIdFromLabelOrId(initialData.type_of_query_id, callTypeQueries),
        replied_to_id: getIdFromLabelOrId(initialData.replied_to_id, responseStatuses),
        replied_method_id: getIdFromLabelOrId(initialData.replied_method_id, methodOfReplyOptions),
        assigned_to_id: getIdFromLabelOrId(initialData.assigned_to_id, users),
      }));
    }
  }, [initialData, callTypeQueries, responseStatuses, methodOfReplyOptions, users]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{initialData ? 'Modifier appel' : 'Créer appel'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Heure</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Reçu de</label>
          <input
            type="text"
            name="recieved_from"
            value={formData.recieved_from}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom du client</label>
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Numéro de contact</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type de requête</label>
          <select
            name="type_of_query_id"
            value={formData.type_of_query_id}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Sélectionner un type</option>
            {callTypeQueries.map((query) => (
              <option key={query.id} value={query.id}>
                {query.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Raison de l'appel</label>
          <textarea
            name="reason_of_call"
            value={formData.reason_of_call}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Répondu par</label>
          <input
            type="text"
            name="answered_by"
            value={formData.answered_by}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Répondu à</label>
          <select
            name="replied_to_id"
            value={formData.replied_to_id}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Sélectionner un statut</option>
            {responseStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Méthode de réponse</label>
          <select
            name="replied_method_id"
            value={formData.replied_method_id}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Sélectionner une méthode</option>
            {methodOfReplyOptions.map((method) => (
              <option key={method.id} value={method.id}>
                {method.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Répondu par</label>
          <input
            type="text"
            name="replied_by"
            value={formData.replied_by}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Assigné à</label>
          <select
            name="assigned_to_id"
            value={formData.assigned_to_id}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Non assigné</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {`${user.first_name} ${user.last_name}` || user.email}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Action à prendre par</label>
          <input
            type="text"
            name="action_to_be_taken_by"
            value={formData.action_to_be_taken_by}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Actions à prendre</label>
          <textarea
            name="actions_to_be_taken"
            value={formData.actions_to_be_taken}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Action prise</label>
          <textarea
            name="action_taken"
            value={formData.action_taken}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Autres commentaires</label>
          <textarea
            name="other_comments"
            value={formData.other_comments}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Statut</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Closed">Closed</option>
            <option value="Pending">Pending</option>
            <option value="Open">Open</option>
          </select>
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