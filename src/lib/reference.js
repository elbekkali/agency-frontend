// src/lib/reference.js
'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Fonction utilitaire pour comparer profondément deux tableaux/objets
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const ReferenceContext = createContext();

export function ReferenceProvider({ children }) {
  const [callTypeQueries, setCallTypeQueries] = useState([]);
  const [methodOfReplyOptions, setMethodOfReplyOptions] = useState([]);
  const [responseStatuses, setResponseStatuses] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const [queriesRes, methodsRes, statusesRes, usersRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/call-type-queries/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/method-of-reply-options/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/response-statuses/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/?include_inactive=true`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          }),
        ]);

        // Mettre à jour l'état uniquement si les données ont changé
        setCallTypeQueries((prev) => (isEqual(prev, queriesRes.data) ? prev : queriesRes.data));
        setMethodOfReplyOptions((prev) => (isEqual(prev, methodsRes.data) ? prev : methodsRes.data));
        setResponseStatuses((prev) => (isEqual(prev, statusesRes.data) ? prev : statusesRes.data));
        setUsers((prev) => (isEqual(prev, usersRes.data) ? prev : usersRes.data));
      } catch (error) {
        console.error('Failed to fetch references:', error);
      }
    };

    const token = localStorage.getItem('access_token');
    if (token) {
      fetchReferences();
    }
  }, []);

  // 🧠 useMemo pour stabiliser les références
  const value = useMemo(
    () => ({
      callTypeQueries,
      methodOfReplyOptions,
      responseStatuses,
      users,
    }),
    [callTypeQueries, methodOfReplyOptions, responseStatuses, users]
  );

  if (!callTypeQueries.length && !users.length) {
    return <div className="text-center py-20 text-gray-500">Chargement des références...</div>;
  }

  return (
    <ReferenceContext.Provider value={value}>
      {children}
    </ReferenceContext.Provider>
  );
}

export const useReference = () => useContext(ReferenceContext);