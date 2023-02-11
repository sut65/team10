import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  ButtonGroup,
  IconButton,
  Paper,
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
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { FormInterface } from "../../models/form/IForm";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { yellow } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import Swal from 'sweetalert2'

export default function FormTable() {
  const params = useParams();
  const navigate = useNavigate();

  const [form, setForm] = React.useState<FormInterface[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - form.length) : 0;

  const apiUrl = "http://localhost:8080";

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getForm = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/f_form/${localStorage.getItem("uid")}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setForm(res.data);
          console.log(res.data);
        }
      });
  };

  const FormDelete = async (ID: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    Swal.fire({
      title: "คุณต้องการลบผลการประเมินใช่มั้ย",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "ใช่สิ๊",
    }).then((data: any) => {
      if (data.isConfirmed) {
    fetch(`${apiUrl}/forms/${ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Delete!",
            text: "ลบสำเร็จ",
          });
          window.location.reload();
        }
      });
    }
  });
};

  useEffect(() => {
    getForm();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Form
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                component={RouterLink}
                to="/form"
                sx={{ p: 1 }}
              >
                ประเมิน
              </Button>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">หัวข้อประเมิน</TableCell>
                  {/* <TableCell align="right">หัวข้อประเมิน</TableCell> */}
                  <TableCell align="right">ความพึงพอใจ</TableCell>
                  <TableCell align="right">Comment</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? form.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : form
                ).map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.FormType_name}</TableCell>
                    {/* <TableCell align="right">{row.FormType_name}</TableCell> */}
                    <TableCell align="right">{row.Satisfaction_name}</TableCell>
                    <TableCell align="right">{row.Comment}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="large"
                        aria-label="Edit"
                        onClick={() => {
                          navigate({ pathname: `/formsupdate/${row.ID}` });
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
                        onClick={() => FormDelete(row.ID)}
                        sx={{ color: yellow[800] }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
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
                    colSpan={form.length}
                    count={form.length}
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
