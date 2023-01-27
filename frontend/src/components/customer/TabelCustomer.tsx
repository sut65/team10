import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, ButtonGroup, Paper, SwipeableDrawer, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { CustomerInterface } from "../../models/customer/ICustomer";
import { Link as RouterLink, useParams } from "react-router-dom";

export default function CustomerTable() {
  const params = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = React.useState<CustomerInterface[]>([]);

  const apiUrl = "http://localhost:8080";

  const getCustomer = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/customer`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCustomer(res.data);
          console.log(res.data);

        }
      });
  };

  const CustomerDelete = async (ID: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${apiUrl}/customer/${ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Customer
              </Typography>
            </Box>
            <Box>
              <Button 
              variant="contained" 
              component={RouterLink}
              to="/create"
              sx={{p: 1}}>Create Customer</Button>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 , p: 2}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">CustomerID</TableCell>
                  <TableCell align="right">CustomerName</TableCell>
                  <TableCell align="right">CustomerUsername</TableCell>
                  <TableCell align="right">CustomerPhone</TableCell>
                  <TableCell align="right">GenderID</TableCell>
                  <TableCell align="right">AdvertiseID</TableCell>
                  <TableCell align="right">CareerID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customer.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    {/* <TableCell align="right">{row.ID}</TableCell> */}
                    <TableCell align="right">{row.Customer_Name}</TableCell>
                    <TableCell align="right">{row.Customer_Username}</TableCell>
                    <TableCell align="right">{row.Customer_Phone}</TableCell>
                    <TableCell align="right">{row.Gender_ID}</TableCell>
                    <TableCell align="right">{row.Advertise_ID}</TableCell>
                    <TableCell align="right">{row.Career_ID}</TableCell>

                    <TableCell align="right">
                      <ButtonGroup variant="outlined" aria-lable="outlined button group">
                        <Button onClick={() => navigate({ pathname: `/customer/update/${row.ID}` })} variant="contained"
                          >Edit</Button>
                        <Button onClick={() => CustomerDelete(row.ID)} color="error">Delete</Button>
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
