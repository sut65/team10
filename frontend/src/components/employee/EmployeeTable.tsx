import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, ButtonGroup, Paper, Popover, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink, useParams } from "react-router-dom";
import { EmployeesInterface } from "../../models/Employee/IEmployee";
import EmployeeCreate_UI from "./EmployeeCreate";


export default function EmployeeTable() {
  /* --------------------------------- Popover -------------------------------- */
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popover1 = open ? "simple-popover" : undefined;

  /* -------------------------------------------------------------------------- */
  /*                           Employee Table Variable                          */
  /* -------------------------------------------------------------------------- */
  const params = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<EmployeesInterface[]>([]);
  /* -------------------------------------------------------------------------- */
  /*                                   Driver                                   */
  /* -------------------------------------------------------------------------- */
  const apiUrl = "http://localhost:8080";

  const getEmployee = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/employees`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setEmployee(res.data);
        }
      });
  };

  const EmployeeDelete = async (ID: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/employees/${ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    getEmployee();
  }, []);
  useEffect(() => {
    getEmployee();
    console.log(localStorage.getItem("reRender"))
  }, [localStorage.getItem("reRender")]);
  /* -------------------------------------------------------------------------- */
  /*                                  HTML CSS                                  */
  /* -------------------------------------------------------------------------- */
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Employee List
              </Typography>
            </Box>
            <Box>
              <div>
                <Button
                  variant="contained"
                  onClick={handleClickPopover}
                  sx={{ p: 1 }}
                >
                  Create Employee
                </Button>
                <Popover
                  id={popover1}
                  open={open}
                  sx={{ paddingBottom: 20 }}
                  anchorEl={anchorEl}
                  marginThreshold={50}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <EmployeeCreate_UI />
                </Popover>
              </div>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="right">EID</TableCell>
                  <TableCell align="right">Personal ID</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Position</TableCell>
                  <TableCell align="right">Workshift</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employee.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    {/* <TableCell align="right">{row.ID}</TableCell> */}
                    <TableCell align="right">{row.Personal_ID}</TableCell>
                    <TableCell align="right">{row.Username}</TableCell>
                    <TableCell align="right">{row.Name}</TableCell>
                    <TableCell align="right">{row.Address}</TableCell>
                    <TableCell align="right">{row.Phonnumber}</TableCell>
                    <TableCell align="right">
                      {row.Gender.Gender_Name}
                    </TableCell>
                    <TableCell align="right">
                      {row.Position.Position_Name}
                    </TableCell>
                    {/* Bug ตรง Work_shift_Name ก่อนหน้านี้เป็น Work_Shift_Name ตัว S ตัวเดียว */}
                    <TableCell align="right">
                      {row.WorkShift.Work_shift_Name}
                    </TableCell>

                    <TableCell align="right">
                      <ButtonGroup
                        variant="outlined"
                        aria-lable="outlined button group"
                      >
                        <Button
                          onClick={() => {
                            window.localStorage.setItem(
                              "eid_edit",
                              String(row.ID)
                            );
                          }}
                          variant="contained"
                          href="/employee/update"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => EmployeeDelete(row.ID)}
                          color="error"
                          variant="contained"
                          sx={{ marginX: 2 }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
