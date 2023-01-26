import React, { useState } from "react";
import { useEffect } from "react";

/* Grid */
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';
import { Snackbar, Alert } from "@mui/material";

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
  const [paymenttype, setPaymenttpye] = React.useState<PaymenttypeInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //แสดงการ Alert
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

  function submit() {
        let bill_p = {
          Service_ID: Number(localStorage.getItem("uid")),
          Q_ID: bill.Q_ID,
          Payment_Type_ID: bill.Paymenttype_ID,
          Bill_Price: 20,
          Time_Stamp: date,
        };

        const apiUrl = "http://localhost:8080";
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bill_p),
        };

        fetch(`${apiUrl}/bill`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              setSuccess(true);
            } else {
              setError(true);
            }
          });
        }

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
        console.log(res)
        if (res.data) {
          setPaymenttpye(res.data);
        }
      });
  };

  useEffect(() => {
    getPaymentType();
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
                    options={paymenttype}
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
                  onClick={submit}
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
