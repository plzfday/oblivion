import DateCalendarValue from '../components/Calendar';
import Sidebar from '../components/Sidebar';

export default function Note() {
  return (
    <Sidebar header={'User Profile'} sideList={['Home', 'Notes', 'Flashcards', 'Profile', 'Statistics']}>
        <DateCalendarValue/>
    </Sidebar>
  );
}

