import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getCoinInfoById } from "../api-coin-gecko/api-requests";
import { CoinInfoProps } from "../types/coinsTypes";



export default function CoinInfoPage() {
  const [paramsSearch, setSearchParams] = useSearchParams();
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
        <div className="grid grid-rows-3 grid-cols-5 border">
          <div className="flex flex-col items-center justify-center col-span-5">
            {infoThisCoin?.image?.small && (
              <div>
                <img src={infoThisCoin.image.large} alt={infoThisCoin?.name || 'Coin Image'} />
              </div>
            )}
            <div>{infoThisCoin?.name}</div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: infoThisCoin?.description?.en ?? '' }} />

          <div>
            <ul>
              {(infoThisCoin?.categories ?? []).map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>

          <div>
            <p>Price (dollar): {infoThisCoin?.market_data?.current_price?.usd ?? 'N/A'}</p>
          </div>

          {/* Células vazias da grade */}
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

    </div >
  )
}

