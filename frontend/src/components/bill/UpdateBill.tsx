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
import { Link as RouterLink } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from "react-router-dom";

function BillUpdate() {
  //////////////////////////////////////////////////////////////////////////////////
                            /* ตัวแปรต่างๆ สำหรับรับค่า*/
  //////////////////////////////////////////////////////////////////////////////////
  const params = useParams()
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [bill, setBill] = React.useState<Partial<BillInterface>>({});
  const [paymenttype, setPaymenttype] = React.useState<PaymenttypeInterface[]>([]);
  const [bill_id, setBill_ID] = React.useState<Number | undefined>(undefined);
  const [b_price, setB_price] = React.useState<Number | undefined>(undefined);
  const [r_state, setR_state] = React.useState<Number | undefined>(undefined);
  const [servicename, setServicename] = React.useState("");

  const [alertmsg, setAlertmsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //////////////////////////////////////////////////////////////////////////////////

  //หน่วงเวลา
  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
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

  //////////////////////////////////////////////////////////////////////////////////
                            /* ฟังก์ชั่นสำหรับการ updateBill*/
  //////////////////////////////////////////////////////////////////////////////////
  function update() {
    let bill_u = {
      ID: bill_id,
      Paymenttype_ID: bill.Paymenttype_ID,
      Receive_State: r_state,
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
          setAlertmsg("บันทึกสำเร็จ")
          await timeout(1000); //for 1 sec delay
          window.location.href = "/bill"; 
        } else {
          setError(true);
          setAlertmsg(res.error)
        }
      });
  }

  //ดึงข้อมูลทั้งหมดใน paymenttype
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
        if (res.data) {
          setPaymenttype(res.data);
        }
      });
  };
  //ดึงข้อมูลบิลเฉพาะของลูกค้า
  const getListBill_Customer = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8080/bill_serviceupdate/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setBill(res.data);
          setBill_ID(res.data[0].ID);
          setServicename(res.data[0].Service.Customer.Customer_Name);
          setB_price(res.data[0].Bill_Price);
          setR_state(res.data[0].Receive_State);
        }
      });
  };

  useEffect(() => {
    getPaymentType();
    getListBill_Customer();
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
            {alertmsg}
          </Alert>
        </Snackbar>

        <Snackbar // บันทึกไม่สำเร็จ
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="error">
            {alertmsg}
          </Alert>
        </Snackbar>

        <Paper style={{ background: "rgba(0, 0, 0, 0.2)" }}>
          <h1 style={{ textAlign: "center", paddingTop: 20, color: "white" }}>
            <LocalAtmIcon color="success" style={{ fontSize: 80 }} />
          </h1>
        <Paper>
          <Grid sx={{ padding: 2 }}>
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
                <h3>Service Name</h3>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="Service_Name"
                  variant="outlined"
                  disabled
                  type="string"
                  size="medium"
                  value={servicename}
                  sx={{ width: 350 }}
                ></TextField>
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
                <h3>Service ID</h3>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="Bill_ID"
                  variant="outlined"
                  disabled
                  type="string"
                  size="medium"
                  value={bill_id}
                  sx={{ width: 350 }}
                ></TextField>
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
                  onChange={(event: any, value:any) => {
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
                  sx={{ width: 350 }}
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
                  id="Price"
                  variant="outlined"
                  disabled
                  type="string"
                  size="medium"
                  value={b_price}
                  sx={{ width: 350 }}
                ></TextField>
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
        <Grid container spacing={2}
          sx={{ paddingY: 2 }}>
            <Grid container item xs={2} >
            <Button
              component={RouterLink}
              to="/bill"
              variant="contained"
              color="error"
              endIcon={<CancelIcon />}
            >
              cancel
            </Button>
          </Grid>
          <Grid container item xs={10} direction='row-reverse'>
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
        </Paper>
      </Box>
    </Container>
  );
}
export default BillUpdate;
