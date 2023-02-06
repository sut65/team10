import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@material-ui/core/styles";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import IronIcon from "@mui/icons-material/Iron";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import InventoryIcon from "@mui/icons-material/Inventory";
import CarRentalIcon from "@mui/icons-material/CarRental";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid/Grid";
import { Person } from "@material-ui/icons";

const useStyles = makeStyles({
  drawer: {
    width: 250,
  },
});

function AppBarPrivate() {
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

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          background:
            "linear-gradient(90deg, rgba(255,201,60,1) 53%, rgba(91,192,248,1) 100%)",
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
              <h3 style={{ color: "black" }}>
                &nbsp; Laundry Delivery Management&nbsp;{" "}
              </h3>
            </Grid>
            <Grid alignItems="center">
              <h3>
                <LockIcon />
              </h3>
            </Grid>
          </Grid>

          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            {" "}
            {/* Tab Menu */}
            <List className={classes.drawer} sx={{ margin: 0, padding: 1 }}>
              <ListItem component={RouterLink} to="/">
                {" "}
                <HomeIcon color="primary" />
                <ListItemText primary="หน้าแรก" sx={{ padding: 1 }} />
              </ListItem>

              <ListItem component={RouterLink} to="/employee">
                {" "}
                <BadgeIcon color="primary" />
                <ListItemText
                  primary="จัดการข้อมูลพนักงาน"
                  sx={{ padding: 1 }}
                />
              </ListItem>

              <ListItem component={RouterLink} to="/promotion/">
                {" "}
                <LocalOfferIcon color="primary" />
                <ListItemText primary="โปรโมชั่น" sx={{ padding: 1 }} />
              </ListItem>

              <ListItem component={RouterLink} to="/receive">
                {" "}
                <CheckroomIcon color="primary" />
                <ListItemText primary="รับรายการผ้า" sx={{ padding: 1 }} />
              </ListItem>

              <ListItem component={RouterLink} to="/complete/info">
                {" "}
                <IronIcon color="primary" />
                <ListItemText
                  primary="ยืนยันการผ้าซักเสร็จ"
                  sx={{ padding: 1 }}
                />
              </ListItem>

              <ListItem component={RouterLink} to="/vehicle">
                {" "}
                <DirectionsCarIcon color="primary" />
                <ListItemText primary="จัดการรถขนส่ง" sx={{ padding: 1 }} />
              </ListItem>

              <ListItem component={RouterLink} to="/stock">
                {" "}
                <InventoryIcon color="primary" />
                <ListItemText primary="Stock" sx={{ padding: 1 }} />
              </ListItem>
              <ListItem component={RouterLink} to="/delivery/create">
                {" "}
                <CarRentalIcon color="primary" />
                <ListItemText primary="บันทึกการขนส่ง" sx={{ padding: 1 }} />
              </ListItem>
            </List>
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
                  to="/employee/update"
                >
                  <Person />
                  <div>&nbsp;{localStorage.getItem("username")}</div>
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

export default AppBarPrivate;
