'use client';

import { useEffect, useState } from 'react';
import { AuthProvider } from '@/lib/auth';
import { ReferenceProvider } from '@/lib/reference';
import Navbar from '@/components/Navbar';
import AnimatedMain from '@/components/AnimatedMain';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientProviders({ children }) {
  // ✅ on attend que le composant soit monté pour éviter le mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <AuthProvider>
      <ReferenceProvider>
        <Navbar />
        <AnimatedMain>{children}</AnimatedMain>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          toastStyle={{
            borderRadius: '10px',
            fontSize: '0.9rem',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          }}
        />

        <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-200 mt-8">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-blue-600">Agency</span>. Tous droits réservés.
        </footer>
      </ReferenceProvider>
    </AuthProvider>
  );
}
