'use client';

import { useReference } from '@/lib/reference';
import {
  Edit,
  Trash2,
  PhoneCall,
  Mail,
  MessageCircle,
  Smartphone,
  Globe,
} from 'lucide-react';

export default function CallTable({ calls, onEdit, onDelete }) {
  const { callTypeQueries, methodOfReplyOptions, responseStatuses, users } =
    useReference();

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
    if (!methodLabel)
      return { icon: <Globe className="w-5 h-5 text-gray-400" />, color: 'gray' };

    const label = methodLabel.toLowerCase();
    if (label.includes('phone') || label.includes('appel'))
      return { icon: <PhoneCall className="w-5 h-5 text-blue-600" />, color: 'blue' };
    if (label.includes('mail') || label.includes('email'))
      return { icon: <Mail className="w-5 h-5 text-yellow-600" />, color: 'yellow' };
    if (label.includes('whatsapp') || label.includes('chat'))
      return { icon: <MessageCircle className="w-5 h-5 text-green-600" />, color: 'green' };
    if (label.includes('sms'))
      return { icon: <Smartphone className="w-5 h-5 text-pink-600" />, color: 'pink' };
    return { icon: <Globe className="w-5 h-5 text-gray-400" />, color: 'gray' };
  };

  return (
    <div className="flex w-full mt-6">
      <div className="w-full bg-white shadow-lg rounded-2xl border border-gray-200 overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          {/* 🧭 En-tête */}
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm uppercase tracking-wide">
              <th className="py-3 px-4 text-left rounded-tl-2xl w-[8%]">Date</th>
              <th className="py-3 px-4 text-left w-[6%]">Heure</th>
              <th className="py-3 px-4 text-left w-[8%]">Reçu de</th>
              <th className="py-3 px-4 text-left w-[12%]">Client</th>
              <th className="py-3 px-4 text-left w-[10%]">Contact</th>
              <th className="py-3 px-4 text-left w-[12%]">Type de requête</th>
              <th className="py-3 px-4 text-left w-[10%]">Raison</th>
              <th className="py-3 px-4 text-left w-[8%]">Répondu à</th>
              <th className="py-3 px-4 text-center w-[6%]">Méthode</th>
              <th className="py-3 px-4 text-left w-[10%]">Assigné à</th>
              <th className="py-3 px-4 text-left w-[8%]">Statut</th>
              <th className="py-3 px-4 text-center rounded-tr-2xl w-[6%]">Actions</th>
            </tr>
          </thead>

          {/* 📞 Corps du tableau */}
          <tbody>
            {calls.length > 0 ? (
              calls.map((call) => {
                const methodLabel = getLabelFromId(
                  call.replied_method_id,
                  methodOfReplyOptions
                );
                const { icon } = getMethodIcon(methodLabel);

                return (
                  <tr
                    key={call.id}
                    className="hover:bg-blue-50 transition duration-150 border-b border-gray-100"
                  >
                    <td className="py-3 px-4 text-gray-700 font-medium">{call.date}</td>
                    <td className="py-3 px-4 text-gray-600">{call.time}</td>
                    <td className="py-3 px-4 text-gray-700">{call.recieved_from}</td>
                    <td className="py-3 px-4 text-gray-800 font-semibold flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-blue-500" />
                      {call.client_name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{call.contact_number}</td>

                    {/* Type de requête */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">
                        {getLabelFromId(call.type_of_query_id, callTypeQueries)}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-gray-600">{call.reason_of_call}</td>

                    {/* Répondu à */}
                    <td className="py-3 px-4 text-gray-600">
                      {getLabelFromId(call.replied_to_id, responseStatuses)}
                    </td>

                    {/* Méthode (icône seule + tooltip) */}
                    <td className="py-3 px-4 text-center relative group cursor-pointer">
                      <div className="flex justify-center items-center">{icon}</div>
                      {/* Tooltip */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md py-1 px-2 whitespace-nowrap shadow-md z-10">
                        {methodLabel || 'Inconnu'}
                      </div>
                    </td>

                    {/* Assigné à */}
                    <td className="py-3 px-4 text-gray-700 font-medium">
                      {getUserNameFromId(call.assigned_to_id)}
                    </td>

                    {/* Statut */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
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
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => onEdit(call.id)}
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDelete(call.id)}
                          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="py-6 text-center text-gray-500 italic"
                >
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
