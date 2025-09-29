'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import CallTable from '@/components/CallTable';

export default function Calls() {
  const { user } = useAuth();
  const router = useRouter();
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'agent')) router.push('/dashboard');
    else fetchCalls();
  }, [user, router]);

  const fetchCalls = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/calls/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    });
    if (response.ok) setCalls(await response.json());
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Gestion des appels</h1>
      <button
        onClick={() => router.push('/calls/create')}
        className="mb-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Créer un nouvel appel
      </button>
      <CallTable calls={calls} onEdit={(id) => router.push(`/calls/${id}`)} />
    </div>
  );
}