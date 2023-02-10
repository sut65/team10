import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, ButtonGroup, IconButton, Paper, SwipeableDrawer, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompleteInterface } from "../../models/complete/IComplete";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";
import { lightGreen } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';

export default function CompleteTable() {
  const params = useParams();
  const navigate = useNavigate();
  const [complete, setComplete] = React.useState<CompleteInterface[]>([]);
  useEffect(() => {
    getComplete();
  }, []);
  const apiUrl = "http://localhost:8080";

  const getComplete = async () => {
    const apiUrl = "http://localhost:8080/completes";
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
            setComplete(res.data);
        }
      });
  };

  const CompleteDelete = async (ID: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/completes/${ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          window.location.reload();
        }
      });
  };

  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }} 
        style={{
                  background:
                    "linear-gradient(180deg, #ffdd72 0%,#F0FFFF 100%, #F5DEB3 100%)",
                }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              <h2>Complete</h2>
              </Typography>
            </Box>
            <h2>
            <Box>
              <Button 
              variant="contained" 
              component={RouterLink}
              to="/create"
              endIcon = {<AddIcon/>}
              sx={{p: 1}}>Create </Button>
            </Box>
            </h2>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 , p: 2}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">EmployeeID</TableCell>
                  <TableCell align="right">EmployeeName</TableCell>
                  <TableCell align="right">ReceiveID</TableCell>
                  <TableCell align="right">PackagingID</TableCell>
                  <TableCell align="right">DateTime</TableCell>
                  <TableCell align="center">แก้ไข</TableCell>
                  <TableCell align="center">ลบ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complete.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.Employee_ID}</TableCell>
                    <TableCell align="right">{row.Name}</TableCell>
                    <TableCell align="right">{row.Receive_ID}</TableCell>
                    <TableCell align="right">{row.Packaging_ID}</TableCell>
                    <TableCell align="right">{row.Complete_datetime.toString()}</TableCell>
                    <TableCell align="right">
                    <IconButton
                        size="large"
                        aria-label="Edit"
                        onClick={() => {
                          navigate({ pathname: `/complete/info/complete/update/${row.ID}` });
                        }}
                        sx={{ color: lightGreen[600] }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="large"
                        aria-label="delete"
                        onClick={() => CompleteDelete(row.ID)}
                        sx={{ color: red[900] }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
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
