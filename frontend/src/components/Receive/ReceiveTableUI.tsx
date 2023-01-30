import React, { useState } from "react";
import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Button, Grid } from "@mui/material";
import { ReceiveInterface } from "../../models/receive/IReceive";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReceiveDelete from "./DeleteReceive";
import {  Popover, Typography } from "@mui/material";
function ReceiveTableUI() {
  const [receive, setReceive] = useState<ReceiveInterface[]>([]);

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
              <ReceiveDelete />
              <Typography sx={{ p: 2 }}>Delete Receive</Typography>
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
      </Grid>
    </div>
  );
}
export default ReceiveTableUI;