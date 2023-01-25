import { useEffect } from "react";
import * as React from "react";

import { Link as RouterLink } from "react-router-dom";

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

import { ComplertInterface } from "../../models/complete/IComplete";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReceiveInterface } from "../../models/receive/IReceive";
import { PackagingInterface } from "../../models/complete/IPackagink";
import { EmployeesInterface } from "../../models/Employee/IEmployee";
import { Autocomplete, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

 props,

 ref

) {

 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function CompleteCreate() {

 const [date, setDate] = React.useState<Date | null>(null);
 const [complete, setComplete] = React.useState<Partial<ComplertInterface>>({});
 const [employee, setEmployee] = React.useState<EmployeesInterface[]>([]);
 const [receive, setReceive] = React.useState<ReceiveInterface[]>([]);
 const [packaging, setPackaging] = React.useState<PackagingInterface[]>([]);
 const [success, setSuccess] = React.useState(false);
 const [error, setError] = React.useState(false);

 complete.Employee_ID = 55555555555848;
 const getPackaging = async () => {
  const apiUrl = `http://localhost:8080/packaginks`;
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
        setPackaging(res.data);
      } else {
        console.log("else");
      }
    });
};


const getEmployee = async () => {
  const apiUrl = `http://localhost:8080/employees`;

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
        setEmployee(res.data);
      } else {
        console.log("else");
      }
    });
};

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
  const id = event.target.id as keyof typeof complete;
  const { value } = event.target;
  setComplete({ ...complete, [id]: value });
};

const handleChange = (event: SelectChangeEvent<number>) => {
  const name = event.target.name as keyof typeof complete;
  setComplete({
    ...complete,
    [name]: event.target.value,
  });
};

console.log(complete.Employee_ID)

function submit() {
  let data = {
    ID: complete.ID,
    Employee_ID: complete.Employee_ID,
    Packaging_ID: complete.Packaging_ID,
    Employee_Name: complete.Name,
    Receive_ID: complete.Receive_ID,
    Complete_datetime: complete.Complete_datetime,
  };
  
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };


  fetch(apiUrl, requestOptions)

    .then((response) => response.json())

    .then((res) => {

      if (res.data) {

        setSuccess(true);

      } else {

        setError(true);

      }

    });
}

     useEffect(() => {
      getPackaging();
      getEmployee();

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

         บันทึกข้อมูลไม่สำเร็จ

       </Alert>

     </Snackbar>

     <Paper>

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

             color="primary"

             gutterBottom

           >

             ระบบยืนยันการซัก-รีด-พับ-แพ็ค

           </Typography>

         </Box>

       </Box>

       <Divider />
       
       <Grid container spacing={1} sx={{ padding: 5 }}>
        <Grid item xs={6}>
          <p>เลขประจำตัวพนักงาน</p>
          <FormControl fullWidth variant="outlined">
             <TextField
               id="Employee_ID"
               variant="outlined"
               disabled
               type="string"
               size="medium"
               value={complete.Employee_ID}
               sx={{ width : 350 }}
              //  onChange={handleInputChange}
             ></TextField>
           
             {/* <TextField><p>{complete.Employee_ID}</p></TextField> */}

           </FormControl>
        </Grid>

        <Grid item xs={6}>
          <p>ชื่อพนักงาน</p>
          <FormControl fullWidth variant="outlined">
          <TextField
                id="Employee_Name"
                variant="outlined"
                disabled
                type="string"
                size="medium"
                sx={{ width: 300 }}
                value={complete.Name}
                onChange={handleInputChange}
              />
           </FormControl>
        </Grid>

        <Grid item xs={6}>
          <p>เลขรายการรับผ้า</p>
          <FormControl fullWidth variant="outlined">
             <TextField
               id="Receive_ID"
               disabled
               variant="outlined"
               type="string"
               size="medium"
               value={complete.Receive_ID}
               sx={{ width : 350 }}
               onChange={handleInputChange}
             />

           </FormControl>
        </Grid>
        <Grid item xs={6}>
          
          <FormControl fullWidth variant="outlined">
              
              <p>บรรจุภัณฑ์</p>
              <Select
                    sx={{ width: 300 }}
                    value={complete.Packaging_ID}
                    onChange={handleChange}
                    inputProps={{
                      name: "Packaging_ID",
                    }}
                  >
                    {packaging.map((item: PackagingInterface) => (
                      <MenuItem value={item.ID}>{item.Packaging_Type}</MenuItem>
                    ))}
                  </Select>
                
            </FormControl>
        </Grid>

         <Grid item xs={6}>

           <FormControl fullWidth variant="outlined">

             <p>วัน-เวลาที่บันทึก</p>
                             <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={date}
                                    onChange={(newValue) => {
                                        setDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                            </LocalizationProvider>
           </FormControl>

         </Grid>
         </Grid>

         <Grid item xs={12}>

           <Button component={RouterLink} to="/" variant="contained">

             ย้อนกลับ

           </Button>

           <Button

             style={{ float: "right" }}

             onClick={submit}

             variant="contained"

             color="primary"

           >

             ยืนยันการดำเนินการเสร็จสิ้น

           </Button>

         </Grid>

     </Paper>

   </Container>

 );

}


export default CompleteCreate;