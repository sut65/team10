import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { PromotionInterface } from "../../models/promotion/IPromotion";
import { Grid } from "@mui/material";

function PromotionTable_UI() {
  const [promotion, setPromotion] = useState<PromotionInterface[]>([]);

  useEffect(() => {
    getPromotion();
  }, []);
  const getPromotion = async () => {
    const apiUrl = "http://localhost:8080/promotion";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setPromotion(res.data);
        }
      });
      
  };


  const promotioncolumns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Codetype",
      headerName: "ประเภทของโค๊ด",
      width: 130,
      valueGetter: (params) => params.value.Type,
    },
    {
      field: "Reason",
      headerName: "เลขที่เหตุผล",
      width: 150,
      valueGetter: (params) => params.value.Reason,
    },
    {
      field: "Price",
      headerName: "ราคา",
      width: 100,
    },
    {
      field: "Amount",
      headerName: "จำนวน",
      width: 50,
    },
    {
      field: "Employee",
      headerName: "พนักงาน",
      width: 150,
      valueGetter: (params) => params.value.Name,
    },
    { field: "Time_Stamp", headerName: "เวลาออกบิล", width: 250 },
  ];

  return (
    <div>
      <Grid>
        <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
        <Container maxWidth="xl">
          <div style={{ height: 400, width: "100%", marginTop: "30px" }}>
            <DataGrid
              rows={promotion}
              getRowId={(row) => row.ID}
              columns={promotioncolumns}
              pageSize={5}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Container>
        </Grid>
      </Grid>
    </div>
  );
}
export default PromotionTable_UI;