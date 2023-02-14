import React, {useState } from "react";
import { useEffect } from "react";

/* Grid */

import { Alert, Box, Grid, Paper, Popover, SelectChangeEvent, Snackbar, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import { Container } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import MopedIcon from '@mui/icons-material/Moped';
import { Link as RouterLink } from "react-router-dom";
import UpdateVehicle from "./UpdateVehicle";
/* combobox */
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

/* Datetimepicker */
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


/* Interface */
import { BrandVehicleInterface } from "../../models/vehicle/IBrandVehicle";
import { EngineInterface } from "../../models/vehicle/IEngine";
import { VehicleInterface } from "../../models/vehicle/IVehicle";
import { DatePicker } from "@mui/x-date-pickers";

function VehicleCreate  () {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [vehicle, setVehicle] = React.useState<Partial<VehicleInterface>>({});
  const [brandvehicle, setBrandvehicle] = React.useState<BrandVehicleInterface[]>([]);
  const [engine, setEngine] = React.useState<EngineInterface[]>([]);
  const [listmodel, setListModel] = React.useState<string | null>(null);
  const [vehicle_regis, setVehicle_Regis] = React.useState<string | null>(null);
  const [model, setModel] = React.useState<string | null>(null);
  const [regis, setRigis] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [alertmessage,setAlertMessage] = useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const isWeekend = (date: Dayjs) => {
    const day = date.day();
  
    return  day === 7;
  };

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  const popover = open ? "simple-popover" : undefined;
  const handleClose = (
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

  
  function submit() {
    let vehicle_data = {
      Employee_ID: Number(localStorage.getItem("uid")),
      Brand_Vehicle_ID: vehicle.Brand_Vehicle_ID,
      Engine_ID: vehicle.Engine_ID,
      ListModel: listmodel,
      Registration: vehicle_regis,
      Date_Insulance:date,
    };
    console.log(vehicle_data)

const apiUrl = "http://localhost:8080";
const requestOptions = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(vehicle_data),
};

fetch(`${apiUrl}/vehicle`, requestOptions)
  .then((response) => response.json())
  .then(async (res) => {
    if (res.data) {
      setSuccess(true);
      setAlertMessage("บันทึกข้อมูลสำเร็จ")
      await timeout(1000); //for 1 sec delay
          window.location.href = "/vehicle"; 
    } else {
      setError(true);
      setAlertMessage(res.error)
    }
  });
}
//===============================================================================================================//

  const getBrand_Vehicle = async () => {
    const apiUrl = `http://localhost:8080/brand_vehicles`;
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
        console.log(res.data);
        if (res.data) {
          setBrandvehicle(res.data);
        } 
      });
  };

  const getEngine = async () => {
    const apiUrl = `http://localhost:8080/engines`;
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
        console.log(res.data); 
        if (res.data) {
          setEngine(res.data);
        } 
      });
  };

  
  useEffect(() => {
    getBrand_Vehicle();
    getEngine();
  }, []);

  return (
    <Container maxWidth="md">
            
            <Snackbar // บันทึกสำเร็จ
              open={success}
              autoHideDuration={2000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <Alert onClose={handleClose} severity="success">              
                  {alertmessage}
              </Alert>
          </Snackbar>

          <Snackbar // บันทึกไม่สำเร็จ
              open={error} 
              autoHideDuration={2000} 
              onClose={handleClose} 
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <Alert onClose={handleClose} severity="error">
                  {alertmessage}
              </Alert>
          </Snackbar>
          <Box sx={{ padding: 2
                   }}>
              <Paper>
                  <Grid container spacing={0} sx={{ padding: 2
                   }}>
                  <h1>VEHICLE<MopedIcon color="action" sx={{ fontSize: 200 }}/></h1> 
                  </Grid>

                      <Grid
                      container
                      justifyContent={"center"}
                      sx={{
                        paddingY: 1,
                      }}
                    >
                      <Grid item xs={3}>
                          <h3>Brand</h3>
                      </Grid>
                      <Grid item xs={5} >
                      <Autocomplete
                  id="brand-auto"
                  options={brandvehicle}
                  fullWidth
                  size="medium"
                  onChange={(event: any, value) => {
                      setVehicle({ ...vehicle, Brand_Vehicle_ID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) =>
                    `${option.Brand_Name}`
                  } //filter value
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Brand"
                      />
                    );
                  }}
                  renderOption={(props: any, option: any) => {
                    return (
                      <li
                        {...props}
                        value={`${option.ID}`}
                        key={`${option.ID}`}
                      >{`${option.Brand_Name}`}</li>
                    ); //display value
                  }}
                />
                </Grid>
                    

                      <Grid
                      container
                      justifyContent={"center"}
                      sx={{
                        paddingY: 1,
                      }}
                    >
                      <Grid item xs={3}>
                          <h3>Engine</h3>
                      </Grid>
                      <Grid item xs={5} >
                      <Autocomplete
                  id="detergent-auto"
                  options={engine}
                  fullWidth
                  size="medium"
                  onChange={(event: any, value) => {
                      setVehicle({ ...vehicle, Engine_ID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) =>
                    `${option.Engine}`
                  } //filter value
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Engine"
                      />
                    );
                  }}
                  renderOption={(props: any, option: any) => {
                    return (
                      <li
                        {...props}
                        value={`${option.ID}`}
                        key={`${option.ID}`}
                      >{`${option.Engine}`}</li>
                    ); //display value
                  }}
                />
                </Grid>
                      </Grid>
            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 0,
              }}
            >
             <Grid item xs={3}>
                <h3>Model</h3>
                </Grid>
              <Grid item xs={5}>
                <TextField                
                  id="Model"
                  label="Model"
                  variant="outlined"
                  defaultValue=""
                  onChange={(event) => setListModel(String(event.target.value))}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 1,
              }}
            >
             <Grid item xs={3}>
                <h3>Registrantion</h3>
                </Grid>
              <Grid item xs={5}>
                <TextField
                 
                  id="Registrantion"
                  label="Registrantion"
                  variant="outlined"
                  defaultValue=""
                  onChange={(event) => setVehicle_Regis(String(event.target.value))}
                />
              </Grid>
            </Grid>
                      
            <Grid container  justifyContent={"center"}  sx={{
                paddingY: 0,
              }}>
                  <Grid item xs={8}>
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
                    
                    <Grid item xs={2}
                    >
                    </Grid>
                    <Grid container item xs={2} direction='row-reverse'>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={submit}
                            endIcon={<SaveIcon />}
                        >
                            Commit
                        </Button>
                    </Grid>
                </Grid>
          </Box>
      </Container>
);
}
export default VehicleCreate;
