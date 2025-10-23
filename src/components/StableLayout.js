'use client';

import Navbar from '@/components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StableLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
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
    </>
  );
}
