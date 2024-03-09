import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navigation';

export default function Note() {
  return (
    <Sidebar header={'Today I Learned'} sideList={['2024-02-01', '2024-01-31', '2024-01-30', '2024-01-29']}>
      <Navigation />
    </Sidebar>
  );
}
