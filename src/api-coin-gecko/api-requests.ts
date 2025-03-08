
export async function getAllCoins() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/list"
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

export async function getPopularCoins(currency: string, qtd: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=${qtd}`
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

export async function getCoinInfoById(id: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

export async function getLastDaysPrice(id: string, days: number, currency: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}


