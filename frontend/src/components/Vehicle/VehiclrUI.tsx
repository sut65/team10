import React, { useState } from "react";

/* Grid */
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';

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
import { BrandInterface } from "../../models/vehicle/IBrandVehicle";
import { EngineInterface } from "../../models/vehicle/IEngine";
import { ReceiveInterface } from "../../models/Receive/Receive";
function Receive() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [receive, setReceive] = React.useState<Partial<ReceiveInterface>>({});

  return (
      <Container maxWidth="md">
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
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
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
export default Receive;
