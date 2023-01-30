import React, { useState } from "react";
import { useEffect } from "react";

/* Grid */
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
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
import { QuotaCodeInterface } from "../../models/promotion/IQuotaCode";
import { ServiceInterface } from "../../models/service/IService";
import BillTable_UI from "./BillTable";
function BillUpdate() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [bill, setBill] = React.useState<Partial<BillInterface>>({});
  const [paymenttype, setPaymenttype] = React.useState<PaymenttypeInterface[]>([]);
  const [service, setService] = React.useState<ServiceInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  //หน่วงเวลา
  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

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

    function update() {
        let bill_u = {
          // ID: bill.ID,
          ID: 2,
          Paymenttype_ID: bill.Paymenttype_ID,
          Service_ID: 2,
          //Service_ID: Number(localStorage.getItem("uid")),
          Time_Stamp: date,
        };
    
        const requestOptions = {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bill_u),
        };
        console.log(bill_u);
    
        fetch(`http://localhost:8080/bills`, requestOptions)
          .then((response) => response.json())
          .then(async (res) => {
            console.log(res);
            if (res.data) {
              setSuccess(true);
              await timeout(1000); //for 1 sec delay
              window.location.reload();     
              
            } else {
              setError(true);
              console.log(res.data);
            }
          });
      }
        
  const getPaymentType = async () => {
    const apiUrl = "http://localhost:8080/paymenttype";
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
        console.log(res)
        if (res.data) {
          setPaymenttype(res.data);
        }
      });
  };
  const getBill = async () => {
    const apiUrl = "http://localhost:8080/bill";
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
        console.log(res)
        if (res.data) {
          setBill(res.data);
        }
      });
  };

    // const getService = async () => {
    //   const requestOptions = {
    //     method: "GET",
    //     headers: {
    //       //Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   let uid = localStorage.getItem("uid");
    //   fetch(`http://localhost:8080/service/${uid}`, requestOptions)
    //     .then((response) => response.json())
    //     .then((res) => {
    //        = res.data.ID
    //       if (res.data) {
    //         setService(res.data);
    //       } else {
    //         console.log("else");
    //       }
    //     });
    // };

  

  useEffect(() => {
    getPaymentType();
    getBill();
  }, []);
  return (
      <Container maxWidth="md">
        <Box>
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
            <Grid container spacing={2}>
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
                    id="service-auto"
                    options={service}
                    fullWidth
                    size="medium"
                    onChange={(event: any, value) => {
                      setBill({ ...bill, Service_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.ID}`
                    } //filter value
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Search..."
                        />
                      );
                    }}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li
                          {...props}
                          value={`${option.ID}`}
                          key={`${option.ID}`}
                        >{`${option.ID}`}</li>
                      ); //display value
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
                  <h3>Payment Type</h3>
                </Grid>
                <Grid item xs={5}>
                <Autocomplete
                    id="paymenttype-auto"
                    options={paymenttype}
                    fullWidth
                    size="medium"
                    onChange={(event: any, value) => {
                      setBill({ ...bill, Paymenttype_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Type}`
                    } //filter value
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Search..."
                        />
                      );
                    }}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li
                          {...props}
                          value={`${option.ID}`}
                          key={`${option.ID}`}
                        >{`${option.Type}`}</li>
                      ); //display value
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
                      onChange={(newValue: Dayjs | null) => {
                        setDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
            </Grid>
            </Grid>
        </Paper>
        <Grid container spacing={1}
        sx={{paddingY:2}}>
                <Grid container item xs={12}  direction='row-reverse'>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={update}
                  endIcon={<UpdateIcon />}
                >
                  update
                </Button> 
                </Grid>
              </Grid>
              </Box>
      </Container>
  );
}
export default BillUpdate;
