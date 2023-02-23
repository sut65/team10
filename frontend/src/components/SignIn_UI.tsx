import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SigninInterface } from "../models/ISignin";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";

//import jwt_decode from "jwt-decode";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

function SignIn() {
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [usertext, setUserText] = useState("Username");

  /* -------------------------------------------------------------------------- */
  /*                               Load User Data                               */
  /* -------------------------------------------------------------------------- */
  async function Login(data: SigninInterface) {
    const apiUrl = "http://localhost:8080";
    let usertypeCheck = "";
    if (checked === false) {
      usertypeCheck = "C";
    } else {
      usertypeCheck = "E";
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let res = await fetch(`${apiUrl}/${usertypeCheck}login`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        //console.log(res.data);
        if (res.data) {
          //3.ค้นหาด้วยเลขบัตร
          if (usertypeCheck === "E") {
            // employee
            localStorage.setItem("token", res.data.token);
            //console.log(jwt_decode(localStorage.getItem("token")));
            localStorage.setItem("uid", res.data.id);
            // localStorage.setItem("username", res.data.username);
            // localStorage.setItem("usertype", res.data.usertype);
            // localStorage.setItem("positionid", res.data.positionid);
          } else {
            // customer
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("uid", res.data.id);
            // localStorage.setItem("username", res.data.username);
            // localStorage.setItem("usertype", res.data.usertype);
          }

          return res.data;
        } else {
          return false;
        }
      });

    return res;
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Handler                                  */
  /* -------------------------------------------------------------------------- */
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
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

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked === true) {
      setUserText("Employee Username");
    } else {
      setUserText("Username");
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                               Const for call                               */
  /* -------------------------------------------------------------------------- */
  const submit = async () => {
    let res = await Login(signin);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
        window.location.href = "/" 
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เข้าสู่ระบบสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            {usertext} หรือ Password ผิด
          </Alert>
        </Snackbar>

        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images-prod.anothermag.com/1050/azure/another-prod/370/6/376268.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            background:
              "linear-gradient(180deg, rgba(255,201,60,1) 16%, rgba(91,192,248,1) 100%)",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Avatar variant="rounded" sx={{ m: 1, bgcolor: "#86E5FF" }}>
              <LocalLaundryServiceIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label={usertext}
                name="Username"
                autoComplete="Username"
                sx={{ background: "#FAF0D7" }}
                autoFocus
                value={signin.Username || ""}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
                sx={{ background: "#FAF0D7" }}
                value={signin.Password || ""}
                onChange={handleInputChange}
              />
              <Grid container justifyContent={"center"} spacing={2}>
                <Grid>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ mt: 3, mb: 2 }}
                          checked={checked}
                          onChange={handleChangeCheckBox}
                        />
                      }
                      label="an Employee?"
                    />
                  </FormGroup>
                </Grid>
                <Grid marginX={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, background: "#FFC93C" }}
                    onClick={submit}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid marginX={2}>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, background: "#5BC0F8" }}
                    href="/customer/create"
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
