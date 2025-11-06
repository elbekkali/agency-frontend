'use client';

import { useRouter } from 'next/navigation';
import { mockVisaSaoudit } from '@/lib/mockVisa';
import VisaForm from '@/components/VisaForm';

export default function CreateVisa() {
  const router = useRouter();

  const handleSave = (data) => {
    mockVisaSaoudit.push({
      id: mockVisaSaoudit.length + 1,
      ...data,
    });
    router.push('/visa-saoudit');
  };

  return <VisaForm initialData={null} onSave={handleSave} />;
}
