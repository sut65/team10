import React, { useState } from "react";
import { useEffect } from "react";

/* Grid */
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
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
import { Link as RouterLink } from "react-router-dom";
//สร้างตัวแปรสำหรับคำนวณค่าใช้จ่าย
let sum = 0;

function Bill() {
  //////////////////////////////////////////////////////////////////////////////////
  /* ตัวแปรต่างๆ สำหรับรับค่า*/
  //////////////////////////////////////////////////////////////////////////////////
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [bill, setBill] = React.useState<Partial<BillInterface>>({});
  const [paymenttype, setPaymenttype] = React.useState<PaymenttypeInterface[]>([]);
  const [quotacode, setQuotacode] = React.useState<QuotaCodeInterface[]>([]);
  const [quotacodeall, setQuotacodeall] = React.useState<QuotaCodeInterface[]>([]);
  const [service, setService] = React.useState<ServiceInterface[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const [alertmsg, setAlertmsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  //////////////////////////////////////////////////////////////////////////////////

  //หน่วงเวลา
  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  //////////////////////////////////////////////////////////////////////////////////
  /* ฟังก์ชั่นสำหรับ popup*/
  //////////////////////////////////////////////////////////////////////////////////
  const handleClickpop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosepop = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const pop1 = open ? 'simple-popover' : undefined;
  //////////////////////////////////////////////////////////////////////////////////
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

  //ฟังชั่นสำหรับคำนวณค่าใช้จ่ายทั้งหมดในบิล
  let cal: (value_cal: number) => number =
    function (value_cal: number) {
      sum = 0;
      sum = price_service[0] - discount_promotion[value_cal - 1]
      console.log(discount_promotion[value_cal - 1])
      console.log(sum)
      return sum;
    };

  //////////////////////////////////////////////////////////////////////////////////
  /* ฟังก์ชั่นสำหรับ submit สำหรับส่งข้อมูลไป backend*/
  //////////////////////////////////////////////////////////////////////////////////
  function submit() {
    let bill_p = {
      Service_ID: bill.Service_ID,
      QuotaCode_ID: bill.QuotaCode_ID,
      Paymenttype_ID: bill.Paymenttype_ID,
      Bill_Price: bill.Bill_Price,
      Time_Stamp: date,
    };
    console.log(bill_p)
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bill_p),
    };
    fetch(`${apiUrl}/bills`, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
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

  //ดึงข้อมูล Quotacode ที่สามารถใช้งานได้ (bill_id = 0)
  const getQuotacode = async () => {
    const apiUrl = "http://localhost:8080/quotacode";
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
          setQuotacode(res.data);
        }
      });
  };

  const getQuotacodeAll = async () => { //ใช้สำหรับดึง Quotacode ทั้งหมด เพื่อที่จะใช้ในการ map หาส่วนลด
    const apiUrl = "http://localhost:8080/quotacodes";
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
          setQuotacodeall(res.data);
        }
      });
  };

  const getPaymentType = async () => { //ใช้ดึง paymenttype ทั้งหมด
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

  const getServiceBill = async () => { //ใช้สำหรับดึงข้อมูล service ของเฉพาะของลูกค้า
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/b_services/${localStorage.getItem("uid")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setService(res.data);
          setBill({ ...bill, Service_ID: res.data[0].ID, Bill_Price: sum }) //ทำการเซ็ท service_id ให้กับ bill โดยเอา ID ของ array[0]
          //ทำการเซ็ทค่า bill price โดยมีค่าเริ่มต้นมาจาก service_price ไม่สามารถเซ็ตเป็น setBill แยกเป็น 2 อันได้เนื่องจากข้อมูลที่เซ็ตตอนแรกจะหายไป
          console.log(bill)
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getPaymentType();
    getQuotacode();
    getServiceBill();
    getQuotacodeAll();
  }, []);


  var discount_promotion = quotacodeall.map((item: QuotaCodeInterface) => (item.Promotion.Price)); //เก็บค่าจำนวนเงินที่ได้จากส่วนลดของโปรโมชั่น
  var price_service = service.map((item: ServiceInterface) => (item.Bill_Price)); //เก็บค่าจำนวนเงินที่ได้จาก service ของลูกค้า
  sum = price_service[0]; //กำหนดค่าในตัวแปรให้เป็นค่าใช้จ่ายที่ได้จาก service_price เพื่อนำไปเซ็ทในตัวแปร bill.Bill_Price เนื่องจากถ้าใช้ตัวแปรธรรมดา ค่าจะไม่ถูกเปลี่ยน
  console.log(discount_promotion)
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
                <TextField
                  fullWidth
                  id="service-read-only-input"
                  label="Read Only"
                  defaultValue={0}
                  value={bill.Service_ID}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="filled"
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
                  id="quotacode-auto"
                  options={quotacode}
                  fullWidth
                  size="medium"
                  onChange={(event: any, value) => {
                    sum = cal(Number(value?.ID));
                    setBill({ ...bill, QuotaCode_ID: value?.ID, Bill_Price: sum }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) =>
                    `${option.Promotion.Codetype.Type}`
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
                      >{`${option.Promotion.Codetype.Type}`}</li>
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
                <h3>Price</h3>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={bill.Bill_Price}
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
          <Grid item xs={5}
          >
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
          <Grid item xs={2}>
          </Grid>
          <Grid container item xs={5} direction='row-reverse'>
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
        </Paper>
      </Box>
    </Container>
  );
}
export default Bill;
