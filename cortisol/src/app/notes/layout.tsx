'use client';

import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const getNotes = async () => {
  return ['2024-02-01', '2024-01-31', '2024-01-30', '2024-01-29'];
};

type NoteProps = {
  children: React.ReactNode;
};

export default function Note({ children }: NoteProps) {
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    getNotes().then((notes) => {
      setNotes(notes);
    });
  }, []);

  const handleAddNote = () => {
    const today = new Date().toISOString().split('T')[0];
    if (notes.includes(today)) return;
    setNotes([today, ...notes]);
    redirect('/notes/' + today);
  };

  return (
    <Sidebar
      header={'Today I Learned'}
      sideList={notes}
      links={notes.map((x) => '/notes/' + x)}
      isLoggedIn={true}
    >
      <Navigation handleAddNote={handleAddNote} />
      {children}
    </Sidebar>
  );
}
