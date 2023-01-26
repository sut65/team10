import React, { useEffect, useState } from "react";

/* Grid */

import { Grid, Paper, SelectChangeEvent, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';
import MuiAlert, { AlertProps } from "@mui/material/Alert";

/* combobox */
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Container } from "@mui/material";

/* Interface */
import { BrandVehicleInterface } from "../../models/vehicle/IBrandVehicle";
import { EngineInterface } from "../../models/vehicle/IEngine";
import { VehicleInterface } from "../../models/vehicle/IVehicle";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VehicleCreate = () => {
  const [vehicle, setVehicle] = React.useState<Partial<VehicleInterface>>({
    BrandVehicle_ID: 0,
    Engine_ID: 0,
  });

  const [brandvehicle, setBrandvehicle] = React.useState<BrandVehicleInterface[]>([]);
  const [engine, setEngine] = React.useState<EngineInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  //================================================================================================================//

  const getBranVehicle = async () => {
    const apiUrl = `http://localhost:8080/brandvehicles`;
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
        } else {
          console.log("else");
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
        } else {
          console.log("else");
        }
      });
  };

  //================================================================================================================//

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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof VehicleCreate;
    const { value } = event.target;
    setVehicle({ ...vehicle, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof vehicle;
    setVehicle({
      ...vehicle,
      [name]: event.target.value,
    });
  };

  const requestOptionsGet = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  function submit() {
    let data = {
      BrandVehicleID: vehicle.BrandVehicle_ID,
      EngineID: vehicle.Engine_ID,
      ListModel: vehicle.ListModel,
      Vehicle_Regis: vehicle.Vehicle_Regis,
    };

//================================================================================================================//

const apiUrl = "http://localhost:8080";
const requestOptionsPost = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
};

fetch(`${apiUrl}/receive`, requestOptionsPost)
    .then((response) => response.json())
    .then((res) => {
        console.log(res)
        if (res.data) {
            setSuccess(true);
        } else {
            setError(true);
        }
    });
}

//================================================================================================================//

  React.useEffect(() => {
    getBranVehicle();
    getEngine();
    submit();
  }, []);

return (
<Container maxWidth="md">
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

        {/* <Location color="success" sx={{ fontSize: 80 }}/> */}
        <Paper>
          <Grid sx={{padding:3}}>
          <h1>Vehicle</h1></Grid>
            <Grid container spacing={5}>
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
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[0, 1]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Brand" />
                    )}
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
                  <h3>Engine(Capasity)</h3>
                </Grid>
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[0, 1]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Engine" />
                    )}
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
                  <h3>Model</h3>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    id="Bill_Price"
                    label="Model"
                    variant="outlined"
                    defaultValue="0"
                    InputProps={{
                    }}
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
                  <h3>Registration</h3>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    id="Bill_Price"
                    label="Registration"
                    variant="outlined"
                    defaultValue="0"
                    InputProps={{
                    }}
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
                  <h3>Date Insulance</h3>
                </Grid>
                <Grid item xs={5}>
                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="DateTimePicker"
                      renderInput={(params) => <TextField {...params} />}
                      value={Date}
                      onChange={(newValue) => {
                      //setDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
        </Paper>
        <Grid container spacing={2}
        sx={{paddingY:2}}>
                <Grid item xs={5} 
                >
                <Button
                  variant="contained"
                  color="error"
                  endIcon={<CancelIcon />}
                >
                  cancel
                </Button> 
                </Grid>
                <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="warning"
                  endIcon={<UpdateIcon />}
                >
                  update
                </Button> 
                </Grid>
                <Grid container item xs={5}  direction='row-reverse'>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<SaveIcon />}
                >
                  commit
                </Button> 
                </Grid>
              </Grid>
              
      </Container>
  );
}
export default VehicleCreate;
