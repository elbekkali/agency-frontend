// src/app/layout.js
import '../styles/globals.css';
import ClientProviders from '@/components/ClientProviders';

export const metadata = {
  title: 'Agency Dashboard',
  description: 'Application de gestion Agency',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-800 antialiased">
        <ClientProviders>
          {/* ⚡ Plein écran réel */}
          <div className="w-screen overflow-x-hidden">
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
