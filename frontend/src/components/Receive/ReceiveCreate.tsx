import React, {useState } from "react";
import { useEffect } from "react";

/* Grid */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Snackbar, Alert, Popover, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container } from "@material-ui/core";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link as RouterLink } from "react-router-dom";
/* combobox */
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

/* Datetimepicker */
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

/* Interface */
import { ReceiveInterface } from "../../models/receive/IReceive";
import { BillInterface } from "../../models/bill/IBill";
import { DetergentInterface } from "../../models/receive/IDetergent";
import { SoftenerInterface } from "../../models/receive/ISoftener";
import UpdateReceive from "./UpdateReceive";

function ReceiveCreate (){
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [receive, setReceive] = React.useState<Partial<ReceiveInterface>>({});
  const [bill, setBill] = React.useState<BillInterface[]>([]);
  const [detergent, setDetergent] = React.useState<ReceiveInterface[]>([]);
  const [softener, setSoftener] = React.useState<ReceiveInterface[]>([]);
  const [det_quantity, setDet_Quantity] = React.useState<number | null>(null);
  const [sof_quantity, setSof_Quantity] = React.useState<number | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [alertmessage,setAlertMessage] = useState("");
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  //================================================================================================================//

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

function submit() {
  let receive_data = {
    Employee_ID: Number(localStorage.getItem("uid")),
    Bill_ID: receive.Bill_ID,
    Detergent_ID: receive.Detergent_ID,
    Det_Quantity: det_quantity,
    Softener_ID: receive.Softener_ID,
    Sof_Quantity: sof_quantity,
    Time_Stamp: date,
  };
 

const apiUrl = "http://localhost:8080";
const requestOptions = {
  method: "POST",
  headers: {  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json" },
  body: JSON.stringify(receive_data),
};

fetch(`${apiUrl}/receives`, requestOptions)
  .then((response) => response.json())
  .then(async (res) => {
    if (res.data) {
      setSuccess(true);
      setAlertMessage("บันทึกข้อมูลสำเร็จ")
      console.log(res.data)
      await timeout(1000); //for 1 sec delay
          window.location.href = "/receive"; 
    } else {
      setError(true);
      setAlertMessage(res.error)
    }
  });
}

const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
};


const handleClosePopover = () => {
  setAnchorEl(null);
};

const open = Boolean(anchorEl);
const popover = open ? "simple-popover" : undefined;

const getBill = async () => {
  const apiUrl = `http://localhost:8080/receivebillstate`;
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
        setBill(res.data);
      } 
    });
};

  const getDetergent = async () => {
    const apiUrl = `http://localhost:8080/detergents`;
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
          setDetergent(res.data);
        } 
      });
  };

  const getSoftener = async () => {
    const apiUrl = `http://localhost:8080/softeners`;
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
          setSoftener(res.data);
        } 
      });
  };

//================================================================================================================//

  useEffect(() => {
    getDetergent();
    getSoftener();
    getBill();
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
            <Box sx={{ padding: 2
                     }}>
                <Paper>
                    <Grid container spacing={0} sx={{ padding: 2
                     }}>
                    <h1>RECEIVE<AddShoppingCartIcon color="success" sx={{ fontSize: 200 }}/></h1> 
                    </Grid>

                        <Grid
                        container
                        justifyContent={"center"}
                        sx={{
                          paddingY: 1,
                        }}
                      >
                        <Grid item xs={3}>
                            <h3>Bill ID</h3>
                        </Grid>
                        <Grid item xs={5} >
                        <Autocomplete
                    id="bill-auto"
                    options={bill}
                    fullWidth
                    size="medium"
                    onChange={(event: any, value) => {
                        setReceive({ ...receive, Bill_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.ID}`
                    } //filter value
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Bill"
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
                        <Grid
                        container
                        justifyContent={"center"}
                        sx={{
                          paddingY: 1,
                        }}
                      >
                        <Grid item xs={3}>
                            <h3>Detergent</h3>
                        </Grid>
                        <Grid item xs={5} >
                        <Autocomplete
                    id="detergent-auto"
                    options={detergent}
                    fullWidth
                    size="medium"
                    onChange={(event: any, value) => {
                        setReceive({ ...receive, Detergent_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Brand.Band_Name} ${option.Size.Size_Name}`
                    } //filter value
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Detergent"
                        />
                      );
                    }}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li
                          {...props}
                          value={`${option.ID}`}
                          key={`${option.ID}`}
                        >{`${option.Brand.Band_Name} ${option.Size.Size_Name}`}</li>
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
                  <h3>Detergent Quantity</h3>
                  </Grid>
                <Grid item xs={5}>
                  <TextField
                   
                    id="Detergent Quantity"
                    label="Quantity"
                    variant="outlined"
                    defaultValue=" "
                    onChange={(event) => setDet_Quantity(Number(event.target.value))}
                    inputProps={{ type: "number" }}
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
                            <h3>Softener</h3>
                        </Grid>
                        <Grid item xs={5} >
                        <Autocomplete
                    id="softener-auto"
                    options={softener}
                    fullWidth
                    size="medium"
                    onChange={(event: any, value) => {
                        setReceive({ ...receive, Softener_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Brand.Band_Name}  ${option.Size.Size_Name}`
                    } //filter value
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Softener"
                        />
                      );
                    }}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li
                          {...props}
                          value={`${option.ID}`}
                          key={`${option.ID}`}
                        >{`${option.Brand.Band_Name}  ${option.Size.Size_Name}`}</li>
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
                  <h3>Sotener Quantity</h3>
                  </Grid>
                <Grid item xs={5}>
                  <TextField
                   
                    id="Sotener Quantity"
                    label="Quantity"
                    variant="outlined"
                    defaultValue=" "
                    onChange={(event) => setSof_Quantity(Number(event.target.value))}
                    inputProps={{ type: "number" }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={1.5}>
                <h3>Time Stamp</h3>
              </Grid>
                      <Grid item xs={6.5}>
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
                            color="success"
                            onClick={submit}
                            endIcon={<SaveIcon />}
                        >
                            Commit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
  );
}
export default ReceiveCreate;
