import DateCalendarValue from '../components/Calendar';
import Sidebar from '../components/Sidebar';
import Achievement from "@/app/components/Achievement";

export default function Note() {
  return (
    <Sidebar header={'User Profile'} isLoggedIn={true}>
       <Achievement/>
      <DateCalendarValue />
    </Sidebar>
  );
}
