'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Contenu principal */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tableau de bord</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {user.role === 'admin' && (
            <button
              onClick={() => router.push('/users')}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-blue-200 hover:border-blue-400 transition duration-300 text-center"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                👤 Gérer les utilisateurs
              </h3>
              <p className="text-gray-500 text-sm">
                Ajouter, modifier ou supprimer des utilisateurs.
              </p>
            </button>
          )}

          {(user.role === 'admin' || user.role === 'agent') && (
            <button
              onClick={() => router.push('/calls')}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-green-200 hover:border-green-400 transition duration-300 text-center"
            >
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                📞 Gérer les appels
              </h3>
              <p className="text-gray-500 text-sm">
                Consulter et gérer les appels des clients.
              </p>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
