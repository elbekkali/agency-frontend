'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import CallForm from '@/components/CallForm';

export default function EditCall() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enveloppe fetchCall dans useCallback pour qu'il soit stable
  const fetchCall = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInitialData(data);
    } catch (error) {
      console.error('Failed to fetch call:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]); // id est stable → pas besoin de le re-créer

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'agent')) {
      router.push('/dashboard');
    } else {
      fetchCall();
    }
  }, [user, router, fetchCall]); // fetchCall ajouté ici

  const handleSave = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      router.push('/calls');
    } catch (error) {
      console.error('Failed to update call:', error);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!initialData) return <div>Appel non trouvé</div>;

  return <CallForm onSave={handleSave} initialData={initialData} />;
}
