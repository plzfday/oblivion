'use client';

import { Box } from '@mui/material';
import DateCalendarValue from '../components/Calendar';
import Sidebar from '../components/Sidebar';
import StatisticsModal from '../components/StatisticsModal';

export default function Note() {

  return (
    <Sidebar header={'User Profile'} isLoggedIn={true}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <DateCalendarValue/>
        <StatisticsModal/>
      </Box>
    </Sidebar>
  );
}