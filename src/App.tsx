import { Route, Routes } from 'react-router-dom'
import PrincipaisCoinsPage from './pages/Pincipais-coins'
import AllCoins from './pages/All-Coins'
import About from './pages/About'

function App() {
  return (
    <>
      <PrincipaisCoinsPage />
      <Routes>
        <Route path="/" element={<PrincipaisCoinsPage />} />
        <Route path="/About" element={<AllCoins />} />
        <Route path="/All-Coins" element={<About />} />
      </Routes>
    </>
  )
}

export default App
