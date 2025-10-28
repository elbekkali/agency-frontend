'use client';

import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, LogIn, User, Phone, Home } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/', label: 'Accueil', icon: <Home className="h-4 w-4" /> },
    { href: '/users', label: 'Utilisateurs', icon: <User className="h-4 w-4" /> },
    { href: '/calls', label: 'Appels', icon: <Phone className="h-4 w-4" /> },
  ];

  const getInitials = (firstName, lastName, email) => {
    if (firstName && lastName) {
      return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    }
    if (firstName) return firstName[0].toUpperCase();
    if (email) return email[0].toUpperCase();
    return '?';
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-blue-400/30 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl backdrop-blur-md"
    >
      <div className="container mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight transition hover:text-blue-100"
        >
          Agency
        </Link>

        {/* Liens Desktop */}
        {user && (
          <div className="hidden gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium transition duration-200 ${
                  pathname === link.href
                    ? 'border-b-2 border-yellow-300 pb-1 text-yellow-300'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Zone droite */}
        <div className="flex items-center gap-5">
          {user ? (
            <>
              {/* Avatar */}
              <div
                className="relative h-10 w-10 cursor-pointer"
                onClick={() => router.push('/profile')}
              >
                {user.profile_picture ? (
                  <Image
                    src={user.profile_picture}
                    alt="Profil"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white object-cover shadow-md transition hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-semibold text-white transition hover:bg-white/30">
                    {getInitials(user.first_name || '', user.last_name || '', user.email || '')}
                  </div>
                )}
              </div>

              {/* Déconnexion */}
              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold shadow-md transition hover:bg-red-600 hover:shadow-lg"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold shadow-md transition hover:bg-green-600 hover:shadow-lg"
            >
              <LogIn className="h-4 w-4" />
              Connexion
            </Link>
          )}
        </div>
      </div>

      {/* Barre mobile */}
      {user && (
        <div className="border-t border-blue-400/40 bg-blue-700/90 backdrop-blur-sm md:hidden">
          <div className="flex justify-around py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center text-xs transition ${
                  pathname === link.href ? 'text-yellow-300' : 'text-blue-100 hover:text-white'
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
