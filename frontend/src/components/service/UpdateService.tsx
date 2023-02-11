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
  TableCell,
  TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  DeliveryTypeInterface,
  ServiceInterface,
  WeightInterface,
} from "../../models/service/IService";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { TypeWashingInterface } from "../../models/service/IService";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  blue,
  blueGrey,
  green,
  purple,
  red,
  yellow,
} from "@mui/material/colors";
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from "@mui/icons-material/Undo";
import Swal from "sweetalert2";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,

  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ServiceUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [service, setService] = React.useState<Partial<ServiceInterface>>({});
  const [typewashing, setTypewashing] = React.useState<TypeWashingInterface[]>(
    []
  );
  const [deliverytype, setDelivery] = React.useState<DeliveryTypeInterface[]>(
    []
  );
  const [weight, setWeight] = React.useState<WeightInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  // const id_customer = localStorage.getItem("id");'
  const [typewashingdetail, setTypewashingdetail] =
    React.useState<TypeWashingInterface>();
  const [weightdetail, setWeightdetail] = React.useState<WeightInterface>();
  const [delidetail, setDelidetail] = React.useState<DeliveryTypeInterface>();
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
  const apiUrlty = `http://localhost:8080/typewashing`;

  const requestOptions = {
    method: "GET",

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const getCurrentService = async () => {
    const apiUrl = `http://localhost:8080/service`;

    const requestOptions = {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    //การกระทำ //json
    fetch(`${apiUrl}/${params.id}`, requestOptions)
      .then((response) => response.json()) //เรียกได้จะให้แสดงเป็น json ซึ่ง json คือ API
      .then((res) => {
        console.log(res.data); //show ข้อมูล
        if (res.data) {
          setService(res.data);
          setTypewashingdetail(res.data);
          setWeightdetail(res.data);
          setDelidetail(res.data);
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
    const id = event.target.id as keyof typeof ServiceUpdate;

    const { value } = event.target;

    setService({ ...service, [id]: value });
  };

  const handleChange = (event: SelectChangeEvent<any>) => {
    const name = event.target.name as keyof typeof service;
    const value = event.target.value;
    setService({
      ...service,
      [name]: event.target.value,
    });
    console.log(`${name}: ${value}`);

    if (event.target.name === "TypeWashing_ID") {
      setTypewashingdetail(
        typewashing.find((r) => r.ID === event.target.value)
      );
    }
    if (event.target.name === "Weight_ID") {
      setWeightdetail(weight.find((r) => r.ID === event.target.value));
    }
    if (event.target.name === "DeliveryType_ID") {
      setDelidetail(deliverytype.find((r) => r.ID === event.target.value));
    }
  };
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  var total = 0;
  let add = function (num1: any, num2: any, num3: any) {
    if (num1 === undefined && num2 === undefined && num3 === undefined) {
      return total;
    } else if (num2 === undefined && num3 === undefined) {
      total = num1;
      return total;
    } else if (num1 === undefined && num3 === undefined) {
      total = num2;
      return total;
    } else if (num1 === undefined && num2 === undefined) {
      total = num3;
      return total;
    } else if (num1 === undefined) {
      total = num3 + num2;
      return total;
    } else if (num2 === undefined) {
      total = num1 + num3;
      return total;
    } else if (num3 === undefined) {
      total = num1 + num2;
      return total;
    } else {
      total = num1 + num2 + num3;
      return total;
    }
  };

  console.log(total);
  function update() {
    let data = {
      Customer_ID: Number(localStorage.getItem("uid")),
      ID: service.ID,
      TypeWashing_ID: service.TypeWashing_ID,
      Weight_ID: service.Weight_ID,
      Address: service.Address,
      DeliveryType_ID: service.DeliveryType_ID,
      Bill_Price: service.Bill_Price,
    };

    //================================================================================================================//

    const apiUrl = "http://localhost:8080";
    Swal.fire({
      title: "คุณต้องการแก้ไขรายการซักรีดผ้าใช่มั้ย",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "บันทึก",
    }).then((data: any) => {
      if (data.isConfirmed) {
        fetch(`${apiUrl}/services`, requestOptionsPost)
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            if (res.data) {
              Swal.fire({
                icon: "success",
                title: "Saved!",
                text: "บันทึกสำเร็จ",
              });
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
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    // fetch(`${apiUrl}/services`, requestOptionsPost)
    //   .then((response) => response.json())
    //   .then((res) => {
    //     console.log(res);
    //     // if (res.data) {
    //     //   setSuccess(true);
    //     //   window.location.reload();

    //     // } else {

    //     //   setError(true);
    //     // }
    //     if (res.data) {
    //       setSuccess(true);
    //     } else {
    //       setAlertMessage(res.error);
    //       setError(true);
    //     }
    //   });
  }

  //================================================================================================================//

  useEffect(() => {
    getTypeWashing();
    getWeight();
    getDelivery();
    getCurrentService();

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

          <Grid container rowSpacing={1} sx={{ padding: 2 }}>
            <Grid item xs={10} sx={{ paddingRight: 2 }}>
              <Paper
                variant="elevation"
                elevation={12}
                style={{
                  background:
                    "linear-gradient(180deg, #AFEEEE 0%,#F0FFFF 100%, #F5DEB3 100%)",
                }}
              >
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
                  <Grid item xs={6.5}>
                    <p>รูปแบบการซัก</p>
                    <FormControl fullWidth variant="outlined">
                      <Select
                      disabled
                        sx={{ width: 300 }}
                        value={service?.TypeWashing_ID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "TypeWashing_ID",
                        }}
                      >
                        {typewashing.map((item: TypeWashingInterface) => (
                          <MenuItem value={item.ID}>
                            {item.Type_washing}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                    <p>น้ำหนัก</p>
                    
                    <FormControl fullWidth variant="outlined">
                      <Select
                        disabled
                        sx={{ width: 300 }}
                        value={service.Weight_ID + ""}
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
                        disabled
                        sx={{ width: 300 }}
                        value={service.DeliveryType_ID + ""}
                        onChange={handleChange}
                        inputProps={{
                          name: "DeliveryType_ID",
                        }}
                      >
                        {deliverytype.map((item: DeliveryTypeInterface) => (
                          <MenuItem value={item.ID}>
                            {item.DeliveryType_service}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* 
                  <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined">
                      <p>ราคา</p>
                      <TextField
                        disabled
                        color="warning"
                        variant="outlined"
                        type="string"
                        size="medium"
                        inputProps={{
                          style: {
                            width: 490,
                          },
                        }}
                        value={add(
                          typewashingdetail?.TypeWashing_Price,
                          weightdetail?.Weight_price,
                          delidetail?.DeliveryType_price
                        )}
                        sx={{ fontFamily: "Mitr-Regular" }}
                        multiline
                      >
                        {typewashingdetail?.Description}
                      </TextField>
                    </FormControl>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Button
                      component={RouterLink}
                      to="/serviceinfo"
                      variant="contained"
                      color="warning"
                      startIcon={<UndoIcon />}
                    >
                      Back
                    </Button>

                    <Button
                      style={{ float: "right" }}
                      onClick={update}
                      color="primary"
                      variant="contained"
                      // sx={{ border: 2, color: "primary" }}
                      endIcon={<SaveIcon />}
                    >
                      บันทึก
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper
                variant="elevation"
                elevation={12}
                style={{
                  background:
                    "linear-gradient(180deg, #AFEEEE 0%,#F0FFFF 100%, #F5DEB3 100%)",
                }}
              >
                <Card
                  sx={{ minWidth: 275 }}
                  style={{
                    background:
                      "linear-gradient(180deg, #AFEEEE 0%,#F0FFFF 100%, #F5DEB3 100%)",
                  }}
                >
                  <CardContent>
                    <FormControl fullWidth variant="outlined">
                      <Typography>
                        <h3>ราคา: </h3>
                        <Divider />
                        {/* <p>
                          ประเภท {typewashingdetail?.Type_washing}:{" "}
                          {typewashingdetail?.Description}
                        </p> */}
                        {/* <Grid container sx={{}}>
                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 15, }}>ประเภท: {service?.TypeWashing?.Type_washing}</Box>
                        </Grid>
                        <Grid container sx={{}}>
                        <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 15, }}>น้ำหนัก: {service?.Type_washing}</Box> */}
                        {/* <p>น้ำหนัก: {weightdetail?.Weight_net}</p>
                        <p>การจัดส่ง: {delidetail?.DeliveryType_service}</p> */}
                          {/* <Grid container sx={{}}>
                            <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 15, }}>การจัดส่ง: {service?.Type_washing}</Box>
                          </Grid>
                        </Grid> */}
                        <Divider />
                        <Grid item xs={1}>
                          {/* <p >
                            <h3>ราคา: </h3>
                          </p> */}
                        </Grid>
                        <Grid container sx={{}}>
                          <Box flexGrow={1} sx={{ wordWrap: "break-word", width: 0.3, fontSize: 100, textAlign: "right", color: purple["A400"], }}>{service?.Bill_Price}</Box>
                          {/* <Typography
                            align="right"
                            variant="h1"
                            sx={{
                              marginLeft: 12,
                              p: 0,
                              pt: 0,
                              color: purple["A400"],
                            }}
                          >
                            {add(
                                typewashingdetail?.TypeWashing_Price,
                                weightdetail?.Weight_price,
                                delidetail?.DeliveryType_price
                              ) + ""} */}
                        {/* <FormControl fullWidth variant="outlined">
                          <p>ที่อยู่</p>
                          <TextField
                            id="Bill_Price"
                            variant="outlined"
                            type="string"
                            size="medium"
                            inputProps={{
                              name: "Bill_Price",
                              style: {
                                height: 200,
                                width: 450,
                              },
                            }}
                            sx={{ fontFamily: "Mitr-Regular" }}
                            multiline
                            value={service.Bill_Price}
                            onChange={handleInputChange}
                          />
                        </FormControl> */}
                          {/* </Typography> */}
                        </Grid>
                      </Typography>
                    </FormControl>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default ServiceUpdate;
