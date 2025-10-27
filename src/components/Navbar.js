'use client';

import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, LogIn, User, Phone, Home } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/', label: 'Accueil', icon: <Home className="w-4 h-4" /> },
    { href: '/users', label: 'Utilisateurs', icon: <User className="w-4 h-4" /> },
    { href: '/calls', label: 'Appels', icon: <Phone className="w-4 h-4" /> },
  ];

  const getInitials = (name, email) => {
    if (!name && !email) return '?';
    const parts = (name || email).split(' ');
    if (parts.length >= 2)
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    return parts[0][0].toUpperCase();
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl sticky top-0 z-50 backdrop-blur-md border-b border-blue-400/30"
    >
      <div className="container mx-auto flex justify-between items-center px-8 py-5">
        {/* 🟦 Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight hover:text-blue-100 transition"
        >
          Agency
        </Link>

        {/* 🔗 Liens */}
        {user && (
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium ${
                  pathname === link.href
                    ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1'
                    : 'text-blue-100 hover:text-white'
                } transition duration-200`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* 👤 Zone droite */}
        <div className="flex items-center gap-5">
          {user ? (
            <>
              {/* Avatar utilisateur */}
              <div className="relative">
                {user.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    alt="Profil"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover cursor-pointer hover:scale-105 transition"
                    onClick={() => router.push('/profile')}
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center font-semibold cursor-pointer hover:bg-white/30 transition"
                    onClick={() => router.push('/profile')}
                  >
                    {getInitials(user.first_name || '', user.email || '')}
                  </div>
                )}
              </div>

              {/* Bouton déconnexion */}
              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition"
            >
              <LogIn className="w-4 h-4" />
              Connexion
            </Link>
          )}
        </div>
      </div>

      {/* 🌐 Barre mobile */}
      {user && (
        <div className="md:hidden border-t border-blue-400/40 bg-blue-700/90 backdrop-blur-sm">
          <div className="flex justify-around py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center text-xs ${
                  pathname === link.href
                    ? 'text-yellow-300'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
