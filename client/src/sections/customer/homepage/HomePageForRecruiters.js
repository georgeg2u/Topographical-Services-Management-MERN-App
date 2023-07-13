import {styled, alpha} from "@mui/material/styles";
import {
  Container,
  Typography,
  Button,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import {bgGradient} from "../../../../src/utils/cssStyles";
import Iconify from "../../../../src/components/iconify";

const StyledRoot = styled("div")(({theme}) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
  padding: theme.spacing(10, 0),
}));

export default function HomePageForRecruiters() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <StyledRoot>
      <Container>
        <Grid
          xs={12}
          md={6}
          lg={5}
          sx={{
            color: "common.white",
            textAlign: {xs: "center", md: "center"},
          }}
        >
          <Typography
            variant="overline"
            sx={{color: "primary.main", mb: 2, display: "block"}}
          >
            PENTRU FURNIZORII DE SERVICII FUNCIARE
          </Typography>

          <Typography variant="h3">
            Faci parte dintr-o companie care furnizează servicii funciare?{" "}
          </Typography>

          <Typography sx={{mt: 3, mb: 5, opacity: 0.72}}>
            Creează-ți cont ca prestator de servicii, autentifică-te și postează
            ofertele tale.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<Iconify icon="carbon:document" />}
            onClick={handleLogout}
          >
            Loghează-te ca prestator
          </Button>
        </Grid>
      </Container>
    </StyledRoot>
  );
}
