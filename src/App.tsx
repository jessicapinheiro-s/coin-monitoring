import { Route, Routes } from 'react-router-dom'
import PrincipaisCoinsPage from './pages/Pincipais-coins'
import AllCoins from './pages/All-Coins'
import About from './pages/About'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrincipaisCoinsPage />} />
        <Route path="/About" element={< About/>} />
        <Route path="/All-Coins" element={<AllCoins />} />
      </Routes>
    </>
  )
}

export default App
