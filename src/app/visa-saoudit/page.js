// src/app/visa-saoudit/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import VisaTable from '@/components/VisaTable';
import { mockVisaSaoudit } from '@/lib/mockVisa';

export default function VisaSaoudit() {
  const { user } = useAuth();
  const router = useRouter();

  const [visaList, setVisaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'agent')) {
      router.push('/dashboard');
    } else {
      fetchVisaData();
    }
  }, [user, router]);

  const fetchVisaData = async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Comme le backend n'existe pas encore : on charge les mock
      setVisaList(mockVisaSaoudit);
    } catch (error) {
      console.error('Failed to load visa data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/visa-saoudit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande de visa ?')) {
      try {
        // ✅ backend pas encore prêt → on supprime localement le mock
        setVisaList((prev) => prev.filter((v) => v.id !== id));
      } catch (error) {
        console.error('Failed to delete visa:', error);
        setError(error.message);
      }
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-500">Erreur : {error}</div>;

  return (
    <div className="w-full px-10 py-8">
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-3xl font-bold">Gestion des demandes de visa saoudien</h1>

        <button
          onClick={() => router.push('/visa-saoudit/create')}
          className="self-start rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Créer une nouvelle demande
        </button>

        <VisaTable visaList={visaList} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
