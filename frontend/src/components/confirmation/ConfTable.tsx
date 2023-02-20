import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { ConfirmationInterface } from "../../models/confirmation/IConfirmation";
import Paper from "@mui/material/Paper/Paper";

function ConfTable() {
  const [confirmation, setConfirmation] = useState<ConfirmationInterface[]>([]);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    getConfirmations();
  }, []);

  const getConfirmations = async () => {
    fetch(
      `${apiUrl}/confirmations/${localStorage.getItem("uid")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setConfirmation(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 50 },
    {
      field: "DeliveryInstruction",
      headerName: "Delivery Instruction",
      width: 150,
      //   valueGetter: (params) => params.value.RecvAddress,
      //***valueFormatter*** value will remain same (Object object) and add it to DataGrid
      //***valueGetter*** will got value + type (ex. String value) before adding to DataGrid
    },
    {
      field: "RecvType",
      headerName: "Receive Method",
      width: 120,
      valueGetter: (params) => params.value.Name,
    },
    {
      field: "RecvTime",
      headerName: "Receive Time",
      width: 200,
      //   valueGetter: (params) => params.value.Disease_Name,
    },
    {
      field: "Note",
      headerName: "Note",
      width: 100,
      //   valueGetter: (params) => params.value,
    },
  ];

  return (
    <div>
      <Container sx={{ width: 1070 }}>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        ></Box>
        <Paper elevation={5}>
          <div style={{ height: 300, width: "100%" , background: "#feefd1"}}>
            <DataGrid
              rows={confirmation}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
              scrollbarSize={1}
              //   localeText={{
              //     toolbarDensity: "ขนาด",
              //     toolbarDensityLabel: "Size",
              //     toolbarDensityCompact: "เล็ก",
              //     toolbarDensityStandard: "Medium",
              //     toolbarDensityComfortable: "ใหญ่",
              //   }}
              //components={{ Toolbar: GridToolbar }}
            />
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default ConfTable;
