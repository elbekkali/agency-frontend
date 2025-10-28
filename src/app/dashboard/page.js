'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Contenu principal */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Tableau de bord</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {user.role === 'admin' && (
            <button
              onClick={() => router.push('/users')}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-md transition duration-300 hover:border-blue-400 hover:shadow-blue-200"
            >
              <h3 className="mb-2 text-lg font-semibold text-blue-600">
                👤 Gérer les utilisateurs
              </h3>
              <p className="text-sm text-gray-500">
                Ajouter, modifier ou supprimer des utilisateurs.
              </p>
            </button>
          )}

          {(user.role === 'admin' || user.role === 'agent') && (
            <button
              onClick={() => router.push('/calls')}
              className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-md transition duration-300 hover:border-green-400 hover:shadow-green-200"
            >
              <h3 className="mb-2 text-lg font-semibold text-green-600">📞 Gérer les appels</h3>
              <p className="text-sm text-gray-500">Consulter et gérer les appels des clients.</p>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
