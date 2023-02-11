import React, { useState } from "react";
import { useEffect } from "react";
/* Grid */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';

import StorefrontIcon from '@mui/icons-material/Storefront';
/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { PromotionInterface } from "../../models/promotion/IPromotion";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
function UpdatePromotion() {
  const params = useParams()
  const [date_u, setDate_U] = React.useState<Dayjs | null>(dayjs());
  const [promotion, setPromotion] = React.useState<Partial<PromotionInterface>>({});
  const [price, setPrice] = React.useState<number | null>(null);
  const [promotion_id, setPromotion_ID] = React.useState<Number | undefined>(undefined);
  const [promotion_Codetype, setPromotion_Codetype] = React.useState<String | undefined>("");
  const [promotion_Reason, setPromotion_Reason] = React.useState<String | undefined>("");

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

  //////////////////////////////////////////////////////////////////////
  ///////////////////     ฟังก์ชันในการรับค่าไปเปลี่ยน   //////////////////////
  //////////////////////////////////////////////////////////////////////
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof UpdatePromotion;
    const { value } = event.target;
    setPromotion({ ...promotion, [id]: value });
  };

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

  //////////////////////////////////////////////////////////////////////
  ////////////////     ฟังก์ชันในส่งข้อมูลเข้าไปอัพเดท     ////////////////////
  //////////////////////////////////////////////////////////////////////
  function update() {
    let promotion_u = {
      ID: promotion.ID,
      Price: price,
      Employee_ID: Number(localStorage.getItem("uid")),
      Time_Stamp: date_u,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promotion_u),
    };
    console.log(promotion_u);

    fetch(`http://localhost:8080/promotions`, requestOptions)
      .then((response) => response.json())
      .then(async (res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          await timeout(1000); //for 1 sec delay
          window.location.href = "/promotion";     
          
        } else {
          setError(true);
        }
      });
  }

  //////////////////////////////////////////////////////////////////////
  ///////////////////     ฟังก์ชันในการดึงโปรโมชั่น     //////////////////////
  //////////////////////////////////////////////////////////////////////
  const getPromotion = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:8080/promotion/${params.id}`, requestOptions )
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPromotion(res.data);
          setPromotion_ID(res.data.ID);
          setPromotion_Codetype(res.data.Codetype.Type);
          setPromotion_Reason(res.data.Reason.Reason);
        }
      });
  };


  useEffect(() => {
    getPromotion();
  }, []);
  return (

    <Container maxWidth="lg">
      <Paper style={{ background: "rgba(0, 0, 0, 0.2)" }}>
          <h1 style={{ textAlign: "center", paddingTop: 20, color: "white" }}>
          Promotion<StorefrontIcon/>
          </h1>
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
            <h1>Promotion</h1>
            </Grid>
            
            <Grid container spacing={2} sx={{ paddingX: 2 }}>
            <Grid item xs={2}>
              <h3>ID</h3>
            </Grid>
            <Grid item xs={4} >
            <TextField
               id="Codetype_ID"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={promotion_id}
               sx={{ width : 250 }}
             ></TextField>
            </Grid>
            <Grid item xs={2}>
              <h3>Code Type</h3>
            </Grid>
            <Grid item xs={4} >
            <TextField
               id="Codetype_ID"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={promotion_Codetype}
               sx={{ width : 250 }}
             ></TextField>
            </Grid>
            <Grid item xs={2}>
              <h3>Reason</h3>
            </Grid>
            <Grid item xs={2}>
            <TextField
               id="Reason_ID"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={promotion_Reason}
               sx={{ width : 250 }}
             ></TextField>
            </Grid>
          </Grid>
          


          <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 2 }}>
            <Grid item xs={2}>
              <h3>Price</h3>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="Price"
                label="Price"
                variant="outlined"
                defaultValue={"0"}
                value={promotion.Price}
                onChange={handleInputChange}
                sx={{ width : 250 }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ paddingX: 2, paddingY: 2 }}>
            <Grid item xs={2}>
              <h3>Date Time</h3>
            </Grid>
            <Grid item xs={10}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="DateTimePicker"
                  renderInput={(params) => <TextField {...params} />}
                  value={date_u}
                  onChange={(newValue: Dayjs | null) => {
                    setDate_U(newValue);
                    console.log(newValue)
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
              component={RouterLink}
              to="/promotion"
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
              color="warning"
              onClick={update}
              endIcon={<SaveIcon />}
            >
              update
            </Button>
          </Grid>
        </Grid>
      </Box>
      </Paper>
    </Container>
  );
}

export default UpdatePromotion;
