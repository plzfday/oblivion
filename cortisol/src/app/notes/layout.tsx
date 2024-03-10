'use client';

import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserState } from '../context/AuthContext';
import axios from 'axios';
import Cookie from 'js-cookie';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

type NoteProps = {
  children: React.ReactNode;
};

export default function Note({ children }: NoteProps) {
  const [notes, setNotes] = useState<string[]>([]);
  const { user } = useUserState();
  const router = useRouter();

  const getNotes = async () => {
    return axiosClient
      .get('/notes', {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return []; // Return an empty array in case of error
      });
  };

  useEffect(() => {
    getNotes().then((notes) => setNotes(notes));
  }, []);

  const handleAddNote = async () => {
    const today = new Date().toISOString().split('T')[0];
    if (notes.includes(today)) return;
    await axiosClient
      .post(
        '/notes',
        { content: '', summary: '' },
        {
          headers: {
            'X-CSRFToken': Cookie.get('csrftoken') || '',
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
    setNotes([today, ...notes]);
    router.push('/notes/' + today);
  };

  const handleDeleteNote = () => {};

  return (
    <Sidebar
      header={'Today I Learned'}
      sideList={notes}
      links={notes.map((x) => '/notes/' + x)}
      isLoggedIn={true}
    >
      <Navigation
        handleAddNote={handleAddNote}
        handleDeleteNote={handleDeleteNote}
      />
      {children}
    </Sidebar>
  );
}
