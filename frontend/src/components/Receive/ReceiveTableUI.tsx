import React, { useState } from "react";
import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { Alert, Box, Button, ButtonGroup, CssBaseline, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Snackbar, TableCell } from "@mui/material";
import { ReceiveInterface } from "../../models/receive/IReceive";
import {  Popover, Typography } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Dialog } from "@material-ui/core"

function ReceiveTableUI() {
  const [receive, setReceive] = useState<ReceiveInterface[]>([]);
  const [row_delete, setRow_delete] = useState<ReceiveInterface>();
  const [open_delete, setOpendelete] = React.useState(false);
  const navigate = useNavigate();
  const [alertmsg, setAlertmsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClickOpen = (id: ReceiveInterface) => { //เซ็ทค่า Dialog
    setOpendelete(true);
    setRow_delete(id); //เซ็ตค่าใส่ในตัวแปรเพื่อหา ID
  };

  const handleClose = () => { //สั่งปิด Dialog Delete
    setOpendelete(false);
  };

  useEffect(() => {
    getReceive();
  }, []);
  const getReceive = async () => {
    const apiUrl = "http://localhost:8080/receive";
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
          console.log(res.data)
            setReceive(res.data);
        }
      });
      
  };

  const DeleteReceive = async (Receive_ID: number) => {
    let data = {          //ประกาศก้อนข้อมูล
      ID: Receive_ID,
    };

    const apiUrl = "http://localhost:8080/receive";
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    fetch(`${apiUrl}/${Receive_ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          setAlertmsg("ลบสำเร็จ")
          window.location.reload();
        }else{
          setError(true);
          setAlertmsg(res.error)
        }
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
        <Snackbar // บันทึกสำเร็จ
          open={success}
          autoHideDuration={10000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="success">
            {alertmsg}
          </Alert>
        </Snackbar>

        <Snackbar // บันทึกไม่สำเร็จ
          open={error}
          autoHideDuration={10000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="error">
            {alertmsg}
          </Alert>
        </Snackbar>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                RECEIVE
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                component={RouterLink}
                to="/receive/create"
                sx={{ p: 1 }}>Create Receive</Button>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Bill ID</TableCell>
                  <TableCell align="right">Detergent Quantity</TableCell>
                  <TableCell align="right">Softener Quantity</TableCell>
                  <TableCell align="right">Employee</TableCell>
                  <TableCell align="right">Time Stamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receive.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.Bill.ID}</TableCell>
                    <TableCell align="right">{row.Det_Quantity}</TableCell>
                    <TableCell align="right">{row.Sof_Quantity}</TableCell>
                    <TableCell align="right">{row.Employee.Name}</TableCell>
                    <TableCell align="right">{row.Time_Stamp.toString()}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="outlined" aria-lable="outlined button group">
                        <Button onClick={() => navigate({ pathname: `/receive/update/${row.ID}` })} variant="contained" color="success"
                        >edit</Button>
                        {/* <Button onClick={() => DeletePromotion(row.ID)} variant="contained"color="error">Delete</Button> */}
                        <div>
                          <Button color="error" variant="outlined" onClick={() => handleClickOpen(row) }>
                            Delete
                          </Button>
                          <Dialog
                            open={open_delete}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Delete"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are You Sure To Delete Receive ID {row_delete?.ID}
                                {/* <br></br>:{row_delete?.Employee.Name} */}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button variant="contained" color="warning" onClick={handleClose}>No</Button>
                              <Button variant="contained" color="error" onClick={() => DeleteReceive(row_delete?.ID||0)} autoFocus>
                                Yes
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
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
export default ReceiveTableUI;

  
  