import React, { useState } from "react";
import { useEffect } from "react";

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
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
/* Interface */
import { BillInterface } from "../../models/bill/IBill";
import { PaymenttypeInterface } from "../../models/bill/IPaymenttype";
function Bill() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [bill, setBill] = React.useState<Partial<BillInterface>>({});
  const [payment_type_id, setPayment_Type_ID] = React.useState<PaymenttypeInterface[]>([]);


  const getPaymentType = async () => {
    const apiUrl = "http://localhost:8080/paymenttype";
    const requestOptions = {
      method: "GET",
      headers: {
        //Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPayment_Type_ID(res.data);
        }
      });
  };

  useEffect(() => {
    getPaymentType();
  }, []);
  return (
      <Container maxWidth="md">
        <LocalAtmIcon color="success" sx={{ fontSize: 80 }}/>
        <Paper>
          <Grid sx={{padding:2}}>
          <h1>Receipt</h1></Grid>
            <Grid container spacing={5}>
              <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
                <Grid item xs={3}>
                  <h3>Service ID</h3>
                </Grid>
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[0, 1]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Movie" />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
                <Grid item xs={3}>
                  <h3>Promotion</h3>
                </Grid>
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[0, 1]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Movie" />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
                <Grid item xs={3}>
                  <h3>Payment Type</h3>
                </Grid>
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={payment_type_id}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Movie" />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
                <Grid item xs={3}>
                  <h3>Price</h3>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    id="Bill_Price"
                    label="Bill_Price"
                    variant="outlined"
                    defaultValue="0"
                    value={5}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 2,
                }}
              >
                <Grid item xs={3}>
                  <h3>Date Time</h3>
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
export default Bill;
