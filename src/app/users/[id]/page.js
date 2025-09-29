'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import UserForm from '@/components/UserForm';

export default function EditUser() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') router.push('/dashboard');
    else fetchUser();
  }, [user, router, id]);

  const fetchUser = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    });
    if (response.ok) setInitialData(await response.json());
  };

  const handleSave = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) router.push('/users');
  };

  if (!initialData) return <div>Chargement...</div>;

  return <UserForm onSave={handleSave} initialData={initialData} />;
}