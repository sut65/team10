/* -------------------------------------------------------------------------- */
/*                                Header Import                               */
/* -------------------------------------------------------------------------- */
import { Box, Container, FormControl, Grid } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { Popover, Snackbar, Stack, TextField, Paper } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

import SaveIcon from "@mui/icons-material/Save";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";

import dayjs, { Dayjs } from "dayjs";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RecvTypeInterface } from "../../models/confirmation/IRecvType";
import { ConfirmationInterface } from "../../models/confirmation/IConfirmation";
import { CompleteInterface } from "../../models/complete/IComplete";
import ConfirmationUpdate from "./ConfirmationUpdate";
import ConfTable from "./ConfTable";
import Swal from "sweetalert2";
/* -------------------------------------------------------------------------- */
/*                                    Style                                   */
/* -------------------------------------------------------------------------- */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
/* -------------------------------------------------------------------------- */
/*                                    React                                   */
/* -------------------------------------------------------------------------- */
function Confirmation() {
  /* -------------------------------------------------------------------------- */
  /*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  const [recvtime, setRecvTime] = useState<Dayjs | null>(dayjs);
  const [recvtype, setRecvType] = useState<RecvTypeInterface[]>([]);
  // const [complete, setComplete] = useState<CompleteInterface[]>([]);
  const [last_complete, setLastComplete] = useState<CompleteInterface[]>([]);
  const [confirmation, setConfirmation] = useState<
    Partial<ConfirmationInterface>
  >({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customerName, setCustomerName] = useState<string | undefined>(
    undefined
  );
  const [last_complete_id, setLastCompleteID] = useState<number | undefined>(
    undefined
  );
  const [noAccess, setNoAccess] = React.useState(false);

  /* ---------------------------------- Popup --------------------------------- */
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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

  /* ---------------------------------- Popup --------------------------------- */
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
  /* ------------------------------- DatePicker ------------------------------- */
  const handleDateTime = (newValue: Dayjs | null) => {
    setRecvTime(newValue);
  };

  const handleChange = (event: any) => {
    const name = event.target.name as keyof typeof confirmation;
    setConfirmation({
      ...confirmation,
      [name]: event.target.value,
    });
  };
  /* -------------------------------- Textfield ------------------------------- */
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Confirmation;
    const { value } = event.target;
    setConfirmation({ ...confirmation, [id]: value });
  };
  /* -------------------------------------------------------------------------- */
  /*                                  GET Data                                  */
  /* -------------------------------------------------------------------------- */
  const getRecvType = async () => {
    fetch(`${apiUrl}/recvtype`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRecvType(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getComplete = async () => {
    fetch(`${apiUrl}/c_complete/${localStorage.getItem("uid")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        // console.log(res)
        if (res.data) {
          // Check length of res array
          let length = res.data.length;
          // setComplete(res.data);
          // Select Lastest array and set value
          setLastComplete(res.data[length - 1]);
          setLastCompleteID(res.data[length - 1].ID);
        } else {
          Swal.fire({
            icon: "warning",
            title: "อุ๊ปส์...",
            text: res.error,
          });
          console.log("else");
        }
      });
  };

  const getConfirmation = async () => {
    fetch(`${apiUrl}/confirmation`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setConfirmation(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getCurrentCustomer = async () => {
    fetch(`${apiUrl}/customer/${localStorage.getItem("uid")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCustomerName(res.data.Customer_Name);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getComplete();
    getConfirmation();
    getRecvType();
    getCurrentCustomer();
  }, []);
  /* -------------------------------------------------------------------------- */
  /*                                 PUSH Submit                                */
  /* -------------------------------------------------------------------------- */
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      Complete_ID: convertType(last_complete_id),
      RecvType_ID: convertType(confirmation.RecvType_ID),
      DeliveryInstruction: confirmation.DeliveryInstruction,
      RecvTime: recvtime,
      Note: confirmation.Note,
      Customer_ID: Number(localStorage.getItem("uid")),
    };
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`${apiUrl}/confirmations`, requestOptionsPost)
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
  /*                                  HTML CSS                                  */
  /* -------------------------------------------------------------------------- */
  return (
    <Box flexGrow={1} paddingTop={0}>
      <Container maxWidth="lg">
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
          <Alert onClose={handleCloseSnackBar} severity="error">
            คุณไม่มีสิทธิการเข้าถึง
          </Alert>
        </Snackbar>
        <Paper style={{ background: "rgba(0, 0, 0, 0.2)" }}>
          <h2 style={{ textAlign: "center", paddingTop: 20, color: "white" }}>
            <DryCleaningIcon style={{ fontSize: 30 }} />
            &nbsp;Confirmation
          </h2>
          <Grid container>
            <Grid xs={6}>
              <Stack paddingLeft={2}>
                <Paper style={{ background: "rgba(255,201,60,1)" }}>
                  <Box paddingLeft={2} paddingBottom={2}>
                    <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                      <PersonIcon style={{ fontSize: 15 }} />
                      &nbsp;Customer Info
                    </div>
                    <Stack>UID: {localStorage.getItem("uid")}</Stack>
                    <Stack>Name: {customerName}</Stack>
                  </Box>
                </Paper>
              </Stack>
              <Stack paddingLeft={2} paddingY={2}>
                <Paper style={{ background: "rgba(255,201,60,1)" }}>
                  <Box paddingX={2} paddingBottom={2}>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Service Complete Info
                    </div>
                    <TextField
                      hiddenLabel
                      id="LastCompID"
                      fullWidth
                      defaultValue={"No Input"}
                      value={last_complete_id}
                      // Can directly use with array if
                      // value={last_complete[0].ID}
                      variant="filled"
                      size="small"
                      disabled
                    />
                  </Box>
                </Paper>
              </Stack>
              <Stack paddingLeft={2} paddingBottom={2}>
                <Paper style={{ background: "rgba(255,201,60,1)" }}>
                  <Box paddingX={2} paddingBottom={2}>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Confirmation History
                    </div>
                    {/* call the table  */}
                    <ConfTable />
                  </Box>
                </Paper>
              </Stack>
            </Grid>
            <Grid xs={6}>
              <Stack paddingX={2} paddingBottom={2}>
                <Paper style={{ background: "rgba(255,201,60,1)" }}>
                  <Box paddingBottom={2} paddingX={2}>
                    <Stack>
                      <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                        Delivery Instruction
                      </div>
                      <FormControl fullWidth variant="outlined">
                        <TextField
                          id="DeliveryInstruction"
                          variant="outlined"
                          type="string"
                          size="medium"
                          multiline={true}
                          minRows={2}
                          maxRows={2}
                          placeholder="Insert delivery instruction details"
                          value={confirmation.DeliveryInstruction || ""}
                          onChange={handleInputChange}
                          sx={{ bgcolor: "#feefd1" }}
                        />
                      </FormControl>
                    </Stack>
                    <Stack>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          paddingBottom: 10,
                        }}
                      >
                        Receive Method
                      </div>
                      <Autocomplete
                        id="recvtype-autocomplete"
                        options={recvtype}
                        fullWidth
                        size="small"
                        style={{ background: "#feefd1" }}
                        onChange={(event: any, value) => {
                          //Get ID from ...interface
                          setConfirmation({
                            ...confirmation,
                            RecvType_ID: value?.ID,
                          }); //Just Set ID to interface
                        }}
                        sx={{ bgcolor: "#feefd1" }}
                        getOptionLabel={(option: any) => `${option.Name}`} //filter value
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
                            >{`${option.Name}`}</li>
                          ); //display value
                        }}
                      />
                    </Stack>
                    <Stack>
                      <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                        Receive Time
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack sx={{ bgcolor: "#feefd1" }}>
                          <DateTimePicker
                            value={recvtime}
                            onChange={handleDateTime}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Stack>
                    <Stack>
                      <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                        Note
                      </div>
                      <FormControl fullWidth variant="outlined">
                        <TextField
                          id="Note"
                          variant="outlined"
                          type="string"
                          size="medium"
                          multiline={true}
                          minRows={1}
                          maxRows={2}
                          placeholder="Insert Note"
                          value={confirmation.Note || ""}
                          onChange={handleInputChange}
                          sx={{ bgcolor: "#feefd1" }}
                        />
                      </FormControl>
                    </Stack>
                    <Grid
                      container
                      style={{ marginTop: 10, justifyContent: "flex-end" }}
                    >
                      <Button
                        component={RouterLink}
                        to="/"
                        variant="contained"
                        color="error"
                        endIcon={<CancelIcon />}
                        sx={{ paddingLeft: 2, marginRight: 2 }}
                      >
                        Cancel
                      </Button>
                      <div>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={handleClick}
                          endIcon={<UpdateIcon />}
                          sx={{ marginRight: 2 }}
                        >
                          Update
                        </Button>
                        <Popover
                          id={id}
                          open={open}
                          sx={{ paddingBottom: 20 }}
                          anchorEl={anchorEl}
                          marginThreshold={50}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <ConfirmationUpdate />
                        </Popover>
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        endIcon={<SaveIcon />}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Box>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
export default Confirmation;
