import Sidebar from "./components/Sidebar";


export default function Home() {
  return (
    <div>
    <Sidebar header='Home' sideList={['Home', 'Notes', 'Flashcards', 'Profile']}></Sidebar>
    </div>
  );
}
