import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { BillInterface } from "../../models/bill/IBill";
import { Grid } from "@mui/material";

function BillTable_UI() {
  const [bill, setBill] = useState<BillInterface[]>([]);

  useEffect(() => {
    getBill();
  }, []);
    //ดึงข้อมูลจาก Promotion
  const getBill = async () => {
    const apiUrl = "http://localhost:8080/bill";
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
        console.log(res.data)
        if (res.data) {
            setBill(res.data);
        }
      });
      
  };


  const billcolumns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Service",
      headerName: "ชื่อลูกค้า",
      width: 130,
      valueGetter: (params) => params.value.ID,
    },
    // {
    //   field: "QuotaCode",
    //   headerName: "โค๊ดเลขที่",
    //   width: 150,
    //   valueGetter: (params) => params.value.ID,
    // },
    {
      field: "Bill_Price",
      headerName: "ราคา",
      width: 100,
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
        <Grid item xs = {12}>
        <Container maxWidth="xl">
          <div style={{ height: 400, width: "100%", marginTop: "30px" }}>
            <DataGrid
              rows={bill}
              getRowId={(row) => row.ID}
              columns={billcolumns}
              pageSize={5}
              rowsPerPageOptions={[7]}
            />
          </div>
        </Container>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default BillTable_UI;