'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>
      <p>Bienvenue, {user.email} ({user.role})</p>
      {user.role === 'admin' && (
        <button
          onClick={() => router.push('/users')}
          className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Gérer les utilisateurs
        </button>
      )}
      {(user.role === 'admin' || user.role === 'agent') && (
        <button
          onClick={() => router.push('/calls')}
          className="mt-4 ml-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Gérer les appels
        </button>
      )}
      <button
        onClick={logout}
        className="mt-4 ml-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
      >
        Déconnexion
      </button>
    </div>
  );
}