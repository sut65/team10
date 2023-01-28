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

import { CompleteInterface } from "../../models/complete/IComplete";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReceiveInterface } from "../../models/receive/IReceive";
import { PackagingInterface } from "../../models/complete/IPackagink";
import { EmployeesInterface } from "../../models/Employee/IEmployee";
import { Autocomplete, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UpdateIcon from "@mui/icons-material/Update";
import dayjs, { Dayjs } from "dayjs";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(

 props,

 ref

) {

 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});


function CompleteCreate() {

 const [Complete_datetime, setComplete_datetime] = React.useState<Dayjs | null>(dayjs);
 const [complete, setComplete] = React.useState<Partial<CompleteInterface>>({});
 const [employee, setEmployee] = React.useState<EmployeesInterface[]>([]);
 const [receive, setReceive] = React.useState<ReceiveInterface[]>([]);
 const [packaging, setPackaging] = React.useState<PackagingInterface[]>([]);
 const [success, setSuccess] = React.useState(false);
 const [error, setError] = React.useState(false);
 const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
 const getPackaging = async () => {
  const apiUrl = `http://localhost:8080/packagings`;
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

// Fetch member from current user's student id.
const getEmployeeByID = async () => {
  const apiUrl = `http://localhost:8080`;
  // get student id from local storage.
  let uid = localStorage.getItem("customer_uid");
  let uid2 = localStorage.getItem("employee_uid");

  const requestOptions = {
    method: "GET",

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  if (uid == null){
    fetch(`${apiUrl}/employee/${uid2}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
            complete.Employee_ID = res.data.Employee_ID;

        }
    });
  }
  else{
    fetch(`${apiUrl}/employee/${uid}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
        if (res.data) {
          complete.Employee_ID = res.data.Employee_ID;

        }
    });
  }
  
    
  
};

  /* ------------------------------- DatePicker ------------------------------- */
  const handleDateTime = (newValue: Dayjs | null) => {
    setComplete_datetime(newValue);
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
 const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
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
      getEmployeeByID();

            }, []);
 

 return (

   <Container maxWidth="md">

<Snackbar
       open={success}
       autoHideDuration={3000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         บันทึกข้อมูลสำเร็จ
       </Alert>
     </Snackbar>

     <Snackbar
       open={success}
       autoHideDuration={3000}
       onClose={handleClose}
       anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
     >
       <Alert onClose={handleClose} severity="success">
         บันทึกข้อมูลไม่สำเร็จ
       </Alert>
     </Snackbar>
     <Box sx={{ padding: 2
                     }}>
     <Paper>
                    <Grid container spacing={0} sx={{ padding: 2
                     }}>
                    <h1>COMPLETE<TaskAltIcon color="success" sx={{ fontSize: 100 }}/></h1> 
                    </Grid>

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
               defaultValue
               sx={{ width : 350 }}
               onChange={handleInputChange}
             ></TextField>

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
                defaultValue
                onChange={handleInputChange}
              />
           </FormControl>
        </Grid>

        <Grid item xs={6}>
          <p>เลขรายการรับผ้า</p>
          <FormControl fullWidth variant="outlined">
             <TextField
               id="Receive_ID"
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
                             <LocalizationProvider dateAdapter={AdapterDayjs}>
                             <DateTimePicker
                        value={Complete_datetime}
                        onChange={handleDateTime}
                        renderInput={(params) => <TextField {...params} />}
                      />

                            </LocalizationProvider>
           </FormControl>

         </Grid>
         </Grid>
         </Paper>
         <Grid container spacing={1} sx={{ padding: 5 }}>
         <Grid item xs={12}>
           <Button 
           component={RouterLink} to="/" 
            variant="contained"
            color="error"
            endIcon={<CancelIcon />}
            >
           cancel
           </Button>
           {/* <Button
            variant="contained"
            color="warning"
            onClick={handleClick}
            endIcon={<UpdateIcon />}
            sx={{ marginRight: 2 }}
            >
            Update
            </Button> */}
           <Button
             style={{ float: "right" }}
             onClick={submit}
             variant="contained"
             color="primary"
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


export default CompleteCreate;