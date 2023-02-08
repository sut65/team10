import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  ButtonGroup,
  Paper,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceInterface } from "../../models/service/IService";
import { Link as RouterLink } from "react-router-dom";

export default function ServiceTable() {
  const params = useParams();
  const navigate = useNavigate();

  const [service, setService] = React.useState<ServiceInterface[]>([]);

  const apiUrl = "http://localhost:8080";

  const getServices = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/s_service/${localStorage.getItem("uid")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setService(res.data);
          console.log(res.data);
        }
      });
  };

  const ServiceDelete = async (ID: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/services/${ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Service
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                component={RouterLink}
                to="/service"
                sx={{ p: 1 }}
              >
                Create Service
              </Button>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  {/* <TableCell align="right">TypeWashingID</TableCell>
                  <TableCell align="right">WeightID</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Delivery</TableCell> */}
                  <TableCell align="right">ประเภทการซัก</TableCell>
                  <TableCell align="right">น้ำหนัก</TableCell>
                  <TableCell align="center">ที่อยู่</TableCell>
                  <TableCell align="right">ประเภทการจัดส่ง</TableCell>
                  <TableCell align="right">Price/THB</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {service.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.Type_washing}</TableCell>
                    <TableCell align="right">{row.Weight_net}</TableCell>
                    <TableCell align="center">{row.Address}</TableCell>
                    <TableCell align="right">{row.DeliveryType_service}</TableCell>
                    <TableCell align="right">{row.Bill_Price}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup
                        variant="outlined"
                        aria-lable="outlined button group"
                      >
                        <Button
                          onClick={() =>
                            navigate({ pathname: `/service/${row.ID}` })
                          }
                          variant="contained"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => ServiceDelete(row.ID)}
                          color="error"
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
