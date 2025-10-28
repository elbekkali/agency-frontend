'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import axios from 'axios';

const ReferenceContext = createContext({
  callTypeQueries: [],
  methodOfReplyOptions: [],
  responseStatuses: [],
  users: [],
  refreshReferences: () => Promise.resolve(),
});

// Comparaison simple et fiable (renommé avec _ pour éviter l'erreur ESLint)
const _isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Helper sûr pour lire le token côté client
const getAccessToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('access_token');
  } catch {
    return null;
  }
};

export function ReferenceProvider({ children }) {
  const [callTypeQueries, setCallTypeQueries] = useState([]);
  const [methodOfReplyOptions, setMethodOfReplyOptions] = useState([]);
  const [responseStatuses, setResponseStatuses] = useState([]);
  const [users, setUsers] = useState([]);

  // Évite le fetch avant le montage (anti-hydration issues)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Token mémoïsé (recalculé au montage et lors du refresh)
  const token = useMemo(() => (mounted ? getAccessToken() : null), [mounted]);

  // Anti-double requêtes
  const inFlightRef = useRef(false);

  const refreshReferences = useCallback(async () => {
    setTokenVersion((v) => v + 1);
  }, []);

  const fetchAll = useCallback(async () => {
    const accessToken = getAccessToken();
    if (!mounted || !accessToken) return;

    if (inFlightRef.current) return;
    inFlightRef.current = true;

    try {
      const headers = { Authorization: `Bearer ${accessToken}` };

      const [queriesRes, methodsRes, statusesRes, usersRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/call-type-queries/`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/method-of-reply-options/`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/response-statuses/`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/?include_inactive=true`, { headers }),
      ]);

      setCallTypeQueries((prev) => (_isEqual(prev, queriesRes.data) ? prev : queriesRes.data));
      setMethodOfReplyOptions((prev) => (_isEqual(prev, methodsRes.data) ? prev : methodsRes.data));
      setResponseStatuses((prev) => (_isEqual(prev, statusesRes.data) ? prev : statusesRes.data));
      setUsers((prev) => (_isEqual(prev, usersRes.data) ? prev : usersRes.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        // Token expiré ou absent → on ne fait rien
      } else {
        console.error('Failed to fetch references:', err);
      }
    } finally {
      inFlightRef.current = false;
    }
  }, [mounted]);

  // Premier chargement si token présent
  useEffect(() => {
    if (!token) return;
    fetchAll();
  }, [token, fetchAll]);

  // Rechargement quand l’onglet devient visible
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && getAccessToken()) {
        fetchAll();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [fetchAll]);

  // Écoute des changements de localStorage (login dans un autre onglet)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'access_token' && e.newValue) {
        fetchAll();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [fetchAll]);

  // Valeur du contexte mémoïsée
  const value = useMemo(
    () => ({
      callTypeQueries,
      methodOfReplyOptions,
      responseStatuses,
      users,
      refreshReferences,
    }),
    [callTypeQueries, methodOfReplyOptions, responseStatuses, users, refreshReferences]
  );

  return <ReferenceContext.Provider value={value}>{children}</ReferenceContext.Provider>;
}

export const useReference = () => useContext(ReferenceContext);
