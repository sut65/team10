import React, { useEffect } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";

import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Snackbar from "@mui/material/Snackbar";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { FormInterface, FormTypeInterface, SatisfactionInterface } from "../../models/form/IForm";
import { ButtonGroup, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Swal from 'sweetalert2'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

    props,

    ref

) {

    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function FormCreate() {

    const navigate = useNavigate();
    const [form, setForm] = React.useState<Partial<FormInterface>>({});
    const [formtype, setFormType] = React.useState<FormTypeInterface[]>([]);
    const [satisfaction, setsatisfaction] = React.useState<SatisfactionInterface[]>([]);
    const [form1, setForm1] = React.useState<FormInterface[]>([]);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const getForm = async () => {
        const apiUrl = `http://localhost:8080/forms`;

        const requestOptionsGet = {
            method: "GET",

            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        //การกระทำ //json
        fetch(apiUrl, requestOptionsGet)
            .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

            .then((res) => {
                console.log(res.data); //show ข้อมูล

                if (res.data) {
                    setForm1(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    const getFormType = async () => {
        const apiUrl = `http://localhost:8080/formtypes`;

        const requestOptionsGet = {
            method: "GET",

            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        //การกระทำ //json
        fetch(apiUrl, requestOptionsGet)
            .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

            .then((res) => {
                console.log(res.data); //show ข้อมูล

                if (res.data) {
                    setFormType(res.data);
                } else {
                    console.log("else");
                }
            });
    };


    const getSatisfaction = async () => {
        const apiUrl = `http://localhost:8080/satisfactions`;

        const requestOptionsGet = {
            method: "GET",

            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        //การกระทำ //json
        fetch(apiUrl, requestOptionsGet)
            .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

            .then((res) => {
                console.log(res.data); //show ข้อมูล

                if (res.data) {
                    setsatisfaction(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    const handleChange = (event: SelectChangeEvent<any>) => {
        const name = event.target.name as keyof typeof form;
        setForm({
            ...form,
            [name]: event.target.value,
        });
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof FormCreate;
        const { value } = event.target;
        setForm({ ...form, [id]: value });
    };

    function submit() {
        let data = {
            Customer_ID: Number(localStorage.getItem('uid')),
            ID: form.ID,
            FormTypeID: form.FormTypeID,
            SatisfactionID: form.SatisfactionID,
            Comment: form.Comment,
        };

        const apiUrl = "http://localhost:8080";
        Swal.fire({
            title: "คุณต้องการบันทึกความคิดเห็นใช่มั้ย",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "บันทึก",
        }).then((data: any) => {
            if (data.isConfirmed) {
                fetch(`${apiUrl}/forms`, requestOptionsPost)
                    .then((response) => response.json())
                    .then((res) => {
                        console.log(res);
                        if (res.data) {
                            Swal.fire({
                                icon: "success",
                                title: "Saved!",
                                text: "บันทึกสำเร็จ",
                            });
                              window.location.href = "/forminfo";
                            // setSuccess(true);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: res.error,
                            });
                            // setError(true);
                        }
                    });
            }
        });

        const requestOptionsPost = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
    }


    useEffect(() => {
        getFormType();
        getSatisfaction();
        getForm();
    }, []);
    return (

        <Container maxWidth="md">

            <Snackbar

                open={success}

                autoHideDuration={6000}

                onClose={handleClose}

                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}

            >

                <Alert onClose={handleClose} severity="success">

                    บันทึกข้อมูลสำเร็จ

                </Alert>

            </Snackbar>

            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>

                <Alert onClose={handleClose} severity="error">

                    {message}

                </Alert>

            </Snackbar>

            <Paper style={{ background: "rgba(255,201,60,1)" }}>

                <Box

                    display="flex"

                    sx={{

                        marginTop: 2,

                    }}

                >

                    <Box sx={{ paddingX: 2, paddingY: 1 }}>

                        <Typography

                            component="h2"

                            variant="h6"

                            color="Black"

                            gutterBottom

                        >

                            Form

                        </Typography>

                    </Box>

                </Box>

                <Divider />
                <Paper sx={{marginLeft: 3, marginRight: 3, marginTop: 2}}>
                    <Grid container spacing={3} sx={{ padding: 2 }}>

                        <Grid item xs={6}>
                            <p>หัวข้อประเมิน</p>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    sx={{ width: 300 }}
                                    value={form.FormTypeID + ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "FormTypeID",
                                    }}
                                >
                                    {formtype.map((item: FormTypeInterface) => (
                                        <MenuItem value={item.ID}>{item.FormType_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} >
                            <p>ความพึงพอใจ</p>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    sx={{ width: 300, }}
                                    value={form.SatisfactionID + ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "SatisfactionID",
                                    }}
                                >
                                    {satisfaction.map((item: SatisfactionInterface) => (
                                        <MenuItem value={item.ID}>{item.Satisfaction_name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <p>แสดงความคิดเห็น</p>
                                <TextField
                                    id="Comment"
                                    variant="outlined"
                                    type="string"
                                    size="medium"
                                    inputProps={{
                                        style: {
                                            height: 200,
                                            width: 450,
                                        },
                                    }}
                                    sx={{ fontFamily: 'Mitr-Regular' }}
                                    multiline
                                    value={form.Comment}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Grid>


                        <Grid item xs={12}>

                            <Button component={RouterLink} to="/forminfo" variant="contained">

                                Back

                            </Button>

                            <Button

                                style={{ float: "right" }}

                                onClick={submit}

                                variant="contained"

                                color="primary"

                            >

                                Submit

                            </Button>

                        </Grid>

                    </Grid>
                </Paper>

            </Paper>

        </Container>

    );

}


export default FormCreate;