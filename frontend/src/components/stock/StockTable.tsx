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
import { StocksInterface } from "../../models/Stock/IStock";
import Stock_UI from "./Stock_UI";
import Moment from "moment";


export default function StockTable_UI() {
  Moment.locale('th');
  /* -------------------------------------------------------------- */
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
  /*                                                    */
  /* -------------------------------------------------------------------------- */
  const params = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState<StocksInterface[]>([]);
  /* -------------------------------------------------------------------------- */
  /*                                                                     */
  /* -------------------------------------------------------------------------- */
  const apiUrl = "http://localhost:8080";

  const getStock = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/stocks`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setStock(res.data);
        }
      });
  };


  useEffect(() => {
    getStock();
  }, []);
  useEffect(() => {
    getStock();
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
                Stock List
              </Typography>
            </Box>
            <Box>
              <div>
                <Button
                  variant="contained"
                  onClick={handleClickPopover}
                  sx={{ p: 1 }}
                >
                  Create Stock
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
                  <Stock_UI />
                </Popover>
              </div>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="right">SID</TableCell>
                  <TableCell align="right">List_Number</TableCell>
                  <TableCell align="right">Brand</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Size</TableCell>
                  <TableCell align="right">Employee</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stock.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    {/* <TableCell align="right">{row.ID}</TableCell> */}
                    <TableCell align="right">{row.List_Number}</TableCell>
                    <TableCell align="right">{row.Brand.Band_Name}</TableCell>
                    <TableCell align="right">{row.Type.Type_Name}</TableCell>
                    <TableCell align="right">{row.Size.Size_Name}</TableCell> 
                    <TableCell align="right">{row.Employee.Name}</TableCell>
                    <TableCell align="right">{row.Quantity}</TableCell>
                    <TableCell align="right">{`${Moment(row.Time).format('DD MMMM YYYY hh:mm')}`}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup
                        variant="outlined"
                        aria-lable="outlined button group"
                      >
                        <Button
                          onClick={() => {
                            localStorage.setItem(
                              "sid_edit",
                              String(row.ID)
                            );
                            
                          }}
                          variant="contained"
                          href="/stock/update"
                        >
                          Edit
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

