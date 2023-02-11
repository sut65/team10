import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { BillInterface } from "../../models/bill/IBill";
import { Box, Button, ButtonGroup, CssBaseline,  Paper, TableCell, Typography } from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

function BillTable_UI() {
  const [bill, setBill] = useState<BillInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getListBill_Customer();
  }, []);

  
    //ดึงข้อมูลบิลเฉพาะของลูกค้า
  const getListBill_Customer = async () => {
    const apiUrl = "http://localhost:8080/bills/";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}${localStorage.getItem("uid")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
            setBill(res.data);
        }
      });
      
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Bill
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                component={RouterLink}
                to="/bill/create"
                sx={{ p: 1 }}>Create Bill<NoteAddIcon/></Button>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Service_name</TableCell>
                  <TableCell align="right">Paymenttype</TableCell>
                  <TableCell align="right">Bill_Price</TableCell>
                  <TableCell align="right">Bill Status</TableCell>
                  <TableCell align="right">Time_Stamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bill.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.Service.Customer.Customer_Name}</TableCell>
                    <TableCell align="right">{row.Paymenttype.Type}</TableCell>
                    <TableCell align="right">{row.Bill_Price}</TableCell>
                    <TableCell align="right">{row.Receive_State}</TableCell>
                    <TableCell align="right">{row.Time_Stamp.toString()}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="outlined" aria-lable="outlined button group">
                        <Button onClick={() => navigate({ pathname: `/bills/update/${row.ID}` })} variant="contained" color="success"
                        >edit<EditIcon /></Button>
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
export default BillTable_UI;