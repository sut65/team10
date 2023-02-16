/* -------------------------------------------------------------------------- */
/*                                Header Import                               */
/* -------------------------------------------------------------------------- */
import { Box, Container, FormControl, Grid, Paper } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { Stack, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

import { ConfirmationInterface } from "../../models/confirmation/IConfirmation";
import { DeliveryInterface } from "../../models/delivery/IDelivery";
import { VehicleInterface } from "../../models/vehicle/IVehicle";
import DeliTable from "./DeliveryTable";
/* -------------------------------------------------------------------------- */
/*                                    Style                                   */
/* -------------------------------------------------------------------------- */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});
/* -------------------------------------------------------------------------- */
/*                                    React                                   */
/* -------------------------------------------------------------------------- */
function Delivery() {
  /* -------------------------------------------------------------------------- */
  /*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  /* ---------------------------------- main ---------------------------------- */
  const [delivery, setDelivery] = useState<Partial<DeliveryInterface>>({});
  const [confirmation, setConfirmation] = useState<ConfirmationInterface[]>([]);
  const [vehicle, setVehicle] = useState<VehicleInterface[]>([]);

  const [cust_name, setCustomerName] = useState<string | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(
    undefined
  );
  const [conf_deli_ins, setDeliveryInstruction] = useState<string | undefined>(
    undefined
  );
  const [conf_recvTime, setRecvTime] = useState<any | undefined>(undefined);
  const [conf_recvType, setRecvType] = useState<string | undefined>(undefined);
  const [conf_note, setNote] = useState<string | undefined>(undefined);

  /* ------------------------------- error text ------------------------------- */
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorNull, setErrorNull] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [noAccess, setNoAccess] = React.useState(false);
  /* -------------------------------------------------------------------------- */
  /*                                   Driver                                   */
  /* -------------------------------------------------------------------------- */
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  /* -------------------------------- SnackBar -------------------------------- */
  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
    setNoAccess(false);
  };
  /* -------------------------------- Textfield ------------------------------- */
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Delivery;
    const { value } = event.target;
    setDelivery({ ...delivery, [id]: value });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 POST Submit                                */
  /* -------------------------------------------------------------------------- */
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      Confirmation_ID: convertType(delivery.Confirmation_ID),
      Vehicle_ID: convertType(delivery.Vehicle_ID),
      Employee_ID: Number(localStorage.getItem("uid")),
      Score: convertType(delivery.Score),
      Problem: delivery.Problem,
    };
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`${apiUrl}/delivery`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          setErrorMessage("");
          window.location.reload();
        } else {
          setError(true);
          setErrorMessage(res.error);
        }
      });
  }
  /* -------------------------------------------------------------------------- */
  /*                                     GET                                    */
  /* -------------------------------------------------------------------------- */
  const getConfirmation = async () => {
    fetch(`${apiUrl}/confirmations`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        // console.log(res.data)
        if (res.data) {
          setConfirmation(res.data);
        } else {
          setErrorNull(true);
          setErrorMessage(res.error);
        }
      });
  };

  const getVehicle = async () => {
    fetch(`${apiUrl}/vehicle`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setVehicle(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getVehicle();
    getConfirmation();
  }, []);
  /* -------------------------------------------------------------------------- */
  /*                                  HTML CSS                                  */
  /* -------------------------------------------------------------------------- */
  return (
    <Box>
      <div>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackBar} severity="success">
            Save successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackBar} severity="error">
            Failed "{errorMessage}"
          </Alert>
        </Snackbar>
        <Snackbar
          open={noAccess}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackBar} severity="warning">
            คุณไม่มีสิทธิการเข้าถึง
          </Alert>
        </Snackbar>
        <Snackbar
          open={errorNull}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackBar} severity="warning">
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
      <Grid container>
        <Grid xs={7}>
          <Box flexGrow={1} paddingTop={2}>
            <Container maxWidth="md">
              <Paper
                style={{ background: "rgba(0, 0, 0, 0.2)", paddingBottom: 20 }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    paddingTop: 20,
                    color: "white",
                  }}
                >
                  Delivery
                </h2>
                <Grid container>
                  <Grid xs={6}>
                    <Stack paddingLeft={2}>
                      <Paper style={{ background: "rgba(255,201,60,1)" }}>
                        <Box paddingLeft={2} paddingBottom={2}>
                          <div
                            style={{
                              fontSize: "15px",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Customer Info
                          </div>
                          <Box paddingRight={2} paddingX={2}>
                            <Paper
                              elevation={10}
                              style={{ background: "rgba(255,201,60,1)" }}
                            >
                              <Box padding={2}>
                                <div>Name Surname</div>
                                <div
                                  style={{
                                    background: "#feefd1",
                                    color: "#0081C9",
                                  }}
                                >
                                  &#8205;{cust_name}
                                </div>
                                <div>Address</div>
                                <div
                                  style={{
                                    background: "#feefd1",
                                    color: "#0081C9",
                                  }}
                                >
                                  &#8205;{address}
                                </div>
                                <div>Delivery Instruction</div>
                                <div
                                  style={{
                                    background: "#feefd1",
                                    color: "#0081C9",
                                  }}
                                >
                                  &#8205;{conf_deli_ins}
                                </div>
                                <div>Receive Method</div>
                                <div
                                  style={{
                                    background: "#feefd1",
                                    color: "#0081C9",
                                  }}
                                >
                                  &#8205;{conf_recvType}
                                </div>
                                <div>Receive Time</div>
                                <div
                                  style={{
                                    background: "#feefd1",
                                    color: "#0081C9",
                                  }}
                                >
                                  &#8205;{conf_recvTime}
                                </div>
                                <div>Note</div>
                                <div
                                  style={{
                                    background: "#feefd1",
                                    color: "#0081C9",
                                  }}
                                >
                                  &#8205;{conf_note}
                                </div>
                              </Box>
                            </Paper>
                          </Box>
                        </Box>
                        <Box paddingX={2} paddingBottom={2}>
                          Confirmation ID
                          <Autocomplete
                            id="confirmation-autocomplete"
                            options={confirmation}
                            fullWidth
                            size="small"
                            style={{ background: "#feefd1" }}
                            onChange={(event: any, value) => {
                              //Get ID from ...interface
                              setDelivery({
                                ...delivery,
                                Confirmation_ID: value?.ID,
                              });
                              setCustomerName(value?.Customer.Customer_Name);
                              setDeliveryInstruction(value?.DeliveryInstruction);
                              setRecvTime(value?.RecvTime);
                              setRecvType(value?.RecvType.Name);
                              setNote(value?.Note);
                              setAddress(value?.Complete.Receive.Bill.Service.Address)
                              //Just Set ID to interface
                            }}
                            sx={{ bgcolor: "#feefd1" }}
                            getOptionLabel={(option: any) => `${option.ID}`} //filter value
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
                        </Box>
                      </Paper>
                    </Stack>
                  </Grid>
                  <Grid xs={6}>
                    <Stack paddingX={2}>
                      <Paper style={{ background: "rgba(255,201,60,1)" }}>
                        <Box paddingX={2} paddingBottom={2} paddingTop={2}>
                          Vehicle
                          <Grid container>
                            <Grid xs={1}>
                              <DeliveryDiningIcon />
                            </Grid>
                            <Grid xs={11}>
                              <Autocomplete
                                id="vehicle-autocomplete"
                                options={vehicle}
                                fullWidth
                                size="small"
                                style={{ background: "#feefd1" }}
                                onChange={(event: any, value) => {
                                  //Get ID from ...interface
                                  setDelivery({
                                    ...delivery,
                                    Vehicle_ID: value?.ID,
                                  }); //Just Set ID to interface
                                }}
                                sx={{ bgcolor: "#feefd1" }}
                                getOptionLabel={(option: any) => `${option.ID}`} //filter value
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
                        </Box>
                        <Box paddingX={2} paddingBottom={2}>
                          Score
                          <Grid container>
                            <Grid xs={1}>
                              <StarHalfIcon />
                            </Grid>
                            <Grid xs={11}>
                              <FormControl fullWidth variant="outlined">
                                <TextField
                                  id="Score"
                                  variant="outlined"
                                  size="medium"
                                  placeholder="1 - 5"
                                  value={delivery.Score || ""}
                                  onChange={handleInputChange}
                                  sx={{ bgcolor: "#feefd1" }}
                                  inputProps={{ type: "number" }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box paddingX={2} paddingBottom={2}>
                          Problem
                          <Grid container>
                            <Grid xs={1}>
                              <ReportProblemIcon />
                            </Grid>
                            <Grid xs={11}>
                              <FormControl fullWidth variant="outlined">
                                <TextField
                                  id="Problem"
                                  variant="outlined"
                                  type="string"
                                  size="medium"
                                  multiline={true}
                                  minRows={2}
                                  maxRows={2}
                                  placeholder="Input Problem"
                                  value={delivery.Problem || ""}
                                  onChange={handleInputChange}
                                  sx={{ bgcolor: "#feefd1" }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                        <Grid
                          container
                          style={{
                            marginTop: 10,
                            justifyContent: "flex-end",
                            paddingBottom: 10,
                            paddingRight: 20,
                          }}
                        >
                          <Button
                            component={RouterLink}
                            to="/"
                            variant="contained"
                            color="error"
                            startIcon={<ArrowBackIcon />}
                            sx={{ paddingLeft: 2, marginRight: 2 }}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={submit}
                            endIcon={<SendIcon />}
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Paper>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </Box>
        </Grid>
        <Grid xs={5} style={{paddingTop: 20}}>
          <DeliTable/>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Delivery;
