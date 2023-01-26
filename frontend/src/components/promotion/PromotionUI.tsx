import React, { useState } from "react";
import { useEffect } from "react";
/* Grid */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';

import StorefrontIcon from '@mui/icons-material/Storefront';
/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { CodetypeInterface } from "../../models/promotion/ICodetype";
import { ReasonInterface } from "../../models/promotion/IReason";
import { PromotionInterface } from "../../models/promotion/IPromotion";
function Promotion() {
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());
    const [promotion, setPromotion] = React.useState<Partial<PromotionInterface>>({});
    const [codetype, setCodetype] = React.useState<CodetypeInterface[]>([]);
    const [reason, setReason] = React.useState<ReasonInterface[]>([]);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = ( // AlertBar
    event?: React.SyntheticEvent | Event,
    reason?: string
) => {
    if (reason === "clickaway") {
        return;
    }
    setSuccess(false);
    setError(false);
};

    function submit() {
        let promotion_p = {
          Codetype_ID: promotion.Codetype_ID,
          Reason_ID: promotion.Reason_ID,
          Price: promotion.Price,
          Amount: promotion.Amount,
          Employee_ID: 1,
          //Employee_ID: Number(localStorage.getItem("uid")),
          Time_Stamp: date,
        };

        const apiUrl = "http://localhost:8080";
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(promotion_p),
        };

        fetch(`${apiUrl}/promotions`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              setSuccess(true);
            } else {
              setError(true);
            }
          });
        }

    const getCodetype = async () => {
        const apiUrl = "http://localhost:8080/codetype";
        const requestOptions = {
          method: "GET",
          headers: {
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
    
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
                setCodetype(res.data);
            }
          });
      };

      const getReason = async () => {
        const apiUrl = "http://localhost:8080/reason";
        const requestOptions = {
          method: "GET",
          headers: {
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
    
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log(res)
            if (res.data) {
                setReason(res.data);
            }
          });
      };

    useEffect(() => {
        getCodetype();
        getReason();
      }, []);
    return (

        <Container maxWidth="md">
            <StorefrontIcon color="primary" sx={{ fontSize: 80 }}/>
            <Snackbar // บันทึกสำเร็จ
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="success">              
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar>

            <Snackbar // บันทึกไม่สำเร็จ
                open={error} 
                autoHideDuration={3000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error">
                    บันทึกข้อมูลไม่สำเร็จ
                </Alert>
            </Snackbar>
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
                    id="codetype-auto"
                    options={codetype}
                    fullWidth
                    size="medium"
                    onChange={(event: any, value) => {
                        setPromotion({ ...promotion, Codetype_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Type}`
                    } //filter value
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Search..."
                        />
                      );
                    }}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li
                          {...props}
                          value={`${option.ID}`}
                          key={`${option.ID}`}
                        >{`${option.Type}`}</li>
                      ); //display value
                    }}
                  />
                        </Grid>
                        <Grid item xs={2}>
                            <h3>Reason</h3>
                        </Grid>
                        <Grid item xs={4}>
                        <Autocomplete
                    id="reason-auto"
                    options={reason}
                    fullWidth
                    size="medium"
                    onChange={(event: any, value) => {
                        setPromotion({ ...promotion, Reason_ID: value?.ID }); //Just Set ID to interface
                    }}
                    getOptionLabel={(option: any) =>
                      `${option.Reason}`
                    } //filter value
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Search..."
                        />
                      );
                    }}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li
                          {...props}
                          value={`${option.ID}`}
                          key={`${option.ID}`}
                        >{`${option.Reason}`}</li>
                      ); //display value
                    }}
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
                            <TextField id="outlined-basic" label="Amount" variant="outlined" 
                            inputProps={{ type: "number" }}/>
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
                            onClick={submit}
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
