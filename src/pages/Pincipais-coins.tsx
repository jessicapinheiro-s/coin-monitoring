import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useEffect, useState } from "react";
import { getPopularCoins } from "../api-coin-gecko/api-requests";
import Header from "../components/Header";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export interface PrincipalCoinsProps {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any
  last_updated: string
}



export default function PrincipaisCoinsPage() {
  const [coinsInfo, setCoinsInfo] = useState<PrincipalCoinsProps[]>();
  const navigate = useNavigate()
  
  const columnDefs: ColDef[] = [
    {
      field: "image",
      headerName: "info",
      cellRenderer: () => (
        <div className="h-full w-full flex items-center justify-center">
          <Info size={20} />
        </div>
      ),
      width: 100,
      onCellClicked: (e: any) => { getCoinById(e)}
    },
    {
      field: "image",
      headerName: "Moeda",
      cellRenderer: (params: any) => (
        <img src={params.value} width="30" height="30" />
      ),
      width: 100
    },
    {
      field: "name",
      headerName: "Nome",
      sortable: true,
      filter: true,
      width: 180
    },
    {
      field: "current_price",
      headerName: "Preço Atual (USD)",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
      width: 150,
    },
    {
      field: "symbol",
      headerName: "Símbolo",
      sortable: true,
      width: 120
    },
    {
      field: "market_cap",
      headerName: "Market Cap",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
      width: 180,
    },

    {
      field: "market_cap_rank",
      headerName: "Ranking",
      sortable: true,
      filter: true,
      width: 120,
      sort: "asc"
    },

    {
      field: "total_volume",
      headerName: "Volume Total",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `$${params.value.toLocaleString()}`,
      width: 180,
    },

    {
      field: "high_24h",
      headerName: "Alta 24h",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
      width: 150,
    },

    {
      field: "low_24h",
      headerName: "Baixa 24h",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
      width: 150,
    },

    {
      field: "price_change_percentage_24h",
      headerName: "Variação 24h (%)",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `${params.value.toFixed(2)}%`,
      width: 180,
    },

    {
      field: "ath",
      headerName: "All Time High (ATH)",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
      width: 180,
    },

    {
      field: "ath_change_percentage",
      headerName: "ATH % Mudança",
      sortable: true,
      filter: true,
      valueFormatter: (params) => `${params.value.toFixed(2)}%`,
      width: 180,
    },

    {
      field: "last_updated",
      headerName: "Última Atualização",
      sortable: true,
      width: 200,
      valueFormatter: (params: any) =>
        new Date(params.value).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
    }
  ];
  const getiInfoCoins = async () => {
    try {
      const response = await getPopularCoins("usd", "1000");
      setCoinsInfo(response)
    } catch (error) {
      throw new Error("Error to get info coins")
    }
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
      <Header />
      <div className="w-full text-center py-4 ">
        <h1 className="text-[29px] font-bold">Rank Coins</h1>
      </div>

      <div className="ag-theme-alpine" style={{ height: 750, width: "80%" }}>
        <AgGridReact
          rowData={coinsInfo}
          columnDefs={columnDefs}
          pagination={true}
          rowHeight={50}
          paginationPageSize={50}
          paginationPageSizeSelector={[25, 50, 100, 500, 1000]}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
          defaultColDef={{
            cellStyle: { display: "flex", alignItems: "center", justifyContent: "flex-start" }, // Alinha ao centro
          }}
        />
      </div>
    </div>

  );


}


