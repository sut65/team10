import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Alert, Grid, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs, { Dayjs } from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { EmployeesInterface } from "../../models/Employee/IEmployee";
import { TypesInterface } from "../../models/Stock/IType";
import { BrandsInterface } from "../../models/Stock/IBrand";
import { SizesInterface } from "../../models/Stock/ISize";
import { StocksInterface } from "../../models/Stock/IStock";
import { Link as RouterLink } from "react-router-dom";
import { id } from "date-fns/locale";

function Stock_UI() {
  const [stock, setStock] = React.useState<Partial<StocksInterface>>({});
  const [size, setSize] = React.useState<SizesInterface[]>([]);
  const [brand, setBrand] = React.useState<BrandsInterface[]>([]);
  const [type, setType] = React.useState<TypesInterface[]>([]);
  const [employee, setEmployee] = React.useState<EmployeesInterface[]>([]);
  const [Quantity, SetQuantity] = useState<String>("");
  const [List_Number, SetList_number] = useState<String>("");
  const [Time, setTime] = React.useState<Dayjs | null>(dayjs());
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [noAccess, setNoAccess] = React.useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const getType = async () => {
    //6.ดึงข้อมูลประเภท
    const apiUrl = "http://localhost:8080/types";
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
        if (res.data) {
          setType(res.data);
        }
      });
  };

  const getBrand = async () => {
    //5.ดึงข้อมูล brand
    const apiUrl = "http://localhost:8080/brands";
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
        if (res.data) {
          setBrand(res.data);
        }
      });
  };

  const getSize = async () => {
    //7.ดึงข้อมูล Size
    const apiUrl = "http://localhost:8080/sizes";
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
        if (res.data) {
          setSize(res.data);
        }
      });
  };

  const getEmployee = async () => {
    //8.ดึงข้อมูล emp
    const apiUrl = "http://localhost:8080/employees";
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
        if (res.data) {
          setEmployee(res.data);
        }
      });
  };

  const handleClose = (
    //ป้ายบันทึกเปิดปิด

    event?: React.SyntheticEvent | Event,

    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setErrorMessage("");
    setError(false);
  };



  function submit() {
    let data = {
      //9.ประกาศก้อนข้อมูล

      List_Number: (List_Number)+"",

      TypeID: stock.TypeID,

      BrandID: stock.BrandID,

      Employee_ID: Number(localStorage.getItem("uid")),
      SizeID: stock.SizeID,

      Quantity: Number(Quantity),
      Time: Time,
    };

    console.log(data);

    const apiUrl = "http://localhost:8080/stocks"; //ส่งขอบันทึก

    const requestOptions = {
      method: "POST",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions) //ขอการส่งกลับมาเช็คว่าบันทึกสำเร็จมั้ย
      .then((response) => response.json())

      .then((res) => {
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
          setErrorMessage(res.error);
        }
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      const x = parseInt(localStorage.getItem("reRender")+"")||0
      localStorage.setItem("reRender", `${x+1}`);
      console.log(x)
  }

  React.useEffect(() => {
    //เรียกข้อมูล
    getType();
    getBrand();
    getEmployee();
    getSize();
  }, []);

  return (
    <Box>
      <Snackbar //ป้ายบันทึกสำเร็จ
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar //ป้ายบันทึกไม่สำเร็จ
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ: {errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar // คุณไม่มีสิทธิการเข้าถึง
        open={noAccess}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          คุณไม่มีสิทธิการเข้าถึง
        </Alert>
      </Snackbar>

      <Container maxWidth="md">
        <Paper>
          <Box
            display={"flex"}
            sx={{
              marginTop: 6,
              paddingX: 2,
              paddingY: 2,
            }}
          >
            <h1>บันทึกข้อมูล</h1>
          </Box>
          <Grid container spacing={2}>
            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>List number:</p>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="List_Number"
                  type="number"
                  variant="outlined"
                  onChange={(event: {
                    target: { value: React.SetStateAction<String> };
                  }) => SetList_number(event.target.value)}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Brandname:</p>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="brand-autocomplete"
                  options={brand}
                  onChange={(event: any, value) => {
                    setStock({ ...stock, BrandID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) => `${option.Band_Name}`} //filter value
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => {
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
                      >{`${option.Band_Name}`}</li>
                    ); //display value
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Type:</p>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="type-autocomplete"
                  options={type}
                  onChange={(event: any, value) => {
                    setStock({ ...stock, TypeID : value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) => `${option.Type_Name}`} //filter value
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => {
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
                      >{`${option.Type_Name}`}</li>
                    ); //display value
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Size</p>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="size-autocomplete"
                  options={size}
                  onChange={(event: any, value) => {
                    setStock({ ...stock, SizeID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) => `${option.Size_Name}`} //filter value
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => {
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
                      >{`${option.Size_Name}`}</li>
                    ); //display value
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Actor:</p>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="employee-autocomplete"
                  options={employee}
                  onChange={(event: any, value) => {
                    setStock({ ...stock, Employee_ID: value?.ID }); //Just Set ID to interface
                  }}
                  getOptionLabel={(option: any) => `${option.Name}`} //filter value
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => {
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
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Add:</p>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="Quantity"
                  type="string"
                  variant="outlined"
                  onChange={(event: {
                    target: { value: React.SetStateAction<String> };
                  }) => SetQuantity(event.target.value)}
                />
              </Grid>
            </Grid>

            
            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
              }}
            >
              <Grid item xs={2}>
                <p>Date:</p>
              </Grid>
                      <Grid item xs={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                  //disabled
                                  label="DateTimePicker"
                                  renderInput={(params) => <TextField {...params} />}
                                  value={Time}
                                  onChange={(newValue) => {
                                      setTime(newValue);
                                  }}
                              />
                          </LocalizationProvider>
                      </Grid>
                  </Grid>

            <Grid
              container
              justifyContent={"center"}
              sx={{
                paddingY: 2,
                marginX: 6,
              }}
            >
                
                <Grid alignItems={"center"} item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={submit}
                    sx={{ marginX: 40 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default Stock_UI;
