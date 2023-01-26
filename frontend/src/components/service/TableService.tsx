// import * as React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import { Button, ButtonGroup, Paper, SwipeableDrawer, Typography } from "@mui/material";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { ServiceInterface } from "../models/IService";
// import { Link as RouterLink } from "react-router-dom";

// export default function ServiceTable() {
//   const params = useParams();

//   const [service, setService] = React.useState<ServiceInterface[]>([]);

//   const apiUrl = "http://localhost:8080";

//   const getServices = async () => {
//     const requestOptions = {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     };
//     fetch(`${apiUrl}/services`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           setService(res.data);
//           console.log(res.data);

//         }
//       });
//   };

//   const ServiceDelete = async (ID: number) => {
//     const requestOptions = {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//     };
//     fetch(`${apiUrl}/services/${ID}`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           window.location.reload();
//         }
//       });
//   };

//   useEffect(() => {
//     getServices();
//   }, []);

//   return (
//     <React.Fragment>
//       <CssBaseline />
//       <Container maxWidth="lg" sx={{ p: 2 }}>
//         <Paper sx={{ p: 2 }}>
//           <Box display="flex">
//             <Box sx={{ flexGrow: 1 }}>
//               <Typography variant="h6" gutterBottom component="div">
//                 Service
//               </Typography>
//             </Box>
//             <Box>
//               <Button 
//               variant="contained" 
//               component={RouterLink}
//               to="/create"
//               sx={{p: 1}}>Create Service</Button>
//             </Box>
//           </Box>

//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 400 , p: 2}} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell align="right">TypeWashingID</TableCell>
//                   <TableCell align="right">WeightID</TableCell>
//                   <TableCell align="right">Address</TableCell>
//                   <TableCell align="right">Delivery</TableCell>
//                   <TableCell align="right">Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {service.map((row) => (
//                   <TableRow
//                     key={row.ID}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell component="th" scope="row">
//                       {row.ID}
//                     </TableCell>
//                     <TableCell align="right">{row.TypeWashing_ID}</TableCell>
//                     <TableCell align="right">{row.Weight_ID}</TableCell>
//                     <TableCell align="right">{row.Address}</TableCell>
//                     <TableCell align="right">{row.Delivery_ID}</TableCell>
//                     <TableCell align="right">
//                       <ButtonGroup variant="outlined" aria-lable="outlined button group">
//                         <Button component={RouterLink} to="/update" variant="contained"
//                           >Edit</Button>
//                         <Button onClick={() => ServiceDelete(row.ID)} color="error">Delete</Button>
//                       </ButtonGroup>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Container>
//     </React.Fragment>
//   );
// }
