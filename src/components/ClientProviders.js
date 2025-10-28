'use client';

import { useLayoutEffect, useState } from 'react';
import { AuthProvider } from '@/lib/auth';
import { ReferenceProvider } from '@/lib/reference';
import AnimatedMain from '@/components/AnimatedMain';
import StableLayout from '@/components/StableLayout';

export default function ClientProviders({ children }) {
  const [mounted, setMounted] = useState(false);

  // useLayoutEffect pour éviter le flash
  useLayoutEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

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
