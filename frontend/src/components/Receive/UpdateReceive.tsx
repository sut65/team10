import React, { useState } from "react";
import { useEffect } from "react";
/* Grid */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link as RouterLink, useParams } from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';

/* Datetimepicker */
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { ReceiveInterface } from "../../models/receive/IReceive";
function UpdateReceive() {
  const params = useParams()
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [receive, setReceive] = React.useState<Partial<ReceiveInterface>>({});
  const [Det_Quantity, setDet_Quantity] = React.useState<number | null>(null);
  const [Sof_Quantity, setSof_Quantity] = React.useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [receive_id, setReceive_ID] = React.useState<ReceiveInterface[]>([]);
  const [alertmessage,setAlertMessage] = useState("");
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
          setAlertMessage("บันทึกข้อมูลสำเร็จ")
          await timeout(1000); //for 1 sec delay
          window.location.href = "/receive";      
          
        } else {
          setError(true);
          setAlertMessage(res.error)
          console.log(res.data);
        }
      });
  }




  const getReceive = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8080/receive/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setReceive(res.data);
          setReceive_ID(res.data.ID);
        }
      });
  };


  useEffect(() => {
    getReceive();
  }, []);
  return (

    <Container maxWidth="md">
      <Snackbar // บันทึกสำเร็จ
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success">
          {alertmessage}
        </Alert>
      </Snackbar>

      <Snackbar // บันทึกไม่สำเร็จ
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error">
          {alertmessage}
        </Alert>
      </Snackbar>
      <Box sx={{ padding: 2}}>
        <Paper>
        <Grid sx={{ padding: 2 }}>
            <h1>RECEIVE<AddShoppingCartIcon color="success" sx={{ fontSize: 200 }}/></h1> 
            </Grid>
            <Grid container spacing={2} sx={{ paddingX: 15 }}>
            <Grid item xs={4}>
              <h3>Bill ID</h3>
            </Grid>
            <Grid item xs={8} >
            <TextField
               id="Employee_ID"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={receive_id}             
               sx={{ width : 350 }}
             ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ paddingX: 15}}>
            <Grid item xs={4}>
              <h3>Detergent Quantity</h3>
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
          <Grid container spacing={2} sx={{ paddingX: 15 }}>
            <Grid item xs={4}>
              <h3>Softener Quantity</h3>
            </Grid>
            <Grid item xs={8}>
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

          <Grid container spacing={2} sx={{ paddingX: 15 }}>
            <Grid item xs={3}>
              <h3>Time Stamp</h3>
            </Grid>
           
            <Grid item xs={8.8}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticTimePicker
                          ampm
                          orientation="landscape"
                          openTo="minutes"
                          value={date}
                          onChange={(newValue: Dayjs | null) => {
                            setDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      </Grid>
            </Grid>
         
        </Paper>
        <Grid container spacing={2}
                    sx={{ paddingY: 1 }}>
                    <Grid item xs={8}
                    >
                        <Button
                        component={RouterLink}
                        to="/receive"
                            variant="contained"
                            color="error"
                            endIcon={<CancelIcon />}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
          </Grid>
                    <Grid container item xs={2} direction='row-reverse'>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={update}
                            endIcon={<SaveIcon />}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
      </Box>
    </Container>
  );
}

export default UpdateReceive;
