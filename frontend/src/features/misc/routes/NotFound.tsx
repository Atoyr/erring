import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const NotFound = () => {
  return (
  <Container>
    <Grid>
      <Grid xs={9} md={12}>
        <Typography variant="h1" component="div" gutterBottom
          sx={{ textAlign: "center", mt: 10, mb: 2, }}>
          404
        </Typography>
        <Typography variant="h2" component="div" gutterBottom
          sx={{
            textAlign: "center",
            my: 2,
          }}>
          NOT FOUND
        </Typography>
      </Grid>
      <Grid xs={12} style={{textAlign: "center"}}>
        <Button variant="outlined" href="/" size="large">GO TO HOMEPAGE</Button>
      </Grid>
    </Grid>
  </Container>
  );
}
