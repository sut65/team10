import { useEffect } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { CompleteInterface } from "../../models/complete/IComplete";
import { Link as RouterLink, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ReceiveInterface } from "../../models/receive/IReceive";
import { PackagingInterface } from "../../models/complete/IPackagink";
import { EmployeesInterface } from "../../models/Employee/IEmployee";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from "@mui/icons-material/Save";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
 props,
 ref
) {
 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateComplete() {
 const params = useParams()
 const [Complete_datetime, setComplete_datetime] = React.useState<Dayjs | null>(dayjs);
 const [complete, setComplete] = React.useState<Partial<CompleteInterface>>({});
 const [employee, setEmployee] = React.useState<EmployeesInterface[]>([]);
 const [receive, setReceive] = React.useState<ReceiveInterface[]>([]);
 const [packaging, setPackaging] = React.useState<PackagingInterface[]>([]);
 const [success, setSuccess] = React.useState(false);
 const [error, setError] = React.useState(false);
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
 
 const getPackaging = async () => {
  const apiUrl = `http://localhost:8080/packagings`;
  const requestOptionsGet = {
    method: "GET",

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  //การกระทำ //json
  fetch(apiUrl, requestOptionsGet)
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

  const requestOptionsGet = {
    method: "GET",

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  //การกระทำ //json
  fetch(apiUrl, requestOptionsGet)
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

const getCurrentComplete= async () => {
    const requestOptionsGet = {
        method: "GET",

        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };
    fetch(`http://localhost:8080/complete/${params.id}`, requestOptionsGet)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                setComplete(res.data);
            } else {
                console.log("else");
            }
        });
};


  /* ------------------------------- DatePicker ------------------------------- */
  const handleDateTime = (newValue: Dayjs | null) => {
    setComplete_datetime(newValue);
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

function submitUpdate() {
  let data = {
    ID: complete.ID,
    Employee_ID: complete.Employee_ID,
    Packaging_ID: complete.Packaging_ID,
    Employee_Name: complete.Name,
    Receive_ID: complete.Receive_ID,
    Complete_datetime: complete.Complete_datetime,
  };
  //---------------------------------------------------------------------------------------------------------------------//
  const apiUrl = "http://localhost:8080";
  const requestOptionsPost = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  console.log(JSON.stringify(data));

  fetch(`${apiUrl}/completes`, requestOptionsPost)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setSuccess(true);
      } else {
        setError(true);
        console.log(res.data)
      }
    });
}

     useEffect(() => {
      getPackaging();
      getEmployee();
      getCurrentComplete();
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
           component={RouterLink} to="/complete/info" 
            variant="contained"
            color="error"
            endIcon={<CancelIcon />}
            >
           cancel
           </Button>
           <Button
             style={{ float: "right" }}
             onClick={submitUpdate}
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


export default UpdateComplete;