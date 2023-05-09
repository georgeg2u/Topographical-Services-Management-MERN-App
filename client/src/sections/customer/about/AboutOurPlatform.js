// @mui
import {Container, Typography, Unstable_Grid2 as Grid} from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Image from "../../../components/image";

// ----------------------------------------------------------------------

export default function AboutOurPlatform() {
  const isMdUp = useResponsive("up", "md");

  return (
    <Container
      sx={{
        overflow: "hidden",
        py: {xs: 5, md: 10},
      }}
    >
      <Grid
        container
        spacing={{
          xs: 8,
          md: 3,
        }}
        justifyContent="space-between"
      >
        <Grid xs={12} md={3}>
          <Typography variant="h3">Ai nevoie de un serviciu?</Typography>

          <Typography sx={{color: "text.secondary", mt: 3}}>
            Autentifică-te în platformă cu un cont de client și alege serviciul
            potrivit pentru tine din lista de servicii ale prestatorilor.
          </Typography>
        </Grid>

        {isMdUp && (
          <Grid xs={12} md={5}>
            <Image
              alt="about introduce"
              src="/assets/illustrations/shaking-hands.jpg"
              //   ratio="3/4"
              sx={{borderRadius: 2}}
            />
          </Grid>
        )}

        <Grid xs={12} md={3}>
          <Typography variant="h3">Vrei să oferi serviciile tale?</Typography>

          <Typography sx={{color: "text.secondary", mt: 3}}>
            Creează un cont de prestator cu datele companiei tale,
            autentifică-te cu contul creat și postează serviciile pe care le
            oferi.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
