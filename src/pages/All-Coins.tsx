import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useEffect, useState } from "react";
import { getAllCoins } from "../api-coin-gecko/api-requests";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export interface propsAllCoins {
  id: string,
  symbol: string,
  name: string;
}
const alphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'
];

const columnDefs: ColDef[] = [
  { field: "id", headerName: "ID", sortable: true, width: 150 },
  { field: "name", headerName: "Nome", sortable: true, filter: true },
  { field: "symbol", headerName: "Symbol", sortable: true },
];

const fiilterDontStartByNumber = (arr: propsAllCoins[]) => {
  return arr.filter(item => alphabet.includes((item.name.charAt(0)).toLowerCase()));
}

export default function AllCoins() {
  const [coinsInfo, setCoinsInfo] = useState<propsAllCoins[]>();

  const getiInfoCoins = async () => {
    try {
      const response = await getAllCoins();
      setCoinsInfo(response)
    } catch (error) {
      throw new Error('Error to get info coins')
    }
  }

  useEffect(() => {
    getiInfoCoins();
  }, []);


  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
      <div className="ag-theme-alpine" style={{ height: 400, width: "70%" }}>
        <AgGridReact
          rowData={coinsInfo ? fiilterDontStartByNumber(coinsInfo?.slice(0, 2000)) : []}
          columnDefs={columnDefs}
          pagination={false}
          rowNumbers={false}
        />
      </div>
    </div>

  );


}


