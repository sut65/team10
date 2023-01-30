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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ReceiveInterface } from "../../models/receive/IReceive";
function UpdateReceive() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [receive, setReceive] = React.useState<Partial<ReceiveInterface>>({});
  const [Det_Quantity, setDet_Quantity] = React.useState<number | null>(null);
  const [Sof_Quantity, setSof_Quantity] = React.useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [receive_id, serReceive_ID] = React.useState<ReceiveInterface[]>([]);

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

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

  function update() {
    let receive_update = {
      ID: receive.ID,
      Det_Quantity: Det_Quantity,
      Sof_Quantity:Sof_Quantity,
      Employee_ID: Number(localStorage.getItem("uid")),
      Time_Stamp: date,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receive_update),
    };
    console.log(receive_update);
    console.log(JSON.stringify(receive_update));

    fetch(`http://localhost:8080/receives`, requestOptions)
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




  const getReceive = async () => {
    const apiUrl = "http://localhost:8080/receive";
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
          setReceive(res.data);
          serReceive_ID(res.data);
        }
      });
  };

  useEffect(() => {
    getReceive();
  }, []);
  return (

    <Container maxWidth="xl">
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
      <Box sx={{ padding: 2}}>
        <Paper>
        <Grid container spacing={0} sx={{ padding: 2}}>
            <h1>RECEIVE<AddShoppingCartIcon color="success" sx={{ fontSize: 200 }}/></h1>
            </Grid>
            <Grid container spacing={2} sx={{ paddingX: 2 }}>
            <Grid item xs={4}>
              <h3>Bill ID</h3>
            </Grid>
            <Grid item xs={8} >
              <Autocomplete
                id="receive-auto"
                options={receive_id}
                fullWidth
                size="medium"
                onChange={(event: any, value) => {
                  setReceive({ ...receive, ID: value?.ID }); //Just Set ID to interface
                }}
                getOptionLabel={(option: any) =>
                  `${option.ID}`
                } //filter value
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="ID..."
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
            <Grid item xs={4}>
              <h3>Detergent</h3>
            </Grid>
            <Grid item xs={7}>
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                defaultValue=""
                onChange={(event) => setDet_Quantity(Number(event.target.value))}
                inputProps={{ type: "number" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 2 }}>
            <Grid item xs={4}>
              <h3>Softener</h3>
            </Grid>
            <Grid item xs={7}>
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                defaultValue=""
                onChange={(event) => setSof_Quantity(Number(event.target.value))}
                inputProps={{ type: "number" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 2 }}>
            <Grid item xs={4}>
              <h3>Time Stamp</h3>
            </Grid>
            <Grid item xs={8}>
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

export default UpdateReceive;
