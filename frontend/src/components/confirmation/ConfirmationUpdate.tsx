/* -------------------------------------------------------------------------- */
/*                                Header Import                               */
/* -------------------------------------------------------------------------- */
import { Box, FormControl, Grid, Select } from "@material-ui/core";
import { Snackbar, Stack, TextField, Paper } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import UpdateIcon from "@mui/icons-material/Update";
import PersonIcon from "@mui/icons-material/Person";

import dayjs, { Dayjs } from "dayjs";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RecvTypeInterface } from "../../models/confirmation/IRecvType";
import { ConfirmationInterface } from "../../models/confirmation/IConfirmation";
import { CompleteInterface } from "../../models/complete/IComplete";
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
  const [complete, setComplete] = useState<CompleteInterface[]>([]);
  const [confirmation, setConfirmation] = useState<
    Partial<ConfirmationInterface>
  >({});
  const [confirmationTemp, setConfirmationTemp] = useState<
    ConfirmationInterface[]
  >([]);
  /* ---------------------------- Display in Update --------------------------- */
  const [confirmation_id, setConfirmation_ID] = useState<number | undefined>(
    undefined
  );
  const [old_recv_ins, setOldDeliveryInstruction] = useState<string>("");
  const [old_note, setOldNote] = useState<string>("");
  const [old_recv_type, setOldRecvType] = useState<string | undefined>(
    undefined
  );
  const [old_recv_time, setOldRecvTime] = useState<any | undefined>(undefined);
  const [cust_name, setCustomerName] = useState<string>("");
  const [cust_id, setCustomerID] = useState<number | undefined>(undefined);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const getConfirmationByID = async () => {
    fetch(
      `${apiUrl}/confirmation/${localStorage.getItem("uid")}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          //setConfirmationTemp(res.data);
          setCustomerID(res.data.Customer.ID);
          setCustomerName(res.data.Customer.Customer_Name);
          setOldNote(res.data.Note);
          setOldDeliveryInstruction(res.data.DeliveryInstruction);
          setOldRecvTime(res.data.RecvTime);
          setOldRecvType(res.data.RecvType.Name);
          setConfirmation_ID(res.data.ID);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getConfirmationByID();
    getRecvType();
  }, []);
  /* -------------------------------------------------------------------------- */
  /*                                 PUSH Submit                                */
  /* -------------------------------------------------------------------------- */
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  /* -------------------------------------------------------------------------- */
  /*                                PATCH Update                                */
  /* -------------------------------------------------------------------------- */
  async function update() {
    let data = {
      ID: confirmation_id, //debug
      RecvType_ID: convertType(confirmation.RecvType_ID),
      DeliveryInstruction: confirmation.DeliveryInstruction,
      RecvTime: recvtime,
      Note: confirmation.Note,
    };
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`${apiUrl}/confirmations`, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
        if (res.data) {
          setSuccess(true);
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
    <div style={{ background: "rgba(255,201,60,0.8)" }}>
      <div
        style={{
          textAlign: "center",
          color: "black",
          fontSize: "15px",
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        <UpdateIcon style={{ fontSize: 20 }} />
        &nbsp;Confirmation Updator
      </div>
      <Grid container>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackBar} severity="success">
            <div>Update successfully</div>
            <div>Refresh to see changes</div>
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
        <Grid xs={6}>
          <Stack paddingLeft={2}>
            <Paper style={{ background: "rgba(255,201,60,1)" }}>
              <Box paddingLeft={2} paddingBottom={2}>
                <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                  <PersonIcon style={{ fontSize: 15 }} />
                  &nbsp;Customer Info
                </div>
                <Stack>UID: {cust_id}</Stack>
                <Stack>
                  <div>Name: {cust_name}</div>
                </Stack>
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
                  Lastest Confirmation ID
                </div>
                <TextField
                  hiddenLabel
                  id="LastConfID"
                  fullWidth
                  defaultValue={"No Input"}
                  value={confirmation_id}
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
                  Saved Infomation
                </div>
                <div>Delivery Instruction</div>
                <div style={{ background: "#feefd1", color: "#0081C9" }}>
                  &#8205;{old_recv_ins}
                </div>
                <div>Receive Method</div>
                <div style={{ background: "#feefd1", color: "#0081C9" }}>
                  &#8205;{old_recv_type}
                </div>
                <div>Receive Time</div>
                <div style={{ background: "#feefd1", color: "#0081C9" }}>
                  &#8205;{old_recv_time}
                </div>
                <div>Note</div>
                <div style={{ background: "#feefd1", color: "#0081C9" }}>
                  &#8205;{old_note}
                </div>
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
                    New Delivery Instruction
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
                      placeholder={"Insert delivery instruction details"}
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
                    New Receive Method
                  </div>
                  <FormControl fullWidth variant="outlined" size="small">
                    <Select
                      native
                      value={confirmation.RecvType_ID + ""}
                      id="controllable-states-demo"
                      onChange={handleChange}
                      inputProps={{
                        name: "RecvType_ID",
                      }}
                      style={{ background: "#feefd1" }}
                    >
                      <option aria-label="None" value="">
                        Please select
                      </option>
                      {recvtype.map((item: RecvTypeInterface) => (
                        <option value={item.ID} key={item.ID}>
                          {item.Name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack>
                  <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                    New Receive Time
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
                    New Note
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
                    variant="contained"
                    color="warning"
                    onClick={update}
                    endIcon={<UpdateIcon />}
                    sx={{ marginRight: 2 }}
                  >
                    Update
                  </Button>
                </Grid>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
export default Confirmation;
