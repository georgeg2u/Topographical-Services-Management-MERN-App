// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import CountUp from '../../../components/count-up';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'warning', 'success'];

const SUMMARY = [
  { title: 'Oferte', total: 175, icon: 'mdi:offer' },
  { title: 'Contracte incheiate', total: 3527, icon: 'clarity:contract-line' },
  { title: 'Clienti', total: 2566, icon: 'mdi:user-group' },
  { title: 'Prestatori', total: 35, icon: 'mdi:briefcase-user' },
];

// ----------------------------------------------------------------------

const StyledIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ color, theme }) => ({
  width: 120,
  height: 120,
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  color: theme.palette[color].darker,
  border: `dashed 2px ${alpha(theme.palette[color].main, 0.24)}`,
  '&:before': {
    zIndex: 8,
    content: '""',
    borderRadius: '50%',
    position: 'absolute',
    width: 'calc(100% - 48px)',
    height: 'calc(100% - 48px)',
    background: `conic-gradient(from 0deg at 50% 50%, ${theme.palette[color].main} 0deg, ${theme.palette[color].light} 360deg)`,
  },
  '& svg': {
    zIndex: 9,
  },
}));

// ----------------------------------------------------------------------

export default function About() {
  const isMdUp = useResponsive('up', 'md');

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: 10,
      }}
    >
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        {isMdUp && (
          <Grid xs={16} md={6} lg={5}>
            <Image alt="teams" src="/assets/illustrations/topografi.jpg" style={{ borderRadius: '10%' }} />
          </Grid>
        )}

        <Grid
          xs={12}
          md={6}
          lg={6}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h3">Cum funcționează site-ul?</Typography>
            
          <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
            Platforma vine în ajutorul persoanelor care sunt în căutare de prestatori de servicii funciare,
            făcând posibilă colaborarea dintre cele două părți în vederea finalizării serviciului dorit.
            <br />
            <br />
            Aplicația se adresează atât utilizatorului pus în postura de client 
            cât și a celui reprezentat de compania care prestează serviciile. 
            Funcționalitățile oferite diferă în funcție de tipul contului cu care este autentificat utilizatorul.
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 10,
          textAlign: 'center',
          display: 'grid',
          gap: { xs: 5, md: 8 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {SUMMARY.map((value, index) => (
          <div key={value.title}>
            <StyledIcon color={COLORS[index]}>
              <Iconify icon={value.icon} width={48} />
            </StyledIcon>

            <Typography variant="h3" sx={{ mt: 2, mb: 1 }}>
              <CountUp
                start={value.total / 5}
                end={value.total}
                formattingFn={(newValue) => fShortenNumber(newValue)}
              />
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>{value.title}</Typography>
          </div>
        ))}
      </Box>
    </Container>
  );
}
