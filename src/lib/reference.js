// src/lib/reference.js
'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import axios from 'axios';

const ReferenceContext = createContext({
  callTypeQueries: [],
  methodOfReplyOptions: [],
  responseStatuses: [],
  users: [],
  refreshReferences: () => Promise.resolve(),
});

// Comparaison simple et fiable pour éviter des setState inutiles
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

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

  // Token mémoïsé (recalculé au montage et lorsqu’on le rafraîchit via refreshReferences)
  const [tokenVersion, setTokenVersion] = useState(0);
  const token = useMemo(() => (mounted ? getAccessToken() : null), [mounted, tokenVersion]);

  // Anti-double requêtes
  const inFlightRef = useRef(false);

  const refreshReferences = useCallback(async () => {
    // On relit le token à la demande
    setTokenVersion((v) => v + 1);
  }, []);

  const fetchAll = useCallback(async () => {
    const accessToken = getAccessToken();
    if (!mounted || !accessToken) return; // pas de token → pas d'appel

    if (inFlightRef.current) return; // une requête est déjà en cours
    inFlightRef.current = true;

    try {
      const headers = { Authorization: `Bearer ${accessToken}` };

      const [queriesRes, methodsRes, statusesRes, usersRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/call-type-queries/`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/method-of-reply-options/`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/response-statuses/`, { headers }),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/?include_inactive=true`, { headers }),
      ]);

      setCallTypeQueries((prev) => (isEqual(prev, queriesRes.data) ? prev : queriesRes.data));
      setMethodOfReplyOptions((prev) => (isEqual(prev, methodsRes.data) ? prev : methodsRes.data));
      setResponseStatuses((prev) => (isEqual(prev, statusesRes.data) ? prev : statusesRes.data));
      setUsers((prev) => (isEqual(prev, usersRes.data) ? prev : usersRes.data));
    } catch (err) {
      // Si 401 → on ne relance rien ici (pas de boucle)
      if (err?.response?.status === 401) {
        // Optionnel: console.warn('ReferenceProvider: 401, token absent/expiré – fetch ignoré.');
      } else {
        console.error('Failed to fetch references:', err);
      }
    } finally {
      inFlightRef.current = false;
    }
  }, [mounted]);

  // 1) Premier chargement : uniquement si token présent
  useEffect(() => {
    if (!token) return;
    fetchAll();
  }, [token, fetchAll]);

  // 2) Rechargement quand l’onglet devient actif (utile après login redirection)
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && getAccessToken()) {
        fetchAll();
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [fetchAll]);

  // 3) Écoute des changements de localStorage (login dans un autre onglet)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'access_token' && e.newValue) {
        fetchAll();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [fetchAll]);

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
