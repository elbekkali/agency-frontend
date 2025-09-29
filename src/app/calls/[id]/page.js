'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import CallForm from '@/components/CallForm';

export default function EditCall() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'agent')) router.push('/dashboard');
    else fetchCall();
  }, [user, router, id]);

  const fetchCall = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    });
    if (response.ok) setInitialData(await response.json());
  };

  const handleSave = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) router.push('/calls');
  };

  if (!initialData) return <div>Chargement...</div>;

  return <CallForm onSave={handleSave} initialData={initialData} />;
}