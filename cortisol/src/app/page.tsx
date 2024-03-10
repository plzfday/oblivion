'use client';

import Sidebar from './components/Sidebar';
import Advertisements from '@/app/components/Advertisements';
import { useUserState } from './context/AuthContext';

export default function Home() {
  const { user } = useUserState();

  return (
    <div>
      <Sidebar header='Home' isLoggedIn={Boolean(user)}>
        <Advertisements />
      </Sidebar>
    </div>
  );
}
