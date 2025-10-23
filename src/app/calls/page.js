// src/app/calls/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import CallTable from '@/components/CallTable';

export default function Calls() {
  const { user } = useAuth();
  const router = useRouter();
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'agent')) {
      router.push('/dashboard');
    } else {
      fetchCalls();
    }
  }, [user, router]);

  const fetchCalls = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL is not defined. Check .env.local');
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCalls(data);
    } catch (error) {
      console.error('Failed to fetch calls:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/calls/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet appel ?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        fetchCalls(); // Recharger la liste après suppression
      } catch (error) {
        console.error('Failed to delete call:', error);
        setError(error.message);
      }
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-500">Erreur : {error}</div>;

  return (
    <div className="w-full px-10 py-8">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Gestion des appels</h1>
        <button
          onClick={() => router.push('/calls/create')}
          className="self-start bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Créer un nouvel appel
        </button>
        <CallTable calls={calls} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
