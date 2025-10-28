'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Connexion réussie !');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Échec de la connexion : ' + error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 hover:shadow-blue-200">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="exemple@mail.com"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 hover:shadow-lg"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          © 2025 <span className="font-semibold text-blue-600">Agency</span>. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
