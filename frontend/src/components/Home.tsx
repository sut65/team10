import { Box, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

function Home() {
  const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1604335398549-1b80aadd00a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      caption: "WashingMachine",
    },
    {
      url: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      caption: "WashingMachine",
    },
    {
      url: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1139&q=80",
      caption: "Washing",
    },
    {
      url: "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      caption: "PackCloth",
    },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={5}
        sx={{
          marginRight: 5,
          marginTop: 2,
          padding: 4,
          maxHeight: 200,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.2)",
        }}
      >
        <img
          width="200"
          height="200"
          style={{ borderRadius: "50%" }}
          src="https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-6/318729582_114875924790685_3552569288500390668_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEkl0bZN-tdy51gA_XpxBpaXowSNJgGKIlejBI0mAYoiWkgNHhWkoqR2JCsUJuxY29F5zoTeshTBjrsGCrxBuFb&_nc_ohc=RiJJfgSki28AX-IChJk&tn=3C-fj9crBZpK7qR7&_nc_ht=scontent-sin6-2.xx&oh=00_AfDfOp04LJRR7e1O3e7LQc2jzw4lE1O-N6u2H01NToGBkA&oe=63FBABC8"
        />
      </Paper>
      <Paper
        elevation={5}
        sx={{
          marginTop: 2,
          padding: 4,
          maxWidth: 600,
          background: "rgba(255, 255, 255, 0.5)",
          borderRadius: "10%",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
              Laundry delivery system
            </Typography>
          </Grid>
          <Grid item xs={12}></Grid>
          <AutoplaySlider
            animation="foldOutanimation"
            bullets={false}
            play={true}
            cancelOnInteraction={false}
            interval={3000}
          >
            {slideImages.map((image, index) => (
              <div key={index} className="aws-slider__content">
                <img src={image.url} alt={image.caption} />
                <p className="aws-slider__caption">{image.caption}</p>
              </div>
            ))}
          </AutoplaySlider>

          <Grid item xs={12}>
            <Typography variant="body1" align="justify">
              In our laundry delivery system, you can schedule a pickup and
              delivery for your laundry. We also offer various services. Further
              more You can select a services and make payments online.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Home;
