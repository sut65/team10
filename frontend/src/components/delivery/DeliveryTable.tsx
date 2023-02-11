import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper/Paper";
import { DeliveryInterface } from "../../models/delivery/IDelivery";

function DeliTable() {
  const [delivery, setDelivery] = useState<DeliveryInterface[]>([]);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    getDelivery();
  }, []);

  const getDelivery = async () => {
    fetch(`${apiUrl}/deliveries/${localStorage.getItem("uid")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDelivery(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 50 },
    {
      field: "Confirmation_ID",
      headerName: "Conf ID",
      width: 80,
      //***valueFormatter*** value will remain same (Object object) and add it to DataGrid
      //***valueGetter*** will got value + type (ex. String value) before adding to DataGrid
    },
    {
      field: "Vehicle",
      headerName: "Used Vehicle",
      width: 120,
      valueGetter: (params) => params.value.Registration,
    },
    {
      field: "Score",
      headerName: "Score",
      width: 60,
    },
    {
      field: "Problem",
      headerName: "Probelm",
      width: 280,
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
        <h2>Delivery History</h2>
        <Paper elevation={5}>
          <div style={{ height: 380, width: "100%", background: "#feefd1" }}>
            <DataGrid
              rows={delivery}
              getRowId={(row) => row.ID}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
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

export default DeliTable;
