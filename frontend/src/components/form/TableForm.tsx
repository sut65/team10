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
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { FormInterface } from "../../models/form/IForm;
import { useNavigate } from "react-router-dom";

export default function FormTable() {
    const params = useParams();
    const navigate = useNavigate();
    let [form, setForm] = React.useState<FormInterface[]>([]);

    const apiUrl = "http://localhost:8080";

    const getForm = async () => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/forms`, requestOptions)
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
            headers: { "Content-Type": "application/json" },
        };
        fetch(`${apiUrl}/forms/${ID}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    window.location.reload();
                }
            });
    };

    useEffect(() => {
        getForm();
        // window.location.reload();
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
                                to="/create"
                                sx={{ p: 1 }}>Create Form</Button>
                        </Box>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">FormTypeID</TableCell>
                                    <TableCell align="right">หัวข้อประเมิน</TableCell>
                                    <TableCell align="right">SatisfactionID</TableCell>
                                    <TableCell align="right">Comment</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {form.map((row) => (
                                    <TableRow
                                        key={row.ID}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.ID}
                                        </TableCell>
                                        <TableCell align="right">{row.FormTypeID}</TableCell>
                                        <TableCell align="right">{row.FormType_name}</TableCell>
                                        <TableCell align="right">{row.SatisfactionID}</TableCell>
                                        <TableCell align="right">{row.Comment}</TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup variant="outlined" aria-lable="outlined button group">
                                                <Button onClick={() => navigate({ pathname: `/forms/${row.ID}` })} variant="contained"
                                                >Edit</Button>
                                                <Button onClick={() => FormDelete(row.ID)} color="error">Delete</Button>
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