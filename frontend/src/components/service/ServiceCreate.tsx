import * as React from "react";
import {Box,  Button,  Container,Divider,  FormControl,  Grid,  MenuItem,  Paper,  Select,  SelectChangeEvent,  Snackbar,  TextField,} from "@mui/material";
import { useEffect, useState } from "react";
import {  DeliveryInterface,  ServiceInterface,  WeightInterface,} from "../../models/service/IService";
import Typography from "@mui/material/Typography";
import { ThemeContext } from "@emotion/react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { TypeWashingInterface } from "../../models/service/IService";
import { Link as RouterLink } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ServiceCreate = () => {
  const [service, setService] = React.useState<Partial<ServiceInterface>>({
    TypeWashing_ID: 0,
    Weight_ID: 0,
    Delivery_ID: 0,
  });

  const [typewashing, setTypewashing] = React.useState<TypeWashingInterface[]>(
    []
  );
  const [delivery, setDelivery] = React.useState<DeliveryInterface[]>([]);
  const [weight, setWeight] = React.useState<WeightInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  //================================================================================================================//

  const getTypeWashing = async () => {
    const apiUrl = `http://localhost:8080/typewashings`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

      .then((res) => {
        console.log(res.data); //show ข้อมูล

        if (res.data) {
          setTypewashing(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getWeight = async () => {
    const apiUrl = `http://localhost:8080/weights`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

      .then((res) => {
        console.log(res.data); //show ข้อมูล

        if (res.data) {
          setWeight(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getDelivery = async () => {
    const apiUrl = `http://localhost:8080/deliveries`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(apiUrl, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API

      .then((res) => {
        console.log(res.data); //show ข้อมูล

        if (res.data) {
          setDelivery(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //================================================================================================================//

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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ServiceCreate;

    const { value } = event.target;

    setService({ ...service, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name as keyof typeof service;
    setService({
      ...service,
      [name]: event.target.value,
    });
  };

  const requestOptionsGet = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  function submit() {
    let data = {
      TypeWashing_ID: service.TypeWashing_ID,
      Weight_ID: service.Weight_ID,
      Address: service.Address,
      Delivery_ID: service.Delivery_ID,
    };

    //================================================================================================================//

const apiUrl = "http://localhost:8080";

const requestOptionsPost = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
};

fetch(`${apiUrl}/services`, requestOptionsPost)
    .then((response) => response.json())
    .then((res) => {
        console.log(res)
        if (res.data) {
            setSuccess(true);
        } else {
            setError(true);
        }
    });
}

  //================================================================================================================//

  useEffect(() => {
    getTypeWashing();
    getWeight();
    getDelivery();
    submit();
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <div>
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
              บันทึกข้อมูลไม่สำเร็จ
            </Alert>
          </Snackbar>
          <Paper>
            <Box
              display="flex"
              maxWidth="lg"
              sx={{
                marginTop: 2,
              }}
            >
              <Box sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                  mt={2}
                  align="center"
                >
                  <h2>ระบบเลือกบริการ</h2>
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Grid container rowSpacing={1} sx={{ padding: 2 }}>
              <Grid item xs={7.5}>
                <p>รูปแบบการซัก</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    sx={{ width: 300 }}
                    value={service.TypeWashing_ID}
                    onChange={handleChange}
                    inputProps={{
                      name: "TypeWashing_ID",
                    }}
                  >
                    {typewashing.map((item: TypeWashingInterface) => (
                      <MenuItem value={item.ID}>{item.Type_washing}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <p>น้ำหนัก</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    sx={{ width: 300 }}
                    value={service.Weight_ID}
                    onChange={handleChange}
                    inputProps={{
                      name: "Weight_ID",
                    }}
                  >
                    {weight.map((item: WeightInterface) => (
                      <MenuItem value={item.ID}>{item.Weight_net}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <p>ที่อยู่</p>
                  <TextField
                    id="Address"
                    variant="outlined"
                    type="string"
                    size="medium"
                    inputProps={{
                      style: {
                        height: 200,
                        width: 450,
                      },
                    }}
                    sx={{fontFamily:'Mitr-Regular'}}  
                    multiline
                    value={service.Address}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={8}>
                <p>น้ำหนัก</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    sx={{ width: 300 }}
                    value={service.Delivery_ID}
                    onChange={handleChange}
                    inputProps={{
                      name: "Delivery_ID",
                    }}
                  >
                    {delivery.map((item: DeliveryInterface) => (
                      <MenuItem value={item.ID}>
                        {item.Derivery_service}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <p>ราคา</p>
                <TextField
                  disabled
                  inputProps={{
                    style: {
                      width: 240,
                    },
                  }}
                >
                  ราคา
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button component={RouterLink} to="/" variant="contained">
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
        </div>
      </Container>
    </div>
  );
};

export default ServiceCreate;
