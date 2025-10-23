'use client';

import { useEffect, useState } from 'react';
import { AuthProvider } from '@/lib/auth';
import { ReferenceProvider } from '@/lib/reference';
import AnimatedMain from '@/components/AnimatedMain';
import StableLayout from '@/components/StableLayout';

export default function ClientProviders({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <AuthProvider>
      <ReferenceProvider>
        <StableLayout>
          <AnimatedMain>{children}</AnimatedMain>
        </StableLayout>
      </ReferenceProvider>
    </AuthProvider>
  );
}
