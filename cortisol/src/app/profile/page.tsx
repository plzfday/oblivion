import DateCalendarValue from '../components/Calendar';
import Sidebar from '../components/Sidebar';

export default function Note() {
  return (
    <Sidebar header={'User Profile'} isLoggedIn={true}>
        <DateCalendarValue/>
    </Sidebar>
  );
}