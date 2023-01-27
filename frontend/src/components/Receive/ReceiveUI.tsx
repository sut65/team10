import React, { useEffect, useState } from "react";

/* Grid */
import { Alert, Box, FormControl, MenuItem, Paper, Select, SelectChangeEvent, Snackbar } from "@mui/material";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import StorefrontIcon from '@mui/icons-material/Storefront';
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
import { ReceiveInterface } from "../../models/receive/IReceive";
import { BillInterface } from "../../models/bill/IBill";
import { DetergentInterface } from "../../models/receive/IDetergent";
import { SoftenerInterface } from "../../models/receive/ISoftener";
import Bill from "../bill/BillUI";

function ReceiveCreate (){
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [receive, setReceive] = React.useState<Partial<ReceiveInterface>>({});
  const [bill, setBill] = React.useState<BillInterface[]>([]);
  const [detergent, setDetergent] = React.useState<DetergentInterface[]>([]);
  const [softener, setSoftener] = React.useState<SoftenerInterface[]>([]);
  const [det_quantity, setDet_Quantity] = React.useState<number | null>(null);
  const [sof_quantity, setSof_Quantity] = React.useState<number | null>(null);
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

function submit() {
  let receive_data = {
    Bill_ID: receive.Bill_ID,
    Detergent: receive.Detergent_ID,
    Det_Quantity: receive.Det_Quantity,
    Softener: receive.Softener_ID,
    Sof_Quantity: receive.Sof_Quantity,
    Time_Stamp: date,
  };

const apiUrl = "http://localhost:8080";
const requestOptionsPost = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(receive_data),
};

fetch(`${apiUrl}/receive`, requestOptionsPost)
  .then((response) => response.json())
  .then((res) => {
      console.log(res)
      if (res.data) {
          setSuccess(true);
      } else {
          setError(true);
      }
  });
}
  // const getBill = async () => {
  //   const apiUrl = `http://localhost:8080/bills`;
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   fetch(apiUrl, requestOptions)
  //     .then((response) => response.json()) 
  //     .then((res) => {
  //       console.log(res.data);
  //       if (res.data) {
  //         setBill(res.data);
  //       } else {
  //         console.log("else");
  //       }
  //     });
  // };

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

  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setSuccess(false);
  //   setError(false);
  // };




  // const handleInputChange = (
  //   event: React.ChangeEvent<{ id?: string; value: any }>
  // ) => {
  //   const id = event.target.id as keyof typeof ReceiveCreate;
  //   const { value } = event.target;
  //   setReceive({ ...receive, [id]: value });
  // };

  // const handleChange = (event: SelectChangeEvent<number>) => {
  //   const name = event.target.name as keyof typeof receive;
  //   setReceive({
  //     ...receive,
  //     [name]: event.target.value,
  //   });
  // };

  // const requestOptionsGet = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

//================================================================================================================//

  useEffect(() => {
    getDetergent();
    getSoftener();
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
            <Box>
                <Paper>
                    <Grid sx={{ padding: 3 }}>
                        <h1>RECEIVE</h1></Grid>
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
                      `${option.Bill}`
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
                        >{`${option.Bill}`}</li>
                      ); 
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
                      `${option.Detergent}`
                    }
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
                        >{`${option.Detergent}`}</li>
                      );
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
                    fullWidth
                    id="Detergent Quantity"
                    label="Detergent Quantity"
                    variant="outlined"
                    defaultValue=" "
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
                      `${option.Softener}`
                    } 
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
                        >{`${option.Softener}`}</li>
                      ); 
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
                    fullWidth
                    id="Detergent Quantity"
                    label="Detergent Quantity"
                    variant="outlined"
                    defaultValue=" "
                    InputProps={{
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={3}>
                  <h3>Time Stamp</h3>
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
                </Paper>
                <Grid container spacing={2}
                    sx={{ paddingY: 2 }}>
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
                    <Grid container item xs={7} direction='row-reverse'>
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
            </Box>
        </Container>
  );
}
export default ReceiveCreate;
