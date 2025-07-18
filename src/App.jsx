import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import NotesPopup from './components/NotesPopup'

function App() {

  return (
    <>
      <div className="min-h-screen bg-zinc-900 text-white">
      <Header />
      <HeroSection />
      <NotesPopup />
    </div>
    </>
  )
}

export default App
