import React, { useEffect, useState } from "react";

/* Grid */
import { FormControl, MenuItem, Paper, Select, SelectChangeEvent } from "@mui/material";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';
import Box from '@mui/material/Box';
import MuiAlert, { AlertProps } from "@mui/material/Alert";

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ReceiveCreate = () => {
  const [receive, setReceive] = React.useState<Partial<ReceiveInterface>>({
    Bill_ID: 0,
    Detergent_ID: 0,
    Softener_ID: 0,
  });

  const [bill, setBill] = React.useState<BillInterface[]>([]);
  const [detergent, setDetergent] = React.useState<DetergentInterface[]>([]);
  const [softener, setSoftener] = React.useState<SoftenerInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  //================================================================================================================//

  const getBill = async () => {
    const apiUrl = `http://localhost:8080/bills`;
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
        } else {
          console.log("else");
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
        } else {
          console.log("else");
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
        } else {
          console.log("else");
        }
      });
  };

  //================================================================================================================//

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ReceiveCreate;
    const { value } = event.target;
    setReceive({ ...receive, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof receive;
    setReceive({
      ...receive,
      [name]: event.target.value,
    });
  };

  const requestOptionsGet = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  function submit() {
    let data = {
      Bill_ID: receive.Bill_ID,
      Detergent: receive.Detergent_ID,
      Det_Quantity: receive.Det_Quantity,
      Softener: receive.Softener_ID,
      Sof_Quantity: receive.Sof_Quantity,
    };

//================================================================================================================//

const apiUrl = "http://localhost:8080";
const requestOptionsPost = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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

//================================================================================================================//

  React.useEffect(() => {
    getBill();
    getDetergent();
    getSoftener();
    submit();
  }, []);

function setDate(newValue: DateConstructor | null) {
  throw new Error("Function not implemented.");
}
return (
      <Container maxWidth="md">
        <Paper>
         <Grid sx={{padding:3}}>
          <h1>Recieve</h1></Grid>
            <Grid container spacing={5}>
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
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[bill]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Bill_ID" />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 0,
                }}
              >
                <Grid item xs={3}>
                  <h3>Detergent</h3>
                </Grid>
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[detergent]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Detergent" />
                    )}
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
                    defaultValue="0"
                    InputProps={{
                    }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent={"center"}
                sx={{
                  paddingY: 0,
                }}
              >
                <Grid item xs={3}>
                  <h3>Softener</h3>
                </Grid>
                <Grid item xs={5}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[softener]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Softener" />
                    )}
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
                  <h3>Softener Quantity</h3>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    id="Softener Quantity"
                    label="Softener Quantity"
                    variant="outlined"
                    defaultValue="0"
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
                  <h3>Time Stamp</h3>
                </Grid>
                <Grid item xs={5}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="DateTimePicker"
                      renderInput={(params) => <TextField {...params} />}
                      value={Date}
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
export default ReceiveCreate;
