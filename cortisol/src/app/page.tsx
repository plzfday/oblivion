import Sidebar from "./components/Sidebar";
import Advertisements from "@/app/components/Advertisements";


export default function Home() {
  return (
    <div>
    <Sidebar header='Home' sideList={['Home', 'Notes', 'Flashcards', 'Profile']}>
        <Advertisements />
    </Sidebar>
    </div>
  );
}
