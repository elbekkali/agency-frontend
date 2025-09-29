// src/app/calls/create/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import CallForm from '@/components/CallForm';

export default function CreateCall() {
  const { user } = useAuth();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);

  if (!user || (user.role !== 'admin' && user.role !== 'agent')) router.push('/dashboard');

  const handleSave = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls/`, {
      method: 'POST',
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