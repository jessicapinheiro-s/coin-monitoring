import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getCoinInfoById } from "../api-coin-gecko/api-requests";
import { CoinInfoProps } from "../types/coinsTypes";



export default function CoinInfoPage() {
  const [paramsSearch] = useSearchParams();
  const idItem = paramsSearch.get("id");
  const [infoThisCoin, setThisCoinInfo] = useState<CoinInfoProps | undefined>();

  const itemInfo = async () => {
    if (idItem) {
      const respondeInfo = await getCoinInfoById(idItem);
      setThisCoinInfo(respondeInfo);
    };
  }
  useEffect(() => {
    itemInfo();
  }, [])
  console.log(infoThisCoin)

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="w-full">
        <div className="grid grid-rows-[30%_30%_1fr] grid-cols-5 gap-4 border p-4 ">
          <div className="rounded-xl flex flex-col items-center justify-center col-span-1 row-span-1 border">
            {infoThisCoin?.image?.small && (
              <div>
                <img src={infoThisCoin.image.large} alt={infoThisCoin?.name || 'Coin Image'} />
              </div>
            )}
            <div>{infoThisCoin?.name}</div>
          </div>

          <div className="rounded-xl border flex flex-col items-center justify-center col-span-2 row-span-1">
            <ul>
              <li>Maior preço (24h): {infoThisCoin?.market_data?.high_24h?.usd ?? 'N/A'} USD</li>
              <li>Menor preço (24h): {infoThisCoin?.market_data?.low_24h?.usd ?? 'N/A'} USD</li>
            </ul>
          </div>

          <div className="rounded-xl border flex flex-col items-center col-span-1 justify-center row-span-1">
            <ul>
              <li>Preço atual: {infoThisCoin?.market_data?.current_price?.usd ?? 'N/A'} USD</li>
              <li>Market Cap: {infoThisCoin?.market_data?.market_cap?.usd ?? 'N/A'} USD</li>
            </ul>
          </div>
          <div className="rounded-xl border flex items-center justify-center row-span-1 col-span-1">
            <p>Variação (24h): {infoThisCoin?.market_data?.price_change_percentage_24h ?? 'N/A'}%</p>
          </div>
          <div className="rounded-xl border col-span-3 row-span-1 p-2">
            <div className="hidden" dangerouslySetInnerHTML={{ __html: infoThisCoin?.description?.en ?? '' }} />
          </div>
          <div className="rounded-xl border col-span-1 row-span-1">
            <ul>
              <li>Last grande price: {infoThisCoin?.market_data.ath.usd}</li>
              <li>Last menor price: {infoThisCoin?.market_data.atl.usd}</li>
            </ul>
          </div>
          <div className="rounded-xl border col-span-1 row-span-1 grid-rows-auto">
            <ul>
              {(infoThisCoin?.categories ?? []).map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border col-span-5">
            Grafico
          </div>
        </div>
      </div>

    </div >
  )
}

