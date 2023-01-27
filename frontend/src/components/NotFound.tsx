import { Container, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Stack } from "@mui/system";

function NotFound() {
  return (
    <Container
      maxWidth={"sm"}
      sx={{ paddingY: 20 }}
    >
      <Paper elevation={10} >
        <Grid container justifyContent={"center"} paddingY={10}>
          <Stack>
            <div
              style={{
                textAlign: "center",
                fontSize: "50px",
                fontWeight: "bold",
              }}
            >
              404 Page Not Found
            </div>
          </Stack>
          <Stack>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Looking some where else
            </div>
          </Stack>
        </Grid>
      </Paper>
    </Container>
  );
}

export default NotFound;
