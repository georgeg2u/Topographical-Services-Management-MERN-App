import PropTypes from "prop-types";
// @mui
import {styled, alpha} from "@mui/material/styles";
import {
  Typography,
  Stack,
  Link,
  Button,
  Container,
} from "@mui/material";

// utils
import {bgGradient} from "../../../../utils/cssStyles";
// components
import Iconify from "../../../../components/iconify/Iconify";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({theme}) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
}));

// ----------------------------------------------------------------------

export default function ServiceDetailsHero({serviceData}) {
  const {title, companyName, location} = serviceData;

  return (
    <StyledRoot>
      <Container>
        <Stack
          spacing={5}
          direction={{xs: "column", md: "row"}}
          justifyContent={{md: "space-between"}}
        >
          <Stack spacing={{xs: 3, md: 2}} sx={{color: "common.white"}}>
            <Typography variant="h3" component="h1">
              {title}
            </Typography>

            <Stack
              spacing={3}
              direction={{xs: "column", md: "row"}}
              sx={{opacity: 0.48}}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={{typography: "body2"}}
              >
                <Iconify icon="mdi:business" sx={{mr: 1}} />
                <Link color="inherit" underline="always">
                  {companyName}
                </Link>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                sx={{typography: "body2"}}
              >
                <Iconify icon="carbon:location" sx={{mr: 1}} /> {location}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            alignItems="flex-start"
            sx={{width: 1, maxWidth: 340}}
          >
            <Stack spacing={2} alignItems="center" sx={{width: 1}}>
              <Button fullWidth variant="contained" size="large">
                Alege serviciul
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

ServiceDetailsHero.propTypes = {
  job: PropTypes.shape({
    category: PropTypes.string,
    location: PropTypes.string,
    slug: PropTypes.string,
  }),
};
