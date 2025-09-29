'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import CallForm from '@/components/CallForm';

export default function CreateCall({ params }) {
  const { user } = useAuth();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);

  if (!user || (user.role !== 'admin' && user.role !== 'agent')) router.push('/dashboard');

  const handleSave = async (data) => {
    const url = initialData ? `${process.env.NEXT_PUBLIC_API_URL}/calls/${initialData.id}` : `${process.env.NEXT_PUBLIC_API_URL}/calls/`;
    const method = initialData ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) router.push('/calls');
  };

  return <CallForm onSave={handleSave} initialData={initialData} />;
}