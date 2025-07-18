import './App.css'
import FloatingCalculator from './components/Floatingcalculator'
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
      <FloatingCalculator />
    </div>
    </>
  )
}

export default App
