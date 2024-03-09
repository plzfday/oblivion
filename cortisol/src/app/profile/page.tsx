import DateCalendarValue from '../components/Calendar';
import Sidebar from '../components/Sidebar';
import Achievement from "@/app/components/Achievement";

export default function Note() {
  return (
    <Sidebar header={'User Profile'} sideList={['Home', 'Notes', 'Flashcards', 'Profile']}>
        <Achievement/>
        <DateCalendarValue/>
    </Sidebar>
  );
}