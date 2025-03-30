import { create } from 'zustand';

interface FavoCoins {
    favoriteCoins: any; // Substitua 'any' pelo tipo correto dos dados armazenados
    setFavoriteCoinsItems: (items: any) => void;
}

const useFavoriteCoinsContext = create<FavoCoins>((set) => ({
  favoriteCoins: [],
  setFavoriteCoinsItems: (items) => set({ favoriteCoins: items }),
}));

export default useFavoriteCoinsContext;
