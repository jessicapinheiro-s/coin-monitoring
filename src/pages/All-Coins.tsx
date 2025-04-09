import { AgGridReact } from "ag-grid-react";
import { ColDef, themeQuartz } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";
import { getAllCoins } from "../api-coin-gecko/api-requests";
import Header from "../components/Header";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface propsAllCoins {
  id: string,
  symbol: string,
  name: string;
}

export default function AllCoins() {
  const [coinsInfo, setCoinsInfo] = useState<propsAllCoins[]>();
  const navigate = useNavigate();
  const getiInfoCoins = async () => {
    try {
      const response = await getAllCoins();
      setCoinsInfo(response)
    } catch (error) {
      throw new Error('Error to get info coins')
    }
  }
  const columnDefs: ColDef[] = [
    {
      field: "image",
      headerName: "",
      cellRenderer: () => (
        <div className="h-full w-full flex items-center justify-center">
          <Info size={20} />
        </div>
      ),
      width: 100,
      onCellClicked: (e: any) => { getCoinById(e)}
    },
    { field: "id", headerName: "ID", sortable: true },
    { field: "name", headerName: "Name", sortable: true, filter: true},
    { field: "symbol", headerName: "Symbol", sortable: true},
  ];
  
  const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
  ];

  const fiilterDontStartByNumber = (arr: propsAllCoins[]) => {
    return arr.filter(item => alphabet.includes((item.name.charAt(0)).toLowerCase()));
  }

  const getCoinById = async (event: any) =>{
    const idCoin: string = event.data.id;
    console.log(idCoin)
    navigate(`/Coin-Info-Page/?id=${idCoin}`);
  }

  useEffect(() => {
    getiInfoCoins();
  }, []);


  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Header/>
      <div className="w-full text-center py-4">
        <h1 className="text-[29px] font-bold">All Coins</h1>
      </div>
      <div style={{ height: 750, width: "80%" }}>
        <AgGridReact
          rowData={coinsInfo ? fiilterDontStartByNumber(coinsInfo?.slice(0, 2000)) : []}
          columnDefs={columnDefs}
          pagination={false}
          rowNumbers={false}
          theme={themeQuartz}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
    </div>

  );


}


