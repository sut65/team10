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
import { Popover, Stack, TextField } from "@mui/material";
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
import ConfirmationUpdate from "./ConfirmationUpdate";

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

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    fetch(`${apiUrl}/complete`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setComplete(res.data);
        } else {
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

  useEffect(() => {
    getComplete();
    getConfirmation();
    getRecvType();
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
      Complete_ID: convertType(confirmation.Complete_ID),
      //Complete_ID: convertType("1"), //Test Complete_ID
      RecvType_ID: convertType(confirmation.RecvType_ID),
      RecvAddress: confirmation.RecvAddress,
      RecvTime: recvtime,
      Note: confirmation.Note,
      //Customer_ID: Number(localStorage.getItem("uid")),
      Customer_ID: Number(3),//Debug
    };
    console.log(data);
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
          //AutoPageSwap();
        } else {
          setError(true);
          setErrorMessage(res.error);
        }
      });
  }
  /* -------------------------------------------------------------------------- */
  /*                                PATCH Update                                */
  /* -------------------------------------------------------------------------- */
  return (
    <Box flexGrow={1} paddingTop={2}>
      <Container maxWidth="md">
        <Paper style={{ background: "rgba(0, 0, 0, 0.2)" }}>
          <h2 style={{ textAlign: "center", paddingTop: 20, color: "white" }}>
            Confirmation
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
                    <Autocomplete
                      id="complete-autocomplete"
                      options={complete}
                      fullWidth
                      size="small"
                      style={{ background: "#feefd1" }}
                      onChange={(event: any, value) => {
                        //Get ID from ...interface
                        setConfirmation({
                          ...confirmation,
                          Complete_ID: value?.ID,
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
                        Receive Address
                      </div>
                      <FormControl fullWidth variant="outlined">
                        <TextField
                          id="RecvAddress"
                          variant="outlined"
                          type="string"
                          size="medium"
                          multiline={true}
                          minRows={2}
                          maxRows={2}
                          placeholder="Insert Address Details"
                          value={confirmation.RecvAddress || ""}
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
                          sx={{paddingBottom: 20}}
                          anchorEl={anchorEl}
                          marginThreshold={50}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <ConfirmationUpdate/>
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
