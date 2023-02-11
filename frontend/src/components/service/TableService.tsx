import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Slide,
  SwipeableDrawer,
  TableFooter,
  TablePagination,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { yellow } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import ServiceUpdate from "./UpdateService";
import { TransitionProps } from "@mui/material/transitions";
import Swal from 'sweetalert2'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ServiceTable() {
  const params = useParams();
  const navigate = useNavigate();

  const [service, setService] = React.useState<ServiceInterface[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - service.length) : 0;

  const apiUrl = "http://localhost:8080";

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    Swal.fire({
      title: "คุณต้องการลบรายการซักรีดใช่มั้ย",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "ใช่สิ๊",
    }).then((data: any) => {
      if (data.isConfirmed) {
    fetch(`${apiUrl}/services/${ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Delete!",
            text: "ลบสำเร็จ",
          });
          // setTimeout(function () {
            window.location.reload();
          // }, 5000);

        }
      });
    }
  });
}

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
                เลือกบริการ
              </Button>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 400, p: 2 }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">ประเภทการซัก</TableCell>
                  <TableCell align="right">น้ำหนัก</TableCell>
                  <TableCell align="center">ที่อยู่</TableCell>
                  <TableCell align="right">ประเภทการจัดส่ง</TableCell>
                  <TableCell align="right">Price/THB</TableCell>
                  <TableCell align="center">แก้ไข</TableCell>
                  <TableCell align="center">ลบ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? service.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : service
                ).map((row) => (
                  // {service.map((row) => (
                  <TableRow
                    key={row.ID}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    sx={{ width: "auto" }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.Type_washing}</TableCell>
                    <TableCell align="right">{row.Weight_net}</TableCell>
                    <TableCell align="center">{row.Address}</TableCell>
                    <TableCell align="right">
                      {row.DeliveryType_service}
                    </TableCell>
                    <TableCell align="right">{row.Bill_Price}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="large"
                        aria-label="Edit"
                        onClick={() => {
                          navigate({ pathname: `/serviceupdate/${row.ID}` });
                        }}
                        sx={{ color: yellow[800] }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="large"
                        aria-label="delete"
                        onClick={() => ServiceDelete(row.ID)}
                        sx={{ color: yellow[800] }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={service.length}
                    count={service.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
