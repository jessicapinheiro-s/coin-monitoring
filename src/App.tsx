import { Route, Routes } from 'react-router-dom'
import PrincipaisCoinsPage from './pages/Pincipais-coins'
import AllCoins from './pages/All-Coins'
import About from './pages/About'
import CoinInfoPage from './pages/Coin-Info-Page'
import FavoriteCoins from './pages/Favorite-Coins'
import { useEffect } from 'react'
import useFavoriteCoinsContext from './shared/favCoins'

function App() {
  const { setFavoriteCoinsItems } = useFavoriteCoinsContext();

  useEffect(()  => {
   const favoriteItemsFormLocalStorage = JSON.parse(localStorage.getItem('favoriteCoins') || '[]');

    setFavoriteCoinsItems(favoriteItemsFormLocalStorage);
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<PrincipaisCoinsPage />} />
        <Route path="/About" element={< About/>} />
        <Route path="/All-Coins" element={<AllCoins />} />
        <Route path="/Favorite-Coins" element={<FavoriteCoins />} />
        <Route path="/Coin-Info-Page" element={<CoinInfoPage />} />
      </Routes>
    </>
  )
}

export default App
