import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';

export default function Note() {
  return (
    <Sidebar header={'Today I Learned'}>
      <Navigation />
    </Sidebar>
  );
}
