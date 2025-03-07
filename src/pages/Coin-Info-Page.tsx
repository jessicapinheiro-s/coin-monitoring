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
      <div className="w-full flex flex-col justify-center items-center">
        <div className="lg:w-[80%] sm:w-[100%]">
          <div className="
              grid 
              sm:grid-cols-2  /* 📌 Garante 2 colunas no mobile */
              md:grid-cols-3 
              lg:grid-cols-5 
              gap-4 
              border 
              p-4
            ">
            {/* 1º Item */}
            <div className="p-4 rounded-xl flex flex-col items-center justify-center border col-span-2 lg:col-span-1">
              {infoThisCoin?.image?.small && (
                <div>
                  <img className="w-[80px]" src={infoThisCoin.image.large} alt={infoThisCoin?.name || 'Coin Image'} />
                </div>
              )}
              <div>{infoThisCoin?.name}</div>
            </div>

            {/* 3º Item */}
            <div className="p-4 rounded-xl border flex flex-col items-start justify-center col-span-1">
              <ul>
                <li className="text-[29px] font-bold">{`$${(infoThisCoin?.market_data?.current_price?.usd) ?? 'N/A'}`}</li>
              </ul>
            </div>

            {/* 2º Item */}
            <div className="p-4 rounded-xl border flex flex-col items-start justify-start col-span-1">
              <ul>
                <li>Highest price (24h): {`$${infoThisCoin?.market_data?.high_24h?.usd ?? 'N/A'}`}</li>
                <li>Lowest price (24h): {`$${infoThisCoin?.market_data?.low_24h?.usd ?? 'N/A}'}`}</li>
              </ul>
            </div>



            {/* 4º Item */}
            <div className="p-4 rounded-xl border flex items-start justify-start">
              <ul>
                <li>Change (24h): {infoThisCoin?.market_data?.price_change_percentage_24h ?? 'N/A'}%</li>
                <li>Market Capitalization: {infoThisCoin?.market_data?.market_cap?.usd ?? 'N/A'} USD</li>
              </ul>

            </div>

            {/* 5º Item */}
            <div className="p-4 rounded-xl border flex flex-col items-start justify-start">
              <ul>
                <li>Highest last price: {infoThisCoin?.market_data.ath.usd}</li>
                <li>Lowest last price: {infoThisCoin?.market_data.atl.usd}</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border col-span-1 row-span-1 lg:col-span-3 md:col-span-2 flex flex-col items-center justify-start">
              <div className="h-full overflow-hidden" dangerouslySetInnerHTML={{ __html: infoThisCoin?.description?.en ?? '' }} />
            </div>

            {/* 6º Item */}
            <div className="p-4 rounded-xl border col-span-1 md:col-span-1 flex flex-col items-start justify-start lg:items-center lg:col-span-2">
              <ul>
                {(infoThisCoin?.categories ?? []).map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>

            {/* 🔥 Última linha ocupando 2 colunas no mobile */}
            <div className="p-4 rounded-xl border col-span-2 md:col-span-3 lg:col-span-5">
              Grafico
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

