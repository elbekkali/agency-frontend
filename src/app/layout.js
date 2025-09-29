// src/app/layout.js (mise à jour pour inclure ReferenceProvider)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/lib/auth';
import { ReferenceProvider } from '@/lib/reference';  // Ajoute ceci

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <AuthProvider>
          <ReferenceProvider>
            <Navbar />
            <main>{children}</main>
            <ToastContainer />
          </ReferenceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}