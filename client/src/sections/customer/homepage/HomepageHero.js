import {useState} from "react";
// @mui
import {styled, alpha} from "@mui/material/styles";
import {
  Box,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
// utils
import {bgGradient} from "../../../utils/cssStyles";
import {fShortenNumber} from "../../../utils/formatNumber";
// _mock

// hooks
import useResponsive from "../../../hooks/useResponsive";
// assets
import ServicesHeroIllustration from "../../../assets/illustrations/ServicesHeroIllustration";
// components
import Iconify from "../../../components/iconify/Iconify";
//
import  ServiceFilterKeyword  from '../service/filters/components/ServiceFilterKeyword';
import  ServiceFilterLocations  from '../service/filters/components/ServiceFilterLocations';

import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledRoot = styled(Stack)(({theme}) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: "/assets/background/overlay_2.jpg",
  }),
  overflow: "hidden",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("md")]: {
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: theme.spacing(15),
  },
}));

const StyledBar = styled(Stack)(({theme}) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.up("md")]: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

// ----------------------------------------------------------------------

export default function HomepageHero() {
  const isMdUp = useResponsive("up", "md");

  const [filters, setFilters] = useState({
    filterKeyword: null,
    filterLocation: null,
  });

  const navigate = useNavigate();

  const handleChangeKeyword = keyword => {
    setFilters({
      ...filters,
      filterKeyword: keyword,
    });
  };

  const handleChangeLocation = keyword => {
    setFilters({
      ...filters,
      filterLocation: keyword,
    });

  };

  const handleSearchButton = () => {
    navigate('/services', {state: {filters}})
  }

  return (
    <StyledRoot>
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid xs={12} md={6} lg={5}>
            <Stack
              spacing={5}
              sx={{
                textAlign: {xs: "center", md: "unset"},
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h1" sx={{color: "common.white"}}>
                  Alege
                  <Box component="span" sx={{color: "primary.main"}}>
                    {` expertul `}
                  </Box>
                  tău topograf!
                </Typography>

                <Typography sx={{color: "grey.500"}}>
                  Completează formularul de mai jos și vei vedea ofertele partenerilor autorizați. Intră în legătură cu prestatorul de servicii funciare preferat.
                </Typography>
              </Stack>

              <StyledBar spacing={{xs: 1, md: 0}}>
                <ServiceFilterKeyword
                  filterKeyword={filters.filterKeyword}
                  onChangeKeyword={handleChangeKeyword}
                  sx={{
                    bgcolor: 'transparent',
                    '&:hover, &.Mui-focused': { bgcolor: 'transparent' },
                  }}
                />

                {isMdUp && <Divider orientation="vertical" sx={{height: 24}} />}

                <ServiceFilterLocations
                  filterLocation={filters.filterLocation}
                  onChangeLocation={handleChangeLocation}
                  sx={{
                    bgcolor: 'transparent',
                    '&:hover, &.Mui-focused': { bgcolor: 'transparent' },
                  }}
                />

                <Button
                  size="large"
                  variant="contained"
                  onClick={handleSearchButton}
                  sx={{
                    px: 0,
                    minWidth: {xs: 1, md: 48},
                  }}
                >
                  <Iconify icon="carbon:search" width={24} />
                </Button>
              </StyledBar>

              <SummarySection />
            </Stack>
          </Grid>

          {isMdUp && (
            <Grid xs={12} md={6} lg={6}>
              <ServicesHeroIllustration />
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

const DividerStyle = (
  <Divider orientation="vertical" flexItem sx={{borderStyle: "dashed"}} />
);

// ----------------------------------------------------------------------

function SummarySection() {
  return (
    <Stack
      spacing={3}
      direction={{xs: "column", md: "row"}}
      divider={DividerStyle}
      sx={{pt: {md: 5}}}
    >
      <Stack spacing={{md: 3}} direction="row" divider={DividerStyle}>
        <Stack
          spacing={0.5}
          sx={{color: "common.white", width: {xs: 0.5, md: "auto"}}}
        >
          <Typography variant="h4">{fShortenNumber(100)}+</Typography>
          <Typography variant="body2" sx={{opacity: 0.48}}>
            Oferte
          </Typography>
        </Stack>

        <Stack
          spacing={0.5}
          sx={{color: "common.white", width: {xs: 0.5, md: "auto"}}}
        >
          <Typography variant="h4">{fShortenNumber(100)}+</Typography>
          <Typography variant="body2" sx={{opacity: 0.48}}>
            Contracte incheiate
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={{md: 3}} direction="row" divider={DividerStyle}>
        <Stack
          spacing={0.5}
          sx={{color: "common.white", width: {xs: 0.5, md: "auto"}}}
        >
          <Typography variant="h4">{fShortenNumber(5000)}+</Typography>
          <Typography variant="body2" sx={{opacity: 0.48}}>
            Clienti
          </Typography>
        </Stack>

        <Stack
          spacing={0.5}
          sx={{color: "common.white", width: {xs: 0.5, md: "auto"}}}
        >
          <Typography variant="h4">{fShortenNumber(150)}+</Typography>
          <Typography variant="body2" sx={{opacity: 0.48}}>
            Prestatori
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
