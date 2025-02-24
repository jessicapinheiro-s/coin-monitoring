import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getCoinInfoById } from "../api-coin-gecko/api-requests";

export default function CoinInfoPage() {
  const [paramsSearch, setSearchParams] = useSearchParams();
  const idItem = paramsSearch.get("id");
  const [infoThisCoin, setThisCoinInfo] = useState();

  const itemInfo = async () => {
    if (idItem) {
      const respondeInfo = await getCoinInfoById(idItem);
      setThisCoinInfo(respondeInfo);
    };
  }
  useEffect(() => {
    itemInfo();
  }, [])

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <div className="w-full">
        <div className="grid grid-rows-3 grid-cols-5">
        </div>
      </div>
    </div >
  )
}

