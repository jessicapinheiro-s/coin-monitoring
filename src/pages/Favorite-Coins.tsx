import { AgGridReact } from "ag-grid-react";
import Header from "../components/Header";
import { ColDef } from "ag-grid-community";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrincipalCoinsProps } from "./Pincipais-coins";
import useFavoriteCoinsContext from "../shared/favCoins";
import { getCoinInfoById } from "../api-coin-gecko/api-requests";

export default function FavoriteCoins() {
    const navigate = useNavigate();
    const [coinsInfo, setCoinsInfo] = useState<PrincipalCoinsProps[]>();
    const { favoriteCoins } = useFavoriteCoinsContext();

    const getCoinById = async (event: any) => {
        const idCoin: string = event.data.id;
        navigate(`/Coin-Info-Page/?id=${idCoin}`);
    }

    const getiInfoCoins = () => {
        if (favoriteCoins) {
            Promise.all(favoriteCoins.map(async (coinId: string) => {
                const responseInfoCoin = await getCoinInfoById(coinId);
                setCoinsInfo(responseInfoCoin);
            }));
        }
    }

    useEffect(() => {
        getiInfoCoins();
    }, []);

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
            onCellClicked: (e: any) => { getCoinById(e) }
        },
        {
            field: "image",
            headerName: "Coin",
            cellRenderer: (params: any) => (
                <img src={params.value} width="30" height="30" />
            ),
            width: 100
        },
        {
            field: "name",
            headerName: "Name",
            sortable: true,
            filter: true,
            width: 180
        },
        {
            field: "current_price",
            headerName: "Current Price",
            sortable: true,
            filter: true,
            valueFormatter: (params) => `$${params.value.toFixed(2)}`,
            width: 150,
        },
        {
            field: "price_change_percentage_24h",
            headerName: "Price Change 24h (%)",
            sortable: true,
            filter: true,
            valueFormatter: (params) => `${params.value.toFixed(2)}%`,
            width: 180,
        },
        {
            field: "last_updated",
            headerName: "Last Updated",
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
        <div className="w-full h-screen flex flex-col items-center gap-4">
            <Header />
            <div className="ag-theme-alpine" style={{ height: 750, width: "80%" }}>
                <div className="w-full h-full">
                    {
                        coinsInfo && (
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
                        )
                    }


                    {

                        !coinsInfo && (
                            <div className="w-full h-full flex flex-col justify-center items-center text-center">
                                <span className="text-[30px] ">🥺</span>
                                <h2 className="text-[20px] font-bold">There is no favorite Coins selected</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

