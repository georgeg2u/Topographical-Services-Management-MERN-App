import {Typography, Container, Button, Box} from "@mui/material";
import Iconify from "../../../../src/components/iconify";
import SvgColor from "../../../../src/components/svg-color";

import {STEPS} from "../../../_mock/assets";
import { useNavigate } from 'react-router-dom';

export default function HomePageSteps() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/services")
    }
    
  return (
    <Box
      sx={{
        textAlign: "center",
        pt: {xs: 10, md: 15},
        pb: {xs: 5, md: 10},
      }}
    >
      <Container>
        <Typography variant="overline" sx={{color: "text.disabled"}}>
          Pentru clienți
        </Typography>

        <Typography variant="h2" sx={{my: 3}}>
          Explorează serviciile noastre!
        </Typography>

        <Typography sx={{color: "text.secondary", maxWidth: 480, mx: "auto"}}>
          Fie că vinzi, cumperi sau deții un imobil pentru care ai nevoie de
          intabulare, trasare, dezmembrare sau alte servicii funciare, aici vei
          găsi oferta potrivită pentru tine!
        </Typography>

        <Box
          sx={{
            display: "grid",
            my: {xs: 8, md: 10},
            gap: {xs: 8, md: 5},
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {STEPS.map((value, index) => (
            <div key={value.title}>
              <SvgColor
                src={value.icon}
                sx={{width: 80, height: 80, mx: "auto", color: "primary.main"}}
              />
              <Typography
                variant="overline"
                sx={{mt: 4, display: "block", color: "text.disabled"}}
              >
                Pasul {index + 1}
              </Typography>

              <Typography variant="h5" sx={{mt: 2, mb: 1}}>
                {value.title}
              </Typography>

              <Typography variant="body2" sx={{color: "text.secondary"}}>
                {value.description}
              </Typography>
            </div>
          ))}
        </Box>

        <Button
          variant="contained"
          size="large"
          color="inherit"
          startIcon={<Iconify icon="ion:navigate-outline" />}
          onClick={handleClick}
        >
          Vezi serviciile
        </Button>
      </Container>
    </Box>
  );
}
