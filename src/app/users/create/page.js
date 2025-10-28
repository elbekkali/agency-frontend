'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import UserForm from '@/components/UserForm';

export default function CreateUser() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirection si non admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSave = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push('/users');
    }
  };

  // Pas de initialData → null
  return <UserForm key="create-user" onSave={handleSave} initialData={null} />;
}
