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
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { VehicleInterface } from "../../models/vehicle/IVehicle";
import { EngineInterface } from "../../models/vehicle/IEngine";
import { DatePicker } from "@mui/x-date-pickers";
function UpdateVehicle() {
  const params = useParams()
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [vehicle, setVehicle] = React.useState<Partial<VehicleInterface>>({});
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [vehicle_id, setVehicle_ID] = React.useState<VehicleInterface[]>([]);
  const [branvehicle, setBrandVehicle]  = React.useState<String | undefined>(undefined);
  const [engine, setEngine]  = React.useState<Number | undefined>(undefined);
  const [model, setModel]  = React.useState<String | undefined>(undefined);
  const [registration, setRegistration]  = React.useState<String | undefined>(undefined);
  const [alertmessage,setAlertMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const isWeekend = (date: Dayjs) => {
    const day = date.day();
  
    return  day === 7;
  };

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
      ListModel: model,
      Registration: registration,
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
          setAlertMessage("บันทึกข้อมูลสำเร็จ")
          await timeout(1000); //for 1 sec delay
          window.location.href = "/vehicle";        
          
        } else {
          setError(true);
          console.log(res.data);
          setAlertMessage(res.error)
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
          setModel(res.data.ListModel);
          setRegistration(res.data.Registration)
          setBrandVehicle(res.data.Brand_Vehicle.Brand_Name)
          setEngine(res.date.Engine.Engine)         
        }
      });
  };


  useEffect(() => {
    getVehicle();
  }, []);
  return (

    <Container maxWidth="md">
      <Snackbar // บันทึกสำเร็จ
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success">
          {alertmessage}
        </Alert>
      </Snackbar>

      <Snackbar // บันทึกไม่สำเร็จ
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error">
          {alertmessage}
        </Alert>
      </Snackbar>
      <Box sx={{ padding: 2}}>
        <Paper>
        <Grid container spacing={0} sx={{ padding: 2}}>
            <h1>VEHICLE<MopedIcon color="action" sx={{ fontSize: 200 }}/></h1>
            </Grid>
            <Grid container spacing={2} sx={{ paddingX: 15 }}>
            <Grid item xs={3}>
              <h3>Vehicle ID</h3>
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

          <Grid container spacing={2} sx={{ paddingX: 15 }}>
            <Grid item xs={3}>
              <h3>Brand</h3>
            </Grid>
            <Grid item xs={8} >
            <TextField
               id="Brand"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={branvehicle}             
               sx={{ width : 350 }}
             ></TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ paddingX: 15 }}>
            <Grid item xs={3}>
              <h3>Model</h3>
            </Grid>
            <Grid item xs={8} >
            <TextField
               id="Model"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={model}             
               sx={{ width : 350 }}
             ></TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ paddingX: 15 }}>
            <Grid item xs={3}>
              <h3>Registration</h3>
            </Grid>
            <Grid item xs={5} >
            <TextField
               id="Registration"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={registration}             
               sx={{ width : 350 }}
             ></TextField>
            </Grid>
          </Grid>
          <Grid container  justifyContent={"center"}  sx={{
                paddingX: 1,
              }}>
                  <Grid item xs={8.6}>
                    <h3>Date Insulance</h3>              
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                          orientation="landscape"
                          openTo="day"
                          value={date}
                          shouldDisableDate={isWeekend}
                          onChange={(newValue) => {
                            setDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>                      
                  </Grid>
              </Grid>
        </Paper>
        <Grid container spacing={2}
                    sx={{ paddingY: 1 }}>
                    <Grid item xs={8}
                    >
                        <Button
                        component={RouterLink}
                        to="/vehicle"
                            variant="contained"
                            color="error"
                            endIcon={<CancelIcon />}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
          </Grid>
                    <Grid container item xs={2} direction='row-reverse'>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={update}
                            endIcon={<SaveIcon />}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
      </Box>
    </Container>
  );
}

export default UpdateVehicle;
