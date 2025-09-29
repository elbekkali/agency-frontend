'use client';

import { useAuth } from '@/lib/auth';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Agency</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Bonjour, {user.email}</span>
              <button onClick={logout} className="bg-red-500 p-2 rounded-md hover:bg-red-600">
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-green-500 p-2 rounded-md hover:bg-green-600">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}