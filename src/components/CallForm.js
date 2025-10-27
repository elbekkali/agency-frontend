'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { useReference } from '@/lib/reference';
import { PhoneCall, User, MessageCircle, ClipboardList, Save } from 'lucide-react';

// Fonction utilitaire pour comparer profondément deux objets
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Composant Field défini en dehors de CallForm
const Field = memo(({ label, icon: Icon, children }) => (
  <div className="space-y-1">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {Icon && <Icon className="w-4 h-4 text-blue-500" />} {label}
    </label>
    {children}
  </div>
));
Field.displayName = 'Field'; // Ajout du displayName pour ESLint

export default function CallForm({ onSave, initialData }) {
  const { callTypeQueries, methodOfReplyOptions, responseStatuses, users } = useReference();

  // 🧩 Modèle de base pour le formulaire
  const initialFormData = {
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
  };

  // 🧠 Initialisation de l'état avec fusion sécurisée
  const [formData, setFormData] = useState(
    initialData ? { ...initialFormData, ...initialData } : initialFormData
  );

  // 🧩 Fonction utilitaire pour retrouver un ID à partir d’un label ou d’un ID
  const getIdFromLabelOrId = useCallback((value, referenceArray) => {
    if (!value) return '';
    const item = referenceArray.find(
      (ref) => ref.id === value || ref.label === value
    );
    return item ? item.id : value;
  }, []);

  // ⚙️ Synchronisation des données initiales au montage
  useEffect(() => {
    if (!initialData) return;

    setFormData((prev) => {
      const newFormData = {
        ...prev,
        type_of_query_id: getIdFromLabelOrId(
          initialData.type_of_query_id,
          callTypeQueries
        ),
        replied_to_id: getIdFromLabelOrId(
          initialData.replied_to_id,
          responseStatuses
        ),
        replied_method_id: getIdFromLabelOrId(
          initialData.replied_method_id,
          methodOfReplyOptions
        ),
        assigned_to_id: getIdFromLabelOrId(
          initialData.assigned_to_id,
          users
        ),
      };

      // Éviter la mise à jour si les données n'ont pas changé
      if (isEqual(prev, newFormData)) return prev;
      return newFormData;
    });
  }, [initialData, callTypeQueries, responseStatuses, methodOfReplyOptions, users, getIdFromLabelOrId]);

  // 🧩 Gestion de la saisie
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (prev[name] === value) return prev;
      return { ...prev, [name]: value };
    });
  }, []);

  // ✅ Soumission du formulaire
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSave(formData);
    },
    [onSave, formData]
  );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto mt-6 border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        {initialData ? (
          <>
            <ClipboardList className="w-6 h-6 text-blue-600" /> Modifier un appel
          </>
        ) : (
          <>
            <PhoneCall className="w-6 h-6 text-blue-600" /> Créer un appel
          </>
        )}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 📅 Informations principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Date">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </Field>

          <Field label="Heure">
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </Field>
        </div>

        {/* 👤 Informations client */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" /> Informations client
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Reçu de">
              <input
                type="text"
                name="recieved_from"
                value={formData.recieved_from}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </Field>

            <Field label="Nom du client">
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </Field>

            <Field label="Numéro de contact">
              <input
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </Field>

            <Field label="Type de requête">
              <select
                name="type_of_query_id"
                value={formData.type_of_query_id}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="">Sélectionner un type</option>
                {callTypeQueries.map((query) => (
                  <option key={query.id} value={query.id}>
                    {query.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Raison de l'appel">
            <textarea
              name="reason_of_call"
              value={formData.reason_of_call}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              rows="3"
            />
          </Field>
        </div>

        {/* 💬 Réponses */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-500" /> Suivi et réponse
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Répondu par">
              <input
                type="text"
                name="answered_by"
                value={formData.answered_by}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </Field>

            <Field label="Répondu à">
              <select
                name="replied_to_id"
                value={formData.replied_to_id}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="">Sélectionner un statut</option>
                {responseStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Méthode de réponse">
              <select
                name="replied_method_id"
                value={formData.replied_method_id}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="">Sélectionner une méthode</option>
                {methodOfReplyOptions.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Répondu par (personne)">
              <input
                type="text"
                name="replied_by"
                value={formData.replied_by}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </Field>
          </div>
        </div>

        {/* 🧾 Actions */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-500" /> Actions et statut
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Assigné à">
              <select
                name="assigned_to_id"
                value={formData.assigned_to_id}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="">Non assigné</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.first_name} ${user.last_name}` || user.email}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Statut">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="Open">Ouvert</option>
                <option value="Pending">En attente</option>
                <option value="Closed">Fermé</option>
              </select>
            </Field>
          </div>

          <Field label="Actions à prendre par">
            <input
              type="text"
              name="action_to_be_taken_by"
              value={formData.action_to_be_taken_by}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </Field>

          <Field label="Actions à prendre">
            <textarea
              name="actions_to_be_taken"
              value={formData.actions_to_be_taken}
              onChange={handleChange}
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </Field>

          <Field label="Action prise">
            <textarea
              name="action_taken"
              value={formData.action_taken}
              onChange={handleChange}
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </Field>

          <Field label="Autres commentaires">
            <textarea
              name="other_comments"
              value={formData.other_comments}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </Field>
        </div>

        {/* 💾 Bouton */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
          >
            <Save className="w-5 h-5" />
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
}