'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import UserForm from '@/components/UserForm';

export default function EditUser() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enveloppe fetchUser dans useCallback
  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setInitialData(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]); // id est stable

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/dashboard');
    } else {
      fetchUser();
    }
  }, [user, router, fetchUser]); // fetchUser ajouté

  const handleSave = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
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
      router.push('/users');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!initialData) return <div>Utilisateur non trouvé</div>;

  return <UserForm onSave={handleSave} initialData={initialData} />;
}
