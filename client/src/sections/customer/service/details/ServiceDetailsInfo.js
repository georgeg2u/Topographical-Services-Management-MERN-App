import PropTypes from 'prop-types';
// @mui
import { Stack, Typography, Card } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime'
// components
import Iconify from '../../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function ServiceDetailsInfo({ serviceData }) {
  const { createdAt, price, location, duration } = serviceData;

  const durationHandler = (duration) => {
    let selectedDuration = duration
  if (selectedDuration === "1") {
    selectedDuration = "O zi";
  } else {
    selectedDuration = selectedDuration + " zile"
  }
  return selectedDuration
}

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Iconify icon="carbon:calendar" width={24} />
          <Stack>
            <Typography variant="subtitle2"> Data postării </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {fDate(createdAt)}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Iconify icon="carbon:money" width={24} />
          <Stack>
            <Typography variant="subtitle2"> Prețul serviciului </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${price} Lei`}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Iconify icon="carbon:location" width={24} />
          <Stack>
            <Typography variant="subtitle2"> Locația </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {location}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Iconify icon="carbon:time" width={24} />
          <Stack>
            <Typography variant="subtitle2"> Durata </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {durationHandler(duration)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

ServiceDetailsInfo.propTypes = {
  job: PropTypes.shape({
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    type: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
