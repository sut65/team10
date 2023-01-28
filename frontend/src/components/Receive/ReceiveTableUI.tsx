import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { ReceiveInterface } from "../../models/receive/IReceive";

function ReceiveTableUI() {
  const [receive, setReceive] = useState<ReceiveInterface[]>([]);

  useEffect(() => {
    getReceive();
  }, []);
  const getReceive = async () => {
    const apiUrl = "http://localhost:8080/receive";
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
          console.log(res.data)
            setReceive(res.data);
        }
      });
      
  };


  const receivecolumbs: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 60 },
    {
      field: "Bill",
      headerName: "เลขที่บิล",
      width: 80,
      valueGetter: (params) => params.value.ID,
    },
    {
      field: "Det_Quantity",
      headerName: "จำนวนผงซักฟอก",
      width: 130,
    },

    {
      field: "Sof_Quantity",
      headerName: "จำนวนน้ำยาปรับผ้านุ่ม",
      width: 160,
    },
    {
      field: "Employee",
      headerName: "พนักงาน",
      width: 150,
      valueGetter: (params) => params.value.Name,
    },
    { field: "Time_Stamp", headerName: "เวลา.", width: 250 },
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
              rows={receive}
              getRowId={(row) => row.ID}
              columns={receivecolumbs}
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
export default ReceiveTableUI;