import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Alert, Grid, Snackbar, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { StocksInterface } from "../../models/Stock/IStock";
import { EmployeesInterface } from "../../models/Employee/IEmployee";
import { TypesInterface } from "../../models/Stock/IType";
import { SizesInterface } from "../../models/Stock/ISize";
import { BrandsInterface } from "../../models/Stock/IBrand";
import dayjs, { Dayjs } from "dayjs";

function StockUpdate_UI() {
  const [Stock, setStock] = React.useState<Partial<StocksInterface>>(
    {}
  );
  const [type, setType] = React.useState<TypesInterface[]>([]);
  const [brand, setBrand] = React.useState<BrandsInterface[]>([]);
  const [employee, setEmployee] = React.useState<EmployeesInterface[]>([]);
  const [size, setSize] = React.useState<SizesInterface[]>([]);

  const [List_number, SetList_number] = useState<String>("");

  const [Add_number, SetAdd_number] = useState<String>("");
  const [Quantity, SetQuantity] = useState<String>("");
  const [Time, SetTime] = React.useState<Dayjs | null>(dayjs());
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [noAccess, setNoAccess] = React.useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const getEmployee = async () => {
    //ดึงข้อมูลเพศ
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

  const getBrand = async () => {
    //ดึงข้อมูลเพศ
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

  const getType = async () => {
    //ดึงข้อมูล Position
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

  const handleClose = (
    //ป้ายบันทึกเปิดปิด
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  async function update() {
    let data = {
      ID: Number(localStorage.getItem("eid_edit")),
      List_number: List_number,
      Add_number: Add_number,
      quantity: Quantity,
      Employee_ID: Stock.Employee_ID,
      Type_ID: Stock.Type_ID,
      Brand_ID: Stock.Brand_ID,
      Size_ID: Stock.Size_ID,
      Time: Date,
    };

    const apiUrl = "http://localhost:8080/stocks"; //ส่งขอบันทึก
    const requestOptions = {
      method: "PATCH",
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
          setErrorMessage("");
          if (localStorage.getItem("uid") === localStorage.getItem("eid_edit")) {
            localStorage.clear();
          } else {
            localStorage.removeItem("eid_edit");
          }
          window.location.href = "/stock";
        } else {
          setError(true);
          setErrorMessage(res.error);
        }
      });
  }

  React.useEffect(() => {
    //เรียกข้อมูล
    getEmployee();
    getSize();
    getBrand();
    getType();
  }, []);

  return (
    <Box paddingTop={2}>
      <Snackbar //ป้ายบันทึกสำเร็จ
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar //ป้ายบันทึกไม่สำเร็จ
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" variant="filled">
          บันทึกข้อมูลไม่สำเร็จ {errorMessage}
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

      <Container maxWidth="sm">
        <Paper>
          <Box paddingX={2}>
            <div style={{ paddingTop: 20, fontWeight: "bold" }}>
               Stock Update
            </div>
            <Grid container>
              <Grid paddingX={2} paddingY={2}>
                <Stack>
                  List number
                  <TextField
                    fullWidth
                    id="List_number"
                    type="string"
                    variant="outlined"
                    onChange={(event: { target: { value: React.SetStateAction<String>; }; }) => SetList_number(event.target.value)}
                  />
                </Stack>
                <Stack>
                  Add
                  <TextField
                    fullWidth
                    id="Add_number"
                    type="string"
                    variant="outlined"
                    onChange={(event: { target: { value: React.SetStateAction<String>; }; }) => SetAdd_number(event.target.value)}
                  />
                </Stack>
                <Stack>
                  Brand
                  <Autocomplete
                    id="brand-autocomplete"
                    options={size}
                    onChange={(event: any, value) => {
                      setStock({ ...Stock, Brand_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) => `${option.Brand_Name}`} //filter value
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
                        >{`${option.Brand_Name}`}</li>
                      ); //display value
                    }}
                  />
                </Stack>
                <Stack>
                  Type
                  <Autocomplete
                    id="type-autocomplete"
                    options={type}
                    onChange={(event: any, value) => {
                      setStock({ ...Stock, Type_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) => `${option.Type_Name}`} //filter value
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
                        >{`${option.Type_Name}`}</li>
                      ); //display value
                    }}
                  />
                </Stack>
        
                <Stack>
                  Size
                  <Autocomplete
                    id="size-autocomplete"
                    options={size}
                    onChange={(event: any, value) => {
                      setStock({ ...Stock, Size_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Stock_Name}`
                    } //filter value
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
                        >{`${option.Size_Name}`}</li>
                      ); //display value
                    }}
                  />
                </Stack>
                <Stack>
                  Actor
                  <Autocomplete
                    id="employee-autocomplete"
                    options={type}
                    onChange={(event: any, value) => {
                      setStock({ ...Stock, Employee_ID: value?.ID }); //Just Set ID to interface
                    }}
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

                <Grid container justifyContent={"center"} paddingY={4}>
                  <Button
                    variant="contained"
                    color="error"
                    href="/employee"
                    sx={{ marginX: 2 }}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="warning" onClick={update}>
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default StockUpdate_UI;
