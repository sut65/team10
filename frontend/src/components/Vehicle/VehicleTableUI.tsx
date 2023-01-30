import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { VehicleInterface } from "../../models/vehicle/IVehicle";

function VehicleTableUI() {
  const [vehicle, setVehicle] = useState<VehicleInterface[]>([]);

  useEffect(() => {
    getVehicle();
  }, []);
  const getVehicle = async () => {
    const apiUrl = "http://localhost:8080/vehicles";
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
            setVehicle(res.data);
        }
      });
      
  };


  const vehiclecolumbs: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Brand_Vehicle",
      headerName: "ยี่ห้อรถ",
      width: 130,
      valueGetter: (params) => params.value.Brand_Vehicle,
    },
    {
      field: "Engine",
      headerName: "ขนาดเครื่องยนต์",
      width: 150,
      valueGetter: (params) => params.value.Engine,
    },
    {
      field: "ListModel",
      headerName: "รุ่นของรถ",
      width: 150,
    },
    {
      field: "Vehicle_Rigis",
      headerName: "ทะเบียนรถ",
      width: 150,
    },
    {
      field: "Employee",
      headerName: "ผู้จัดการ",
      width: 150,
      valueGetter: (params) => params.value.Name,
    },
    { field: "Date_Insulance", headerName: "วันที่ต่อ พรบ.", width: 250 },
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
              rows={vehicle}
              getRowId={(row) => row.ID}
              columns={vehiclecolumbs}
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
export default VehicleTableUI;