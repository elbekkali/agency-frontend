import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/lib/auth';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100" suppressHydrationWarning={true}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}