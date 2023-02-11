import React, { useEffect } from "react";

import { Link as RouterLink, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";

import Snackbar from "@mui/material/Snackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdvertiseInterface } from "../../models/customer/IAdvertise";
import { CustomerInterface } from "../../models/customer/ICustomer";
import { CareerInterface } from "../../models/customer/ICareer";
import { GendersInterface } from "../../models/Employee/IGender";
import { Autocomplete, SelectChangeEvent } from "@mui/material";
import { FormHelperText, MenuItem } from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateCustomer() {
  const params = useParams();
  const [customer, setCustomer] = React.useState<Partial<CustomerInterface>>(
    {}
  );
  const [advertise, setAdvertise] = React.useState<AdvertiseInterface[]>([]);
  const [career, setCareer] = React.useState<CareerInterface[]>([]);
  const [gender, setGender] = React.useState<GendersInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [message, setAlertMessage] = React.useState("");

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

  const getGenders = async () => {
    const apiUrl = `http://localhost:8080/genders`;

    const requestOptionsGet = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptionsGet)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

      .then((res) => {
        console.log(res.data); //show ข้อมูล

        if (res.data) {
          setGender(res.data);
        } else {
          console.log("else");
        }
      });
  };
  console.log(localStorage.getItem("token"))
  const getCareers = async () => {
    const apiUrl = `http://localhost:8080/careers`;

    const requestOptionsGet = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptionsGet)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

      .then((res) => {
        console.log(res.data); //show ข้อมูล

        if (res.data) {
          setCareer(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getAdvertises = async () => {
    const apiUrl = `http://localhost:8080/advertises`;

    const requestOptionsGet = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptionsGet)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

      .then((res) => {
        console.log(res.data); //show ข้อมูล

        if (res.data) {
          setAdvertise(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getCurrentCustomer = async () => {
    const requestOptionsGet = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:8080/customer/${localStorage.getItem("uid")}`, requestOptionsGet)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCustomer(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof customer;
    const { value } = event.target;
    setCustomer({ ...customer, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<any>) => {
    const name = event.target.name as keyof typeof customer;
    setCustomer({
      ...customer,
      [name]: event.target.value,
    });
  };

  function submitUpdate() {
    let data = {
      ID: Number(localStorage.getItem("uid")),
      Customer_Name: customer.Customer_Name ?? "",
      Customer_Username: customer.Customer_Username ?? "",
      Customer_Phone: customer.Customer_Phone ?? "",
      Customer_Promptpay: customer.Customer_Promptpay ?? "",
      Customer_Password: customer.Customer_Password ?? "",
      Customer_Address: customer.Customer_Address ?? "",
      Career_ID: Number(customer.Career_ID ?? ""),
      Gender_ID: Number(customer.Gender_ID ?? ""),
      Advertise_ID: Number(customer.Advertise_ID ?? ""),
    };

    //================================================================================================================//

    const apiUrl = "http://localhost:8080";

    const requestOptionsPost = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`http://localhost:8080/customers`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          // localStorage.clear();
          //window.location.reload();
          // window.location.href = "/";
        } else {
          setError(true);
          setAlertMessage(res.error);
        }
      });
  }
  useEffect(() => {
    getGenders();
    getCareers();
    getAdvertises();
    getCurrentCustomer();
  }, []);

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
        {message}
        </Alert>
      </Snackbar>
      <Box sx={{
        padding: 2
      }}>
        <Paper style={{ background: "rgba(0, 0, 0, 0.2)" }}>
          <h1 style={{ textAlign: "center", paddingTop: 20, color: "white" }}>
            <PersonAddAltSharpIcon style={{ fontSize: 30 }} />
            &nbsp;CUSTOMER
          </h1>
          <Divider />
          <Paper sx={{ml:5, mr:5, mt:1}}>
          <Grid container spacing={1} sx={{ padding: 5 }}>
              <Grid item xs={12}>
                <p>ชื่อ - นามสกุล</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Customer_Name"
                    variant="outlined"
                    type="string"
                    size="small"
                    value={customer.Customer_Name}
                    sx={{ width: 300 }}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>

            <Divider />

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <p>เพศ</p>
                  <Select 
                        native
                        sx={{ width: 300 }}
                        value={customer.Gender_ID + ""}
                        onChange={handleChange}
                        size="small"
                        inputProps={{
                          name: "Gender_ID",
                        }}
                      >
                        {gender.map((item: GendersInterface) => (
                          <option value={item.ID}>
                            {item.Gender_Name}
                          </option>
                        ))}
                      </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <p>อาชีพ</p>
                <FormControl fullWidth variant="outlined">
                <Select
                        native
                        sx={{ width: 300 }}
                        value={customer.Career_ID + ""}
                        onChange={handleChange}
                        size="small"
                        inputProps={{
                          name: "Career_ID",
                        }}
                      >
                        {career.map((item: CareerInterface) => (
                          <option value={item.ID}>
                            {item.Career_Name}
                          </option>
                        ))}
                      </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <p>Username</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Customer_Username"
                    variant="outlined"
                    type="string"
                    size="small"
                    sx={{ width: 300 }}
                    value={customer.Customer_Username}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <p>Password</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Customer_Password"
                    variant="outlined"
                    type="password"
                    size="small"
                    sx={{ width: 300 }}
                    value={customer.Customer_Password}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <p>เบอร์โทรศัพท์</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Customer_Phone"
                    variant="outlined"
                    type="string"
                    size="small"
                    sx={{ width: 300 }}
                    value={customer.Customer_Phone}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <p>PromPay</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Customer_Promptpay"
                    variant="outlined"
                    type="string"
                    size="small"
                    sx={{ width: 300 ,marginBottom:2}}
                    value={customer.Customer_Promptpay}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <p>คุณรู้จักเราได้จากที่ไหน</p>
                <FormControl fullWidth variant="outlined">
                <Select
                        sx={{ width: 300 }}
                        native
                        value={customer.Advertise_ID + ""}
                        onChange={handleChange}
                        size="small"
                        inputProps={{
                          name: "Advertise_ID",
                        }}
                      >
                        {advertise.map((item: AdvertiseInterface) => (
                          <option value={item.ID}>
                            {item.Advertise_Type}
                          </option>
                        ))}
                      </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <p>ที่อยู่</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Customer_Address"
                    variant="outlined"
                    type="string"
                    size="small"
                    multiline
                    inputProps={{
                      style: {
                        height: 135,
                        width: 300,
                      },
                    }}
                    value={customer.Customer_Address}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="error"
              endIcon={<CancelIcon />}
            >
              cancel
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submitUpdate}
              variant="contained"
              color="primary"
              endIcon={<SaveIcon />}
            >
              save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default UpdateCustomer;
