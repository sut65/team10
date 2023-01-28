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

import StorefrontIcon from '@mui/icons-material/Storefront';
/* Datetimepicker */
import dayjs, { Dayjs } from "dayjs";
import { PromotionInterface } from "../../models/promotion/IPromotion";
function PromotionDelete() {
  const [promotion, setPromotion] = React.useState<Partial<PromotionInterface>>({});
  const [promotion_id, setPromotion_ID] = React.useState<PromotionInterface[]>([]);
  const [deletePromotion_1, setDeletePromotion] = React.useState<number | undefined>();

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

  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

  const deletePromotion = (id: number | undefined) => {
    let data = {                                                            //ประกาศก้อนข้อมูล
        ID: promotion.ID,      
    };
    const apiUrl = "http://localhost:8080/promotions/:id";                      //ส่งขอการลบ  
    const requestOptions = {     
        method: "DELETE",      
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },     
        body: JSON.stringify(data),
    };
    console.log(JSON.stringify(data),);
    fetch(apiUrl, requestOptions)                                            //ขอการส่งกลับมาเช็คว่าบันทึกสำเร็จมั้ย
    .then((response) => response.json())      
    .then(async (res) => {      
        if (res.data) {
            setSuccess(true);
            await timeout(1000); //for 1 sec delay
            window.location.reload();     
        } else {
            setError(true);     
        }
    });
}



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
        console.log(res)
        if (res.data) {
          setPromotion(res.data);
          setPromotion_ID(res.data);
        }
      });
  };

  useEffect(() => {
    getPromotion();
  }, []);
  return (

    <Container maxWidth="xl">
      <StorefrontIcon color="primary" sx={{ fontSize: 80 }} />
      <Snackbar // บันทึกสำเร็จ
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success">
          ลบข้อมูลสำเร็จ
        </Alert>
      </Snackbar>

      <Snackbar // บันทึกไม่สำเร็จ
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error">
          ลบข้อมูลไม่สำเร็จ
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
            <Grid item xs={10} >
              <Autocomplete
                id="promption-auto"
                options={promotion_id}
                fullWidth
                size="medium"
                onChange={(event: any, value) => {
                  setPromotion({ ...promotion, ID: value?.ID }); //Just Set ID to interface
                }}
                getOptionLabel={(option: any) =>
                  `${option.ID}`
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
                    >{`${option.ID}`}</li>
                  ); //display value
                }}
              />
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2}
          sx={{ paddingY: 2 }}>
          <Grid item xs={5}
          >
          </Grid>
          <Grid container item xs={7} direction='row-reverse'>
            <Button
              variant="contained"
              color="warning"
              onClick={() => deletePromotion(deletePromotion_1)}
              endIcon={<SaveIcon />}
            >
              delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default PromotionDelete;
