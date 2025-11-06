'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { mockVisaSaoudit } from '@/lib/mockVisa';
import VisaForm from '@/components/VisaForm';

export default function EditVisa() {
  const router = useRouter();
  const { id } = useParams();

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const loadVisa = () => {
      const visa = mockVisaSaoudit.find((v) => v.id === Number(id));
      setInitialData(visa || null);
    };

    loadVisa();
  }, [id]);

  const handleSave = (data) => {
    // Mise à jour dans le mock
    const index = mockVisaSaoudit.findIndex((v) => v.id === Number(id));
    if (index !== -1) {
      mockVisaSaoudit[index] = { ...mockVisaSaoudit[index], ...data };
    }
    router.push('/visa-saoudit');
  };

  if (!initialData) return <div className="p-6">Chargement...</div>;

  return <VisaForm initialData={initialData} onSave={handleSave} />;
}
