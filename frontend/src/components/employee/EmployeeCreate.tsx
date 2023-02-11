import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Alert, Grid, Snackbar, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { EmployeesInterface } from "../../models/Employee/IEmployee";
import { GendersInterface } from "../../models/Employee/IGender";
import { WorkShiftsInterface } from "../../models/Employee/IWorkShift";
import { PositionsInterface } from "../../models/Employee/IPosition";
import { Link as RouterLink } from "react-router-dom";

function EmployeeCreate_UI() {
  const [employee, setEmployee] = React.useState<Partial<EmployeesInterface>>(
    {}
  );
  const [gender, setGender] = React.useState<GendersInterface[]>([]);
  const [workshift, setWorkShift] = React.useState<WorkShiftsInterface[]>([]);
  const [position, setPosition] = React.useState<PositionsInterface[]>([]);

  const [Personal_ID, SetPersonal_ID] = useState<String>("");
  const [Password, SetPassword] = useState<String>("");
  const [Username, SetUsername] = useState<String>("");
  const [Name, SetName] = useState<String>("");
  const [Phonnumber, SetPhonenumber] = useState<String>("");
  const [Address, SetAddress] = useState<String>("");
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

  const getGender = async () => {
    //ดึงข้อมูลเพศ
    const apiUrl = "http://localhost:8080/genders";
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
          setGender(res.data);
        }
      });
  };

  const getWorkShift = async () => {
    //ดึงข้อมูล WorkShift
    const apiUrl = "http://localhost:8080/workshifts";
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
          setWorkShift(res.data);
        }
      });
  };

  const getPosition = async () => {
    //ดึงข้อมูล Position
    const apiUrl = "http://localhost:8080/positions";
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
          setPosition(res.data);
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
    setErrorMessage("")
  };

  async function create() {
    let data = {
      Personal_ID: Personal_ID,
      Username: Username,
      Name: Name,
      Gender_ID: employee.Gender_ID,
      Position_ID: employee.Position_ID,
      WorkShift_ID: employee.WorkShift_ID,
      Phonnumber: Phonnumber,
      Address: Address || "",
      Password: Password,
    };

    console.log(data);

    const apiUrl = "http://localhost:8080/employees"; //ส่งขอบันทึก
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
      const x = parseInt(localStorage.getItem("reRender")+"")||0
      localStorage.setItem("reRender", `${x+1}`);
      console.log(x)
  }

  React.useEffect(() => {
    //เรียกข้อมูล
    getGender();
    getWorkShift();
    getPosition();
  }, []);

  return (
    <Box>
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

      <Container maxWidth="lg">
        <div style={{ paddingTop: 20, fontWeight: "bold" }}>
          Employee Create
        </div>
        <Grid container>
          <Grid paddingX={2} paddingY={2}>
            <Stack>
              Personal ID
              <TextField
                fullWidth
                id="Personal_ID"
                type="string"
                variant="outlined"
                onChange={(event) => SetPersonal_ID(event.target.value)}
              />
            </Stack>
            <Stack>
              Username
              <TextField
                fullWidth
                id="Username"
                type="string"
                variant="outlined"
                onChange={(event) => SetUsername(event.target.value)}
              />
            </Stack>
            <Stack>
              Gender
              <Autocomplete
                id="gender-autocomplete"
                options={gender}
                onChange={(event: any, value) => {
                  setEmployee({ ...employee, Gender_ID: value?.ID }); //Just Set ID to interface
                }}
                getOptionLabel={(option: any) => `${option.Gender_Name}`} //filter value
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
                    >{`${option.Gender_Name}`}</li>
                  ); //display value
                }}
              />
            </Stack>
            <Stack>
              Position
              <Autocomplete
                id="position-autocomplete"
                options={position}
                onChange={(event: any, value) => {
                  setEmployee({ ...employee, Position_ID: value?.ID }); //Just Set ID to interface
                }}
                getOptionLabel={(option: any) => `${option.Position_Name}`} //filter value
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
                    >{`${option.Position_Name}`}</li>
                  ); //display value
                }}
              />
            </Stack>
            <Stack>
              Address
              <TextField
                fullWidth
                id="Adress"
                type="string"
                variant="outlined"
                onChange={(event) => SetAddress(event.target.value)}
              />
            </Stack>
          </Grid>
          <Grid paddingX={2} paddingY={2}>
            <Stack>
              Name Surname
              <TextField
                fullWidth
                id="Name"
                type="string"
                variant="outlined"
                onChange={(event) => SetName(event.target.value)}
              />
            </Stack>
            <Stack>
              Password
              <TextField
                fullWidth
                id="Password"
                type="string"
                variant="outlined"
                onChange={(event) => SetPassword(event.target.value)}
              />
            </Stack>
            <Stack>
              Phone Number
              <TextField
                fullWidth
                id="Phonnumber"
                type="string"
                variant="outlined"
                onChange={(event) => SetPhonenumber(event.target.value)}
              />
            </Stack>
            <Stack>
              Workshift
              <Autocomplete
                id="workshift-autocomplete"
                options={workshift}
                onChange={(event: any, value) => {
                  setEmployee({ ...employee, WorkShift_ID: value?.ID }); //Just Set ID to interface
                }}
                getOptionLabel={(option: any) => `${option.Work_shift_Name}`} //filter value
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
                    >{`${option.Work_shift_Name}`}</li>
                  ); //display value
                }}
              />
            </Stack>
            <Grid container justifyContent={"center"} paddingY={4}>
              <Button variant="contained" color="success" onClick={create}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EmployeeCreate_UI;
