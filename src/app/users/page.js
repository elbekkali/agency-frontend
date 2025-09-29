'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import UserTable from '@/components/UserTable';

export default function Users() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/dashboard');
    } else {
      fetchUsers();
    }
  }, [user, router]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL is not defined. Check .env.local');
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/?include_inactive=true`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    router.push(`/users/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
        setError(error.message);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const action = currentStatus === 'active' ? 'deactivate' : 'activate';
    if (window.confirm(`Êtes-vous sûr de vouloir ${action === 'deactivate' ? 'désactiver' : 'activer'} cet utilisateur ?`)) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/${action}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        fetchUsers();
      } catch (error) {
        console.error(`Failed to ${action} user:`, error);
        setError(error.message);
      }
    }
  };

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-500">Erreur : {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Gestion des utilisateurs</h1>
      <button
        onClick={() => router.push('/users/create')}
        className="mb-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Créer un nouvel utilisateur
      </button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
    </div>
  );
}