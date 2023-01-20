import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/system";

function Home(){
    return(
        <Box>
            <Paper elevation={2} sx={{ marginTop: 2 , paddingY: 1 ,marginX: 45}}>
                <Grid container padding={2}>
                    <Stack>
                        <Grid alignSelf={"center"}>
                            <h2> ระบบหลัก : ระบบร้านซักรีด Delivery </h2>
                        </Grid>
                        <Grid marginBottom={2}>
                        </Grid>
                    </Stack>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Home;