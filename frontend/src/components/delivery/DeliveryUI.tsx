/* -------------------------------------------------------------------------- */
/*                                Header Import                               */
/* -------------------------------------------------------------------------- */
import {
  Box,
  colors,
  Container,
  FormControl,
  Grid,
  Paper,
  Select,
} from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import { Popover, Snackbar, Stack, TextField } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

import SaveIcon from "@mui/icons-material/Save";
import UpdateIcon from "@mui/icons-material/Update";
import CancelIcon from "@mui/icons-material/Cancel";

import dayjs, { Dayjs } from "dayjs";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RecvTypeInterface } from "../../models/confirmation/IRecvType";
import { ConfirmationInterface } from "../../models/confirmation/IConfirmation";
import { CompleteInterface } from "../../models/complete/IComplete";
import { DeliveryInterface } from "../../models/delivery/IDelivery";
import Confirmation from "../confirmation/ConfirmationUpdate";
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
function Delivery() {
  /* -------------------------------------------------------------------------- */
  /*                                  Variable                                  */
  /* -------------------------------------------------------------------------- */
  /* ---------------------------------- main ---------------------------------- */
  const [delivery, setDelivery] = useState<Partial<DeliveryInterface>>({});
  const [confirmation, setConfirmation] = useState<ConfirmationInterface[]>([]);
  /* ------------------------------- error text ------------------------------- */
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [noAccess, setNoAccess] = React.useState(false);
  /* -------------------------------------------------------------------------- */
  /*                                   Driver                                   */
  /* -------------------------------------------------------------------------- */
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
    const id = event.target.id as keyof typeof Confirmation;
    const { value } = event.target;
    setConfirmation({ ...confirmation, [id]: value });
  };
  /* -------------------------------------------------------------------------- */
  /*                                 POST Submit                                */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                 PUSH Submit                                */
  /* -------------------------------------------------------------------------- */
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      Complete_ID: convertType(confirmation.Complete_ID),
      RecvType_ID: convertType(confirmation.RecvType_ID),
      RecvAddress: confirmation.RecvAddress,
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
    <Box flexGrow={1} paddingTop={2}>
      <Container maxWidth="md">
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
            Delivery
          </h2>
          <Grid container>
            <Grid xs={6}>
              <Stack paddingLeft={2}>
                <Paper style={{ background: "rgba(255,201,60,1)" }}>
                  <Box paddingLeft={2} paddingBottom={2}>
                    <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                      Customer Info
                    </div>
                    <Stack>[Customer ID]</Stack>
                    <Stack>[Customer Name]</Stack>
                    <Stack>[Customer RecvAddress]</Stack>
                    <Stack>[Customer RecvTime]</Stack>
                    <Stack>[Customer RecvMethod]</Stack>
                    <Stack>[Customer Note]</Stack>
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
                  </Box>
                </Paper>
              </Stack>
            </Grid>
            <Grid xs={6}>
              <Stack paddingX={2}>
                <Paper style={{ background: "rgba(255,201,60,1)" }}>
                  <Box paddingX={2} paddingBottom={2}>
                    Vehicle
                    <Autocomplete
                      id="vehicle-autocomplete"
                      options={confirmation}
                      fullWidth
                      size="small"
                      style={{ background: "#feefd1" }}
                      onChange={(event: any, value) => {
                        //Get ID from ...interface
                        setDelivery({
                          ...delivery,
                          Confirmation_ID: value?.ID,
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
                  </Box>
                  <Box paddingX={2} paddingBottom={2}>
                    Score
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        id="scorenumber"
                        variant="outlined"
                        type="string"
                        size="medium"
                        multiline={false}
                        minRows={1}
                        maxRows={1}
                        placeholder="Input Score 1-5"
                        value={delivery.Score || ""}
                        onChange={handleInputChange}
                        sx={{ bgcolor: "#feefd1" }}
                      />
                    </FormControl>
                  </Box>
                  <Box paddingX={2} paddingBottom={2}>
                    Problem
                    <FormControl fullWidth variant="outlined">
                      <TextField
                        id="problemtext"
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
                  </Box>
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submit}
                      endIcon={<SaveIcon />}
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
  );
}
export default Delivery;
