import { AgGridReact } from "ag-grid-react";
import Header from "../components/Header";
import { ColDef } from "ag-grid-community";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrincipalCoinsProps } from "./Pincipais-coins";

export default function FavoriteCoins() {
    const navigate = useNavigate();
    const [coinsInfo, setCoinsInfo] = useState<PrincipalCoinsProps[]>();

    const getCoinById = async (event: any) => {
        const idCoin: string = event.data.id;
        navigate(`/Coin-Info-Page/?id=${idCoin}`);
    }

    const getiInfoCoins = () => {
        const responseFromLocal = localStorage.getItem('favoriteItems');
        if(responseFromLocal){
            const reponseParse = JSON.parse(responseFromLocal);
            setCoinsInfo(reponseParse);
        }
    }

    useEffect(() => {
        getiInfoCoins();
    }, []);

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
            onCellClicked: (e: any) => { getCoinById(e) }
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
            field: "price_change_percentage_24h",
            headerName: "Variação 24h (%)",
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

    
    return (
        <div className="w-full h-screen flex flex-col gap-4">
            <Header />
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
        </div >
    )
}

