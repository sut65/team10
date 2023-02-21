import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@mui/material/IconButton";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid/Grid";
import { Person } from "@material-ui/icons";
import { Paper } from "@mui/material";
import { TokenInterface } from "../models/IToken";

import jwt_decode from "jwt-decode";

const useStyles = makeStyles({
  drawer: {
    width: 250,
  },
});

function AppBarPublic() {
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const classes = useStyles();

  /* -------------------------- Get info inside token ------------------------- */
  // const [posid, setPosid] = React.useState<Number>(0);
  const token = String(localStorage.getItem("token"));

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          background:
            "linear-gradient(90deg, rgba(255,201,60,1) 51%, rgba(0,129,201,1) 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{
              color: "black",
              border: 1,
              borderColor: "white",
              borderWidth: 2,
            }}
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <MoreVertIcon />
          </IconButton>
          <Grid container spacing={1}>
            <Grid>
              <h3 style={{ color: "black" }}>&nbsp; Laundry Delivery &nbsp;</h3>
            </Grid>
            <Grid alignItems="center">
              <h3>
                <LocalLaundryServiceIcon />
              </h3>
            </Grid>
          </Grid>

          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <div
              style={{
                background: "rgba(255,201,60,1)",
                height: "100%",
                width: "100%",
                margin: 0,
                padding: 0,
              }}
            >
              {" "}
              {/* Tab Menu */}
              <List className={classes.drawer} sx={{ margin: 1, padding: 1 }}>
                <Paper sx={{ marginBottom: 1 }}>
                  <ListItem component={RouterLink} to="/">
                    {" "}
                    <HomeIcon color="primary" />
                    <ListItemText primary="หน้าแรก" sx={{ padding: 1 }} />
                  </ListItem>
                </Paper>
                <Paper sx={{ marginBottom: 1 }}>
                  <ListItem component={RouterLink} to="/forminfo">
                    {" "}
                    <StarHalfIcon color="primary" />
                    <ListItemText primary="ประเมิน" sx={{ padding: 1 }} />
                  </ListItem>
                </Paper>
                <Paper sx={{ marginBottom: 1 }}>
                  <ListItem component={RouterLink} to="/serviceinfo">
                    {" "}
                    <LocalLaundryServiceIcon color="primary" />
                    <ListItemText primary="เลือกบริการ" sx={{ padding: 1 }} />
                  </ListItem>
                </Paper>

                <Paper sx={{ marginBottom: 1 }}>
                  <ListItem component={RouterLink} to="/bill">
                    {/* {เป็นระบบที่ต่อเนื่องจาก เลือกบริการ} */}{" "}
                    <PersonSearchIcon color="primary" />
                    <ListItemText primary="ชำระค่าบริการ" sx={{ padding: 1 }} />
                  </ListItem>
                </Paper>

                <Paper sx={{ marginBottom: 1 }}>
                  <ListItem component={RouterLink} to="/confirmation/create">
                    {" "}
                    <DryCleaningIcon color="primary" />
                    <ListItemText primary="ยืนยันรับผ้า" sx={{ padding: 1 }} />
                  </ListItem>
                </Paper>
              </List>
            </div>
          </Drawer>
          {auth /* รูป Icon Profild */ && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/customer/update"
                >
                  <Person />
                  <div>&nbsp;{jwt_decode<TokenInterface>(token).Username}</div>
                </MenuItem>{" "}
                <MenuItem onClick={signout} component={RouterLink} to="/">
                  <ExitToAppIcon />
                  <div>&nbsp;Sign Out</div>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarPublic;
