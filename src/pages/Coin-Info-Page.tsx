import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getCoinInfoById, getLastDaysPrice } from "../api-coin-gecko/api-requests";
import { CoinInfoProps } from "../types/coinsTypes";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import React from "react";
import { CirclePlus, Heart } from "lucide-react";
import useFavoriteCoinsContext from "../shared/favCoins";
interface propsPrice {
  data: string;
  price: string;
  day: string;
}

export default function CoinInfoPage() {
  const [paramsSearch] = useSearchParams();
  const [infoThisCoin, setThisCoinInfo] = useState<CoinInfoProps | undefined>();
  const [infoCoinLastDays, setInfoCoinLastDays] = useState<propsPrice[]>();
  const idItem = paramsSearch.get("id");
  const [isFav, setIsFav] = useState(false);
  const { favoriteCoins, setFavoriteCoinsItems } = useFavoriteCoinsContext();
  const defineColorChangePricePercentage = (infoThisCoin?.market_data?.price_change_percentage_24h ?? 0).toString().includes('-') ? 'text-[#ef4444]' : 'text-[#10B981]';
  const defineColorChangePricePercentageGra = (infoThisCoin?.market_data?.price_change_percentage_24h ?? 0).toString().includes('-') ? '#ef4444' : '#10B981';

  useEffect(() => {
    Chart.register(...registerables);
  },[]);

  const itemInfo = async () => {
    if (idItem) {
      const respondeInfo = await getCoinInfoById(idItem);
      setThisCoinInfo(respondeInfo);
    };
  }

  const itemLastDaysPriceInfo = async () => {
    if (idItem) {
      const responseInfo = await getLastDaysPrice(idItem, 2, 'usd');
      const prices: number[][] = responseInfo.prices;

      const coinsresponseInfoMaped = prices.map(arr => {
        const dataHoursFormated = new Date(arr[0]).toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' });
        const priceFormated = formatToCurrency(arr[1]);
        const dayData = new Date(arr[0]).toLocaleDateString('pt-br', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })
        return {
          data: dataHoursFormated,
          price: priceFormated,
          day: dayData
        }
      })

      setInfoCoinLastDays(coinsresponseInfoMaped);
    };
  }

  useEffect(() => {
    itemInfo();
    itemLastDaysPriceInfo();
  }, [])

  const dataLabels = (lastHoursQtd: number) => {
    const nowDate = new Date();
    let count: number = 0;
    const arrHoursInfo: string[] = [];
    do {
      const hours: string = (nowDate.getHours() - count).toString().length === 1 ? `0${nowDate.getHours() - count}:00` : `${nowDate.getHours() - count}:00`;
      arrHoursInfo.push(hours);
      count += 1;
    } while (count !== lastHoursQtd);

    return arrHoursInfo.reverse();
  };

  const formatToCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const relationDatHour: propsPrice[] = React.useMemo(() => {
    const todayData = infoCoinLastDays?.filter(item => item.day === new Date().toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', year: '2-digit' })) ?? [];
    let itemsFiltered: propsPrice[] = [];

    dataLabels(8).map(itemInfo => {
      const filterdData = todayData.filter(item => ((item.data).split(':')[0]).toString() == ((itemInfo).split(':')[0]).toString());
      itemsFiltered = itemsFiltered.concat(filterdData);
    });
    return itemsFiltered

  }, [infoCoinLastDays]);


  const data = {
    labels: dataLabels(8),
    datasets: [
      {
        label: 'Preço da moeda em questão',
        data: relationDatHour.map(item => parseInt((item?.price).replace('$', '').replace('.', '').replace(',', ''))),

        borderColor: defineColorChangePricePercentageGra,
        borderWidth: 2,
        tension: 0.4, // Deixa a linha mais suave
        pointRadius: 0, // Remove os pontos dos dados

      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#323232' },
      },
      y: {
        grid: { color: '#e5e7eb' },
        ticks: {
          color: '#323232',
          callback: function (value: any) {
            return value;
          },
        },
      },
    },
  };


  const handleFav = () => {
    setIsFav((prev) => !prev);
      if (!(favoriteCoins ?? [])?.includes(idItem)) {
        setFavoriteCoinsItems([...favoriteCoins, idItem]);
      } else {
        setFavoriteCoinsItems(favoriteCoins.filter((item: string) => item !== idItem));
      }

      localStorage.setItem('favoriteCoins', JSON.stringify(favoriteCoins));
  };

  useEffect(() => {console.log(favoriteCoins)}, [favoriteCoins])
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
              lg:grid-rows-[15%_25%_1fr]
            ">
            {/* 1º Item */}
            <div className="p-4 rounded-xl flex flex-col items-center justify-center border col-span-1 lg:col-span-1 lg:items-center lg:justify-center">
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
                  <p className="font-bold text-[20px]">{`${formatToCurrency(infoThisCoin?.market_data?.high_24h?.usd ?? 0)}`}</p>
                </li>
                <li>
                  <p className="text-[12px]">Lowest price (24h):</p>
                  <p className="font-bold text-[20px]">{`${formatToCurrency(infoThisCoin?.market_data?.low_24h?.usd ?? 0)}`}</p></li>
              </ul>
            </div>



            {/* 4º Item */}
            <div className="p-4 rounded-xl border flex items-start justify-start lg:items-center lg:justify-center">
              <ul>
                <li>
                  <p className="text-[12px]">Change (24h):</p>
                  <p className={`${defineColorChangePricePercentage} font-bold text-[20px]`}>{`${formatToCurrency(infoThisCoin?.market_data?.price_change_percentage_24h ?? 0)}`}%</p></li>
                <li>
                  <p className="text-[12px]">Market Capitalization:</p>
                  <p className="font-bold text-[20px]">{`${formatToCurrency(infoThisCoin?.market_data?.market_cap?.usd ?? 0).slice(0, 14)}`}</p> </li>
              </ul>

            </div>

            {/* 5º Item */}
            <div className="p-4 rounded-xl border flex flex-col items-start justify-start lg:items-center lg:justify-center">
              <ul>
                <li>
                  <p className="text-[12px]">Highest last price:</p>
                  <p className="font-bold text-[20px]">{`${formatToCurrency(infoThisCoin?.market_data.ath.usd ?? 0)}`}</p></li>
                <li>
                  <p className="text-[12px]">Lowest last price:</p>
                  <p className="font-bold text-[20px]">{`${formatToCurrency(infoThisCoin?.market_data.atl.usd ?? 0)}`}</p></li>
              </ul>
            </div>
            <div className=" gap-4 p-4 rounded-xl border col-span-1 row-span-1 lg:col-span-3 md:col-span-2 flex flex-col items-start justify-start ">
              <div>
                <h2 className="font-bold text-[20px]">Description</h2>
              </div>
              <div className="h-full overflow-y-scroll break-words" dangerouslySetInnerHTML={{ __html: infoThisCoin?.description?.en ?? '' }} />
            </div>

            {/* 6º Item */}
            <div className="gap-4 p-4 rounded-xl border col-span-1 md:col-span-1 flex flex-col items-start justify-start  lg:col-span-2">
              <div>
                <h2 className="font-bold text-[20px]">Categories</h2>
              </div>
              <ul className="w-full h-full overflow-y-scroll flex flex-col items-start justify-start gap-2">
                {(infoThisCoin?.categories ?? []).map((category, index) => (
                  <li
                    className="py-1 px-4 w-auto rounded-xl bg-yellow-300"
                    key={index}>
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {/* 🔥 Última linha ocupando 2 colunas no mobile */}
            <div className="p-4 rounded-xl border col-span-2 md:col-span-3 lg:col-span-5">
              <div className="w-full p-4 bg-white rounded-lg border">
                {relationDatHour.length > 0 ? (
                  <Line data={data} options={options} />
                ) : (
                  <p>Carregando dados...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="
            w-14 
            p-4 
            rounded-full f
            lex flex-col 
            items-start 
            justify-start 
            lg:items-center 
            lg:justify-center 
            fixed 
            bottom-3 
            right-3
           bg-yellow-300">
        <div>
          {
            isFav && (
              <Heart size={25} onClick={handleFav} />
            )
          }
          {
            !isFav && (
              <CirclePlus size={25} onClick={handleFav} />
            )
          }
        </div>
      </div>
    </div >
  )
}

