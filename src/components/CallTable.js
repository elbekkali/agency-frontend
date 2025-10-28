'use client';

import { useReference } from '@/lib/reference';
import { Edit, Trash2, PhoneCall, Mail, MessageCircle, Smartphone, Globe } from 'lucide-react';

export default function CallTable({ calls, onEdit, onDelete }) {
  const { callTypeQueries, methodOfReplyOptions, responseStatuses, users } = useReference();

  // 🧠 Fonctions utilitaires
  const getLabelFromId = (id, list, defaultValue = '—') => {
    const item = list?.find((ref) => ref.id === id);
    return item ? item.label || item.name || defaultValue : defaultValue;
  };

  const getUserNameFromId = (id, defaultValue = '—') => {
    const user = users?.find((u) => u.id === id);
    return user
      ? `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email
      : defaultValue;
  };

  // 🎨 Icônes dynamiques selon la méthode
  const getMethodIcon = (methodLabel) => {
    if (!methodLabel) return { icon: <Globe className="h-5 w-5 text-gray-400" />, color: 'gray' };

    const label = methodLabel.toLowerCase();
    if (label.includes('phone') || label.includes('appel'))
      return { icon: <PhoneCall className="h-5 w-5 text-blue-600" />, color: 'blue' };
    if (label.includes('mail') || label.includes('email'))
      return { icon: <Mail className="h-5 w-5 text-yellow-600" />, color: 'yellow' };
    if (label.includes('whatsapp') || label.includes('chat'))
      return { icon: <MessageCircle className="h-5 w-5 text-green-600" />, color: 'green' };
    if (label.includes('sms'))
      return { icon: <Smartphone className="h-5 w-5 text-pink-600" />, color: 'pink' };
    return { icon: <Globe className="h-5 w-5 text-gray-400" />, color: 'gray' };
  };

  return (
    <div className="mt-6 flex w-full">
      <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
        <table className="w-full table-auto border-collapse">
          {/* 🧭 En-tête */}
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-sm tracking-wide text-white uppercase">
              <th className="w-[8%] rounded-tl-2xl px-4 py-3 text-left">Date</th>
              <th className="w-[6%] px-4 py-3 text-left">Heure</th>
              <th className="w-[8%] px-4 py-3 text-left">Reçu de</th>
              <th className="w-[12%] px-4 py-3 text-left">Client</th>
              <th className="w-[10%] px-4 py-3 text-left">Contact</th>
              <th className="w-[12%] px-4 py-3 text-left">Type de requête</th>
              <th className="w-[10%] px-4 py-3 text-left">Raison</th>
              <th className="w-[8%] px-4 py-3 text-left">Répondu à</th>
              <th className="w-[6%] px-4 py-3 text-center">Méthode</th>
              <th className="w-[10%] px-4 py-3 text-left">Assigné à</th>
              <th className="w-[8%] px-4 py-3 text-left">Statut</th>
              <th className="w-[6%] rounded-tr-2xl px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* 📞 Corps du tableau */}
          <tbody>
            {calls.length > 0 ? (
              calls.map((call) => {
                const methodLabel = getLabelFromId(call.replied_method_id, methodOfReplyOptions);
                const { icon } = getMethodIcon(methodLabel);

                return (
                  <tr
                    key={call.id}
                    className="border-b border-gray-100 transition duration-150 hover:bg-blue-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700">{call.date}</td>
                    <td className="px-4 py-3 text-gray-600">{call.time}</td>
                    <td className="px-4 py-3 text-gray-700">{call.recieved_from}</td>
                    <td className="flex items-center gap-2 px-4 py-3 font-semibold text-gray-800">
                      <PhoneCall className="h-4 w-4 text-blue-500" />
                      {call.client_name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{call.contact_number}</td>

                    {/* Type de requête */}
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                        {getLabelFromId(call.type_of_query_id, callTypeQueries)}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-gray-600">{call.reason_of_call}</td>

                    {/* Répondu à */}
                    <td className="px-4 py-3 text-gray-600">
                      {getLabelFromId(call.replied_to_id, responseStatuses)}
                    </td>

                    {/* Méthode (icône seule + tooltip) */}
                    <td className="group relative cursor-pointer px-4 py-3 text-center">
                      <div className="flex items-center justify-center">{icon}</div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 transform rounded-md bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white shadow-md group-hover:block">
                        {methodLabel || 'Inconnu'}
                      </div>
                    </td>

                    {/* Assigné à */}
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {getUserNameFromId(call.assigned_to_id)}
                    </td>

                    {/* Statut */}
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          call.status?.toLowerCase() === 'closed'
                            ? 'bg-green-100 text-green-700'
                            : call.status?.toLowerCase() === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : call.status?.toLowerCase() === 'open'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {call.status || '—'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => onEdit(call.id)}
                          className="rounded-full bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => onDelete(call.id)}
                          className="rounded-full bg-red-100 p-2 text-red-600 transition hover:bg-red-600 hover:text-white"
                          title="Supprimer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="12" className="py-6 text-center text-gray-500 italic">
                  Aucun appel enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
