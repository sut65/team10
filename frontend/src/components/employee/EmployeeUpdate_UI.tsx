import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Alert, Grid, Snackbar, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { EmployeesInterface } from "../../models/Employee/IEmployee";
import { GendersInterface } from "../../models/Employee/IGender";
import { WorkShiftsInterface } from "../../models/Employee/IWorkShift";
import { PositionsInterface } from "../../models/Employee/IPosition";

function EmployeeUpdate_UI() {
  const employee_id = Number(localStorage.getItem("eid_edit"));
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
  const [noAccess, setNoAccess] = React.useState(false);

  const [errorMessage, setErrorMessage] = useState("");
//const เซ็ตค่าได้ครังเดียว
//วาร์ ทะลุได้หมด
//เรส แก้ได้แค่ในไฟล์นั้น
  const getEmployee = async () => {
    //ดึงข้อมูลพนักงาน
    const apiUrl = `http://localhost:8080/employees/${employee_id}`;
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
//คอนเทนไทป์ เป็น เจสัน มานี่
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
  };

  async function update() {
    let data = {
      ID: employee_id,
      Personal_ID: employee.Personal_ID,
      Username: Username,
      Name: Name,
      Gender_ID: employee.Gender_ID,
      Position_ID: employee.Position_ID,
      WorkShift_ID: employee.WorkShift_ID,
      Phonnumber: Phonnumber,
      Address: Address,
      Password: Password,
    };

    const apiUrl = "http://localhost:8080/employees"; //ส่งขอบันทึก
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
          window.location.href = "/employee";
        } else {
          setError(true);
          setErrorMessage(res.error);
        }
      });
  }

  React.useEffect(() => {
    //เรียกข้อมูล
    getGender();
    getEmployee();
    getWorkShift();
    getPosition();
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
              Employee Edit
            </div>
            <Grid container>
              <Grid paddingX={2} paddingY={2}>
                <Stack>
                  Personal ID
                  <TextField
                  disabled
                  value={employee.Personal_ID+""}
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
                  <TextField
                  disabled
                  value={employee.Gender?.Gender_Name+""}
                    fullWidth
                    id="Gender"
                    type="string"
                    variant="outlined"
                  />
                </Stack>
                <Stack>
                  Position
                  <TextField
                  disabled
                  value={employee.Position?.Position_Name+""}
                    fullWidth
                    id="Position"
                    type="string"
                    variant="outlined"
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
                  <TextField
                  disabled
                  value={employee.WorkShift?.Work_shift_Name+""}
                    fullWidth
                    id="Position"
                    type="string"
                    variant="outlined"
                  />
                </Stack>
                <Grid container justifyContent={"center"} paddingY={4}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      localStorage.removeItem("eid_edit");
                    }}
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

export default EmployeeUpdate_UI;
