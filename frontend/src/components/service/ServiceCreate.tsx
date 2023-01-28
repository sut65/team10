import * as React from "react";
import {
  Box,
  Button,
  ButtonGroup,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {DeliveryTypeInterface,ServiceInterface,WeightInterface,} from "../../models/service/IService";
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

const ServiceCreate = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [service, setService] = React.useState<Partial<ServiceInterface>>({
    // TypeWashing_ID: 0,
    // Weight_ID: 0,
    // DeliveryType_ID: 0,
  });
  const [service1, setService1] = React.useState<ServiceInterface[]>([]);
  const [typewashing, setTypewashing] = React.useState<TypeWashingInterface[]>(
    []
  );
  // const [pricejoin, setPricejoin] = React.useState<PriceInterface[]>([]);
  const [deliverytype, setDelivery] = React.useState<DeliveryTypeInterface[]>([]);
  const [weight, setWeight] = React.useState<WeightInterface[]>([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  //================================================================================================================//
  const apiUrl = "http://localhost:8080";

  const getServices = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/services`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setService1(res.data);
          console.log(res.data);
        }
      });
  };

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

  const requestOptions = {
    method: "GET",

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
// let sum
// let cal: ( value_cal: number) => number =
//   function ( value_cal: number) {
//     sum = 0;
//     for(let i=0;i<price.length;i++){
//       if(price[i] == Number(value_cal)){
//         sum += washsing[i]+weightprice[i]+deliveryprice[i]
//       }
//     }
//     return sum;
//   };

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

  const ServiceDelete = async (ID: number) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`${apiUrl}/services/${ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          window.location.reload();
        }
      });
  };

  function submit() {

    let data = {
      Customer_ID: Number(localStorage.getItem('uid')),
      ID: service.ID,
      TypeWashing_ID: service.TypeWashing_ID,
      Weight_ID: service.Weight_ID,
      Address: service.Address,
      DeliveryType_ID: service.DeliveryType_ID,
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
        if (res.data) {
            setSuccess(true);
            window.location.reload();
            
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
    getServices();
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
              บันทึกข้อมูลไม่สำเร็จ
            </Alert>
          </Snackbar>

          <Paper variant="elevation">
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={4}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    {/* <TextField
                    disabled
                      id="Description"
                      variant="outlined"
                      type="string"
                      size="medium"
                      sx={{fontFamily:'Mitr-Regular'}}
                      defaultValue={service?.Description}  
                      value={service?.TypeWashing_ID}
                    ></TextField> */}
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
          </Paper>

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
                      <MenuItem value={item.ID}>
                        {item.DeliveryType_service}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <p>ราคา</p>
                  <TextField
                    disabled
                    id="Price"
                    variant="outlined"
                    type="string"
                    size="medium"
                    inputProps={{
                      style: {
                        width: 490,
                      },
                    }}
                    sx={{ fontFamily: "Mitr-Regular" }}
                    multiline
                    value={[]}
                    onChange={handleInputChange}
                  />
                </FormControl>
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
          <Paper variant="elevation" square={true}>
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
                  {/* <h2>ระบบเลือกบริการ</h2> */}
                </Typography>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400, p: 2 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">TypeWashingID</TableCell>
                    <TableCell align="right">WeightID</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Delivery</TableCell>
                    <TableCell align="right">Price</TableCell>
                    {/* <TableCell align="right">Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {service1.map((row) => (
                    <TableRow
                      key={row.ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.ID}
                      </TableCell>
                      <TableCell align="right">{row.TypeWashing_ID}</TableCell>
                      <TableCell align="right">{row.Weight_ID}</TableCell>
                      <TableCell align="right">{row.Address}</TableCell>
                      <TableCell align="right">{row.DeliveryType_ID}</TableCell>
                      <TableCell align="right">{row.Price}</TableCell>
                      <TableCell align="right">
                        <ButtonGroup
                          variant="outlined"
                          aria-lable="outlined button group"
                        >
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => ServiceDelete(row.ID)}
                            color="error"
                            size="small"
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              navigate({ pathname: `/service/${row.ID}` })
                            }
                          >
                            แก้ไข
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default ServiceCreate;
