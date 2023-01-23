import React, { useState } from "react";

/* Grid */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';


/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
function Promotion() {
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());
    return (
        <Container maxWidth="md">
            <Box>
                <Paper>
                    <Grid sx={{ padding: 2 }}>
                        <h1>Promotion</h1></Grid>
                    <Grid container spacing={2} sx={{ paddingX: 2 }}>
                        <Grid item xs={2}>
                            <h3>Code Type</h3>
                        </Grid>
                        <Grid item xs={4} >
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={[0, 1]}
                                sx={{ width: 250 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Movie" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <h3>Reason</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={[0, 1]}
                                sx={{ width: 250 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Movie" />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 2 }}>
                        <Grid item xs={2}>
                            <h3>Price</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Price" variant="outlined" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ paddingX: 2 }}>
                        <Grid item xs={2}>
                            <h3>Amount</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Price" variant="outlined" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 2 }}>
                        <Grid item xs={2}>
                            <h3>Date Time</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="DateTimePicker"
                                    renderInput={(params) => <TextField {...params} />}
                                    value={date}
                                    onChange={(newValue) => {
                                        setDate(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container spacing={2}
                    sx={{ paddingY: 2 }}>
                    <Grid item xs={5}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            endIcon={<CancelIcon />}
                        >
                            cancel
                        </Button>
                    </Grid>
                    <Grid container item xs={7} direction='row-reverse'>
                        <Button
                            variant="contained"
                            color="success"
                            endIcon={<SaveIcon />}
                        >
                            commit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Promotion;
