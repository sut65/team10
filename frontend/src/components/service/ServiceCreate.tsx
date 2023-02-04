import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { DeliveryTypeInterface, ServiceInterface, WeightInterface, } from "../../models/service/IService";
import Typography from "@mui/material/Typography";
import { ThemeContext } from "@emotion/react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { TypeWashingInterface } from "../../models/service/IService";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

var sum = 0;

const ServiceCreate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [service, setService] = React.useState<Partial<ServiceInterface>>({
    // TypeWashing_ID: 0,
    // Weight_ID: 0,
    // DeliveryType_ID: 0,
  });
  const [typewashing, setTypewashing] = React.useState<TypeWashingInterface[]>(
    []
  );
  const [typewashing1, setTypeWashing1] = React.useState<TypeWashingInterface>();
  const [deliverytype, setDelivery] = React.useState<DeliveryTypeInterface[]>([]);
  const [weight, setWeight] = React.useState<WeightInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  // const id_customer = localStorage.getItem("id");'
  const [typewashingprice, setTypewashingprice] = React.useState<TypeWashingInterface>()
  const [weightprice, setWeightprice] = React.useState<WeightInterface>()
  const [deliprice, setDeliprice] = React.useState<DeliveryTypeInterface>()
  // const [sumprice,setSumprice] = React.useState<number>(0);
  const [message, setAlertMessage] = React.useState("");

  //================================================================================================================//
  const apiUrl = "http://localhost:8080";

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
    const apiUrl = `http://localhost:8080/deliverytypes`;

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

  const getTypewashing1 = async () => {
    const apiUrl = `http://localhost:8080/typewashing`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(`${apiUrl}/1`, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API
      .then((res) => {
        console.log(res.data); //show ข้อมูล

        if (res.data) {
          setTypeWashing1(res.data);
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

  const handleChange = (event: SelectChangeEvent<number>,) => {
    const name = event.target.name as keyof typeof service;
    setService({
      ...service,
      [name]: event.target.value,
    });
    if (event.target.name === "TypeWashing_ID") {
      setTypewashingprice(typewashing.find((r) => r.ID === event.target.value));
    }
    if (event.target.name === "Weight_ID") {
      setWeightprice(weight.find((r) => r.ID === event.target.value));
    }
    if (event.target.name === "DeliveryType_ID") {
      setDeliprice(deliverytype.find((r) => r.ID === event.target.value));
    }


  };
  console.log(typewashingprice);
  console.log(weightprice);


  var total = 0;
  let add = function (num1: any, num2: any, num3: any) {
    if ((num1 === undefined) || (num2 === undefined) || (num3 === undefined)) {
      return 0;
    } else {
      total = num1 + num2 + num3;
      return total;
    }

  }


  console.log(total)
  function submit() {

    let data = {
      Customer_ID: Number(localStorage.getItem('uid')),
      ID: service.ID,
      TypeWashing_ID: service.TypeWashing_ID,
      Weight_ID: service.Weight_ID,
      Address: service.Address,
      DeliveryType_ID: service.DeliveryType_ID,
      Bill_Price: total,
      Description: 1
    };

    //================================================================================================================//

    const apiUrl = "http://localhost:8080";

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/services`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        // if (res.data) {
        //   setSuccess(true);
        //   window.location.reload();

        // } else {

        //   setError(true);
        // }
        if (res.data) {
          setSuccess(true);
        } else {
          setAlertMessage(res.error);
          setError(true);
        }
      });
  }

  //================================================================================================================//

  useEffect(() => {
    getTypeWashing();
    getWeight();
    getDelivery();
    getTypewashing1();
    // getServices();
  }, []);


  return (
    <div>
      <Container maxWidth="md" sx={{ p: 3 }}>
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
              {message}
            </Alert>
          </Snackbar>

          {/* <Paper variant="elevation"> */}
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid item xs={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      id="TypWashing_ID"
                      variant="outlined"
                      disabled
                      type="string"
                      size="medium"
                      value={service.Description}
                      defaultValue={"รายละเอียด"}
                      sx={{ width: 240 }}
                    ></TextField>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent></CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent></CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* </Paper> */}

          <Paper variant="elevation">
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
                    sx={{ fontFamily: "Mitr-Regular" }}
                    multiline
                    value={service.Address}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={7.5}>
                <p>การจัดส่ง</p>
                <FormControl fullWidth variant="outlined">
                  <Select
                    sx={{ width: 300 }}
                    value={service.DeliveryType_ID}
                    onChange={handleChange}
                    inputProps={{
                      name: "DeliveryType_ID",
                    }}
                  >
                    {deliverytype.map((item: DeliveryTypeInterface) => (
                      <MenuItem value={item.ID}>{item.DeliveryType_service}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <p>ราคา</p>
                  <TextField
                    disabled
                    // id="Price"
                    variant="outlined"
                    type="string"
                    size="medium"
                    inputProps={{
                      style: {
                        width: 490,
                      },
                    }}
                    value={add(typewashingprice?.TypeWashing_Price, weightprice?.Weight_price, deliprice?.DeliveryType_price)}
                    // onChange={()=> setSumprice(total)}
                    sx={{ fontFamily: "Mitr-Regular" }}
                    multiline
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button component={RouterLink} to="/serviceinfo" variant="contained">
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
