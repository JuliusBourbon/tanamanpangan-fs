import Navbar from './pages/Navbar';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <LandingPage />
    </div>
  );
}