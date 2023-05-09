import PropTypes from 'prop-types';
import { Typography, Paper, Box, Stack, IconButton } from '@mui/material';
// components
import Iconify from '../iconify/Iconify';

// ----------------------------------------------------------------------

export default function MapPopup({ office, companyName, onClose, lat, lng }) {
  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <Paper
      sx={{ width: 220, overflow: 'hidden', borderRadius: 1.5, mt: 2, ml: 2, position: 'relative' }}
    >
      <Box sx={{ position: 'absolute', right: 4, top: 4, zIndex: 9 }}>
        <IconButton size="small" onClick={handleClose}>
          <Iconify
            icon="carbon:close-filled"
            sx={{
              opacity: 0.48,
              color: 'common.white',
              '&:hover': { opacity: 1 },
              ...(!office.photo && {
                color: 'text.disabled',
              }),
            }}
          />
        </IconButton>
      </Box>


      <Stack
        spacing={1}
        sx={{
          p: 1.5,
          wordBreak: 'break-all',
          ...(!office.photo && {
            p: 2,
            pr: 3.5,
          }),
        }}
      >
        

        {companyName && (
          <Typography component="p" variant="caption">
            {companyName}
          </Typography>
        )}

        {office.email && (
          <Stack direction="row" alignItems="flex-start" sx={{ typography: 'caption' }}>
            <Iconify icon="carbon:email" width={18} sx={{ mr: 0.5 }} />
            {office.email}
          </Stack>
        )}

        {office.phoneNumber && (
          <Stack direction="row" alignItems="flex-start" sx={{ typography: 'caption' }}>
            <Iconify icon="carbon:phone" width={18} sx={{ mr: 0.5 }} />
            {office.phoneNumber}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

MapPopup.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  office: PropTypes.shape({
    address: PropTypes.string,
    country: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    photo: PropTypes.string,
  }),
  onClose: PropTypes.func,
};
