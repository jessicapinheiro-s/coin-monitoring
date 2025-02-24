import { Route, Routes } from 'react-router-dom'
import PrincipaisCoinsPage from './pages/Pincipais-coins'
import AllCoins from './pages/All-Coins'
import About from './pages/About'
import CoinInfoPage from './pages/Coin-Info-Page'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrincipaisCoinsPage />} />
        <Route path="/About" element={< About/>} />
        <Route path="/All-Coins" element={<AllCoins />} />
        <Route path="/Coin-Info-Page" element={<CoinInfoPage />} />
      </Routes>
    </>
  )
}

export default App
