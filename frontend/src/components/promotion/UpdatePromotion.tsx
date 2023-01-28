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

import StorefrontIcon from '@mui/icons-material/Storefront';
/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { CodetypeInterface } from "../../models/promotion/ICodetype";
import { ReasonInterface } from "../../models/promotion/IReason";
import { PromotionInterface } from "../../models/promotion/IPromotion";
function UpdatePromotion() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [promotion, setPromotion] = React.useState<Partial<PromotionInterface>>({});
  const [price, setPrice] = React.useState<number | null>(null);
  const [amount, setAmount] = React.useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [promotion_id, setPromotion_ID] = React.useState<PromotionInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
    let promotion_u = {
      ID: promotion.ID,
      Codetype_ID: promotion.Codetype_ID,
      Reason_ID: promotion.Reason_ID,
      Price: price,
      Amount: amount,
      Employee_ID: Number(localStorage.getItem("uid")),
      Time_Stamp: date,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promotion_u),
    };
    console.log(JSON.stringify(promotion_u));

    fetch(`http://localhost:8080/promotions`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
          console.log(res.data);
        }
      });
  }




  const open = Boolean(anchorEl);

  const getPromotion = async () => {
    const apiUrl = "http://localhost:8080/promotion";
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
          setPromotion_ID(res.data);
        }
      });
  };

  useEffect(() => {
    getPromotion();
  }, []);
  return (

    <Container maxWidth="xl">
      <StorefrontIcon color="primary" sx={{ fontSize: 80 }} />
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
      <Box>
        <Paper>
          <Grid sx={{ padding: 2 }}>
            <h1>Promotion</h1>
            </Grid>
            <Grid container spacing={2} sx={{ paddingX: 2 }}>
            <Grid item xs={2}>
              <h3>ID</h3>
            </Grid>
            <Grid item xs={10} >
              <Autocomplete
                id="promption-auto"
                options={promotion_id}
                fullWidth
                size="medium"
                onChange={(event: any, value) => {
                  setPromotion({ ...promotion, ID: value?.ID }); //Just Set ID to interface
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


          <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 2 }}>
            <Grid item xs={2}>
              <h3>Price</h3>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                defaultValue="0"
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 2 }}>
            <Grid item xs={2}>
              <h3>Date Time</h3>
            </Grid>
            <Grid item xs={10}>
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
          </Grid>
          <Grid container item xs={7} direction='row-reverse'>
            <Button
              variant="contained"
              color="warning"
              onClick={update}
              endIcon={<SaveIcon />}
            >
              update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default UpdatePromotion;
