import React, { useState } from "react";
import { useEffect } from "react";
/* Grid */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MopedIcon from '@mui/icons-material/Moped';
import { Link as RouterLink } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from "react-router-dom";
/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { VehicleInterface } from "../../models/vehicle/IVehicle";
function UpdateVehicle() {
  const params = useParams()
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [vehicle, setVehicle] = React.useState<Partial<VehicleInterface>>({});
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [vehicle_id, setVehicle_ID] = React.useState<VehicleInterface[]>([]);
  const [branname, setBrand_Name]  = React.useState<String | undefined>(undefined);
  const [engine, setEngine]  = React.useState<String | undefined>(undefined);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = ( // AlertBar
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

  function update() {
    let vehicle_update = {
      ID: vehicle.ID,
      Employee_ID: Number(localStorage.getItem("uid")),
      Date_Insulance: date,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle_update),
    };
    console.log(vehicle_update);
    console.log(JSON.stringify(vehicle_update));

    fetch(`http://localhost:8080/vehicle`, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          await timeout(1000); //for 1 sec delay
          window.location.href = "/receive";        
          
        } else {
          setError(true);
          console.log(res.data);
        }
      });
  }

  const getVehicle = async () => {
    const apiUrl = "http://localhost:8080/vehicle";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8080/vehicle/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        if (res.data) {
          setVehicle(res.data);
          setVehicle_ID(res.data.ID);
        }
      });
  };

  const getBran_Vehicle = async () => {
    const apiUrl = `http://localhost:8080/brand_vehicle/${localStorage.getItem("uid")}`;
  
    const requestOptionsGet = {
      method: "GET",
  
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptionsGet)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API
  
      .then((res) => {
        console.log(res.data); //show ข้อมูล
  
        if (res.data) {
          setBrand_Name(res.data.Brand_Name);
        } else {
          console.log("else");
        }
      });
  };

  const getEngine = async () => {
    const apiUrl = `http://localhost:8080/engine/${localStorage.getItem("uid")}`;
  
    const requestOptionsGet = {
      method: "GET",
  
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptionsGet)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API
  
      .then((res) => {
        console.log(res.data); //show ข้อมูล
  
        if (res.data) {
          setEngine(res.data.Engine);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getVehicle();
    getBran_Vehicle();
    getEngine();
  }, []);
  return (

    <Container maxWidth="xl">
      <Snackbar // บันทึกสำเร็จ
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar // บันทึกไม่สำเร็จ
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Box sx={{ padding: 2}}>
        <Paper>
        <Grid container spacing={0} sx={{ padding: 2}}>
            <h1>VEHICLE<MopedIcon color="action" sx={{ fontSize: 200 }}/></h1>
            </Grid>
            <Grid container spacing={2} sx={{ paddingX: 2 }}>
            <Grid item xs={4}>
              <h3>Receive ID</h3>
            </Grid>
            <Grid item xs={8} >
            <TextField
               id="Employee_ID"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={vehicle_id}             
               sx={{ width : 350 }}
             ></TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ paddingX: 2 }}>
            <Grid item xs={4}>
              <h3>Brand</h3>
            </Grid>
            <Grid item xs={8} >
            <TextField
               id="Brand"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={branname}             
               sx={{ width : 350 }}
             ></TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ paddingX: 2 }}>
            <Grid item xs={4}>
              <h3>Engine</h3>
            </Grid>
            <Grid item xs={8} >
            <TextField
               id="Engine"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={engine}             
               sx={{ width : 350 }}
             ></TextField>
            </Grid>
          </Grid>
          
          <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 2 }}>
            <Grid item xs={4}>
              <h3>Date Insulance</h3>
            </Grid>
            <Grid item xs={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date Insulance"
                  renderInput={(params) => <TextField {...params} />}
                  value={date}
                  onChange={(newValue: Dayjs | null) => {
                    setDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2}
          sx={{ paddingY: 2 }}>
          <Grid item xs={5}
          >
          </Grid>
          <Grid container item xs={7} direction='row-reverse'>
            <Button
              variant="contained"
              color="warning"
              onClick={update}
              endIcon={<SaveIcon />}
            >
              update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default UpdateVehicle;
