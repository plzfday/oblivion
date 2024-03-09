import Image from "next/image";
import Sidebar from "./components/Sidebar";
import Advertisement from "./components/Advertisement";

export default function Home() {
  return (
    <div>
    <Sidebar header='Home' sideList={['Home', 'Notes', 'Flashcards', 'Profile']}></Sidebar>
    </div>
  );
}
