// src/lib/reference.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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

        setCallTypeQueries(queriesRes.data);
        setMethodOfReplyOptions(methodsRes.data);
        setResponseStatuses(statusesRes.data);
        setUsers(usersRes.data);
      } catch (error) {
        console.error('Failed to fetch references:', error);
      }
    };

    const token = localStorage.getItem('access_token');
    if (token) {
      fetchReferences();
    }
  }, []);

  return (
    <ReferenceContext.Provider value={{ callTypeQueries, methodOfReplyOptions, responseStatuses, users }}>
      {children}
    </ReferenceContext.Provider>
  );
}

export const useReference = () => useContext(ReferenceContext);