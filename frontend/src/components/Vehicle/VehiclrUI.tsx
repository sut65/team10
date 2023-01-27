import React, {useState } from "react";
import { useEffect } from "react";

/* Grid */

import { Alert, Box, Grid, Paper, SelectChangeEvent, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import MopedIcon from '@mui/icons-material/Moped';

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


function VehicleCreate  () {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [vehicle, setVehicle] = React.useState<Partial<VehicleInterface>>({});
  const [brandvehicle, setBrandvehicle] = React.useState<BrandVehicleInterface[]>([]);
  const [engine, setEngine] = React.useState<EngineInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

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
  function submit() {
    let data = {
      Brand_Vehicle_ID: vehicle.Brand_Vehicle_ID,
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

fetch(`${apiUrl}/vehicle`, requestOptionsPost)
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


//   const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
//   props,

//   ref
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

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

  //================================================================================================================//



  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof VehicleCreate;
    const { value } = event.target;
    setVehicle({ ...vehicle, [id]: value });
  };

  // const handleChange = (event: SelectChangeEvent<number>) => {
  //   const name = event.target.name as keyof typeof vehicle;
  //   setVehicle({
  //     ...vehicle,
  //     [name]: event.target.value,
  //   });
  // };

  // const requestOptionsGet = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };



//================================================================================================================//

  useEffect(() => {
    getBranVehicle();
    getEngine();
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
                    `${option.Brand_Vehicle}`
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
                      >{`${option.Brand_Vehicle}`}</li>
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
                paddingY: 1,
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
                      

            <Grid item xs={3}>
                <h3>Date Insulance</h3>
              </Grid>
                      <Grid item xs={5}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                  label="DateTimePicker"
                                  renderInput={(params) => <TextField {...params} />}
                                  value={date}
                                  onChange={(newValue) => {
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
                      <Button
                          variant="contained"
                          color="error"
                          endIcon={<CancelIcon />}
                      >
                          cancel
                      </Button>
                  </Grid>
                  <Grid container item xs={7} direction='row-reverse'>
                      <Button
                          variant="contained"
                          color="success"
                          onClick={submit}
                          endIcon={<SaveIcon />}
                      >
                          commit
                      </Button>
                  </Grid>
              </Grid>
          </Box>
      </Container>
);
}
export default VehicleCreate;
