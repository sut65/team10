import React, { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { PromotionInterface } from "../../models/promotion/IPromotion";
import { QuotaCodeInterface } from "../../models/promotion/IQuotaCode";
import { Alert, Box, ButtonGroup, CssBaseline, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Snackbar, TableCell } from "@mui/material";
import {  Typography } from "@mui/material";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from "@mui/icons-material/Edit";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CancelIcon from '@mui/icons-material/Cancel';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Dialog } from "@material-ui/core";
function PromotionTable_UI() {
  const [promotion, setPromotion] = useState<PromotionInterface[]>([]);
  const [quotacode, setQuotacode] = useState<QuotaCodeInterface[]>([]);
  const [row_delete, setRow_delete] = useState<PromotionInterface>();
  const [open_delete, setOpendelete] = React.useState(false);

  const [alertmsg, setAlertmsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = (id: PromotionInterface) => { //เซ็ทค่า Dialog
    setOpendelete(true);
    setRow_delete(id); //เซ็ตค่าใส่ในตัวแปรเพื่อหา ID
  };

  const handleClose = () => { //สั่งปิด Dialog Delete
    setOpendelete(false);
  };
  

  useEffect(() => {
    getPromotion();
    getQuotacode();
  }, []);
  //ดึงข้อมูลจาก Promotion
  const getPromotion = async () => {
    const apiUrl = "http://localhost:8080/promotion";
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
          setPromotion(res.data);
        }
      });

  };



  //ดึงข้อมูลจาก Quotacode
  const getQuotacode = async () => {
    const apiUrl = "http://localhost:8080/quotacodes";
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
          setQuotacode(res.data);
        }
      });

  };

  const DeletePromotion = async (Promotion_ID: number) => {
    let data = {                                                            //ประกาศก้อนข้อมูล
      ID: Promotion_ID,
    };

    const apiUrl = "http://localhost:8080/promotions";
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    };
    fetch(`${apiUrl}/${Promotion_ID}`, requestOptions)
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
      <Container maxWidth="lg">
      <Paper style={{ background: "rgba(0, 0, 0, 0.2)" }}>
          <h1 style={{ textAlign: "center", paddingTop: 20, color: "white" }}>
          Promotion<StorefrontIcon/>
          </h1>
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
                Promotion
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                component={RouterLink}
                to="/promotion/create"
                sx={{ p: 1 }}>Create Promotion<NoteAddIcon/></Button>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Codetype</TableCell>
                  <TableCell align="right">Reason</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Employee</TableCell>
                  <TableCell align="right">Time_Stamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotion.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.Codetype.Type}</TableCell>
                    <TableCell align="right">{row.Reason.Reason}</TableCell>
                    <TableCell align="right">{row.Price}</TableCell>
                    <TableCell align="right">{row.Amount}</TableCell>
                    <TableCell align="right">{row.Employee.Name}</TableCell>
                    <TableCell align="right">{row.Time_Stamp.toString()}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="outlined" aria-lable="outlined button group">
                        <Button onClick={() => navigate({ pathname: `/promotion/update/${row.ID}` })} variant="contained" color="success"
                        >edit<EditIcon /></Button>
                        {/* <Button onClick={() => DeletePromotion(row.ID)} variant="contained"color="error">Delete</Button> */}
                        <div>
                          <Button color="error" variant="outlined" onClick={() => handleClickOpen(row) }>
                            Delete<AutoDeleteIcon/>
                          </Button>
                          <Dialog
                            open={open_delete}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Hello"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are You Sure To Delete Promotion ID {row_delete?.ID}
                                <br></br>:{row_delete?.Employee.Name}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button variant="contained" color="warning" onClick={handleClose}>No<CancelIcon/></Button>
                              <Button variant="contained" color="error" onClick={() => DeletePromotion(row_delete?.ID||0)} autoFocus>
                                Yes<DeleteForeverIcon/>
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
        </Paper>
      </Container>
    </React.Fragment>
  );
}
export default PromotionTable_UI;