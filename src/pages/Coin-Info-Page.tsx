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
 
  const formatToCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const defineColorChangePricePercentage = (infoThisCoin?.market_data?.price_change_percentage_24h ?? 0).toString().includes('-') ? 'text-red-500' : 'text-green-500';
  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="w-full flex flex-col justify-center items-center">
        <div className="lg:w-[80%] sm:w-[100%]">
          <div className="
              grid 
              sm:grid-cols-2  
              md:grid-cols-3 
              lg:grid-cols-5 
              gap-4 
              border 
              p-4
              grid-rows-[10%_10%_10%_30%_1fr] 
              md:grid-rows-[20%_20%_25%_1fr]
              lg:grid-rows-[30%_30%_1fr]
            ">
            {/* 1º Item */}
            <div className="p-4 rounded-xl flex flex-col items-center justify-center border col-span-2 lg:col-span-1 lg:items-center lg:justify-center">
              {infoThisCoin?.image?.small && (
                <div>
                  <img className="w-[80px]" src={infoThisCoin.image.large} alt={infoThisCoin?.name || 'Coin Image'} />
                </div>
              )}
              <div>{infoThisCoin?.name}</div>
            </div>

            {/* 3º Item */}
            <div className="p-4 rounded-xl border flex flex-col items-start justify-center col-span-1 lg:items-center lg:justify-center">
              <ul>
                <li className="text-[29px] font-bold">{`${formatToCurrency(infoThisCoin?.market_data?.current_price?.usd ?? 0)}`}</li>
              </ul>
            </div>

            {/* 2º Item */}
            <div className="p-4 rounded-xl border flex flex-col items-start justify-start col-span-1 lg:items-center lg:justify-center">
              <ul>
                <li>
                  <p className="text-[12px]">Highest price (24h):</p>
                  <p className="font-bold">{`${formatToCurrency(infoThisCoin?.market_data?.high_24h?.usd ?? 0)}`}</p>
                </li>
                <li>
                  <p className="text-[12px]">Lowest price (24h):</p>
                  <p className="font-bold">{`${formatToCurrency(infoThisCoin?.market_data?.low_24h?.usd ?? 0)}`}</p></li>
              </ul>
            </div>



            {/* 4º Item */}
            <div className="p-4 rounded-xl border flex items-start justify-start lg:items-center lg:justify-center">
              <ul>
                <li>
                  <p className="text-[12px]">Change (24h):</p>
                  <p className={`${defineColorChangePricePercentage} font-bold`}>{`${formatToCurrency(infoThisCoin?.market_data?.price_change_percentage_24h ?? 0)}`}%</p></li>
                <li>
                  <p className="text-[12px]">Market Capitalization:</p>
                  <p className="font-bold">{`${formatToCurrency(infoThisCoin?.market_data?.market_cap?.usd ?? 0)}`}</p> </li>
              </ul>

            </div>

            {/* 5º Item */}
            <div className="p-4 rounded-xl border flex flex-col items-start justify-start lg:items-center lg:justify-center">
              <ul>
                <li>
                  <p className="text-[12px]">Highest last price:</p>
                  <p className="font-bold">{`${formatToCurrency(infoThisCoin?.market_data.ath.usd ?? 0)}`}</p></li>
                <li>
                  <p className="text-[12px]">Lowest last price:</p>
                  <p className="font-bold">{`${formatToCurrency(infoThisCoin?.market_data.atl.usd ?? 0)}`}</p></li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border col-span-1 row-span-1 lg:col-span-3 md:col-span-2 flex flex-col items-center justify-start lg:items-center lg:justify-center">
              <div className="h-full overflow-y-scroll break-words" dangerouslySetInnerHTML={{ __html: infoThisCoin?.description?.en ?? '' }} />
            </div>

            {/* 6º Item */}
            <div className="p-4 rounded-xl border col-span-1 md:col-span-1 flex flex-col items-start justify-start  lg:col-span-2 lg:items-center lg:justify-center">
              <ul className="w-full list-item h-full overflow-y-scroll">
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

