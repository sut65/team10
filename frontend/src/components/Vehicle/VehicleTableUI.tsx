import React, { useState } from "react";
import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Button, Grid } from "@mui/material";
import { VehicleInterface } from "../../models/vehicle/IVehicle";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VehicleDelete from "./DeleteVehicle";
import {  Popover, Typography } from "@mui/material";

function VehicleTableUI() {
  const [vehicle, setVehicle] = useState<VehicleInterface[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popup = open ? 'simple-popover' : undefined;


  useEffect(() => {
    getVehicle();
  }, []);
  const getVehicle = async () => {
    const apiUrl = "http://localhost:8080/vehicle";
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
    <Grid item xs={6} sx={{
                paddingX: 2, paddingY: 0
              }}
        >
          <div>
          <Button aria-describedby={popup} variant="contained" color="error"
            endIcon={<DeleteForeverIcon />}
            onClick={handleClick}>
            Delete
          </Button>
          <Popover
            id={popup}
            open={open}
            anchorEl={anchorEl}
            sx={{ paddingBottom: 20 }}
            marginThreshold={80}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <VehicleDelete />
            <Typography sx={{ p: 2 }}>Delete Vehicle</Typography>
          </Popover>
          </div>
          </Grid>
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
    </Grid>
  </div>
);
}
export default VehicleTableUI;