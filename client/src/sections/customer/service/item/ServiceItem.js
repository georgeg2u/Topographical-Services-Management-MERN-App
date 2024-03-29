import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Card,
  Link,
  Stack,
  Divider,
  Checkbox,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
// utils
import { fDate } from '../../../../../src/utils/formatTime';
// components
import Image from '../../../../../src/components/image';
import Iconify from '../../../../../src/components/iconify';
import TextMaxLine from '../../../../components/text-max-line';
import CustomerDataContext from '../../../../context/CustomerDataContext';

// ----------------------------------------------------------------------

export default function ServiceItem({ job }) {
  const {
    _id,
    title,
    duration,
    price,
    location,
    createdAt,
    companyName,
    companyLogo,
  } = job;

  const [favorite, setFavorite] = useState(false);

  

  const durationHandler = (duration) => {
      let selectedDuration = duration
    if (selectedDuration === "1") {
      selectedDuration = "O zi";
    } else {
      selectedDuration = selectedDuration + " zile"
    }
    return selectedDuration
  }

  const {
    email: contextEmail,
  } = useContext(CustomerDataContext);

  useEffect(() => {
    async function fetchContractData() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/contracts/${_id}`
        );
        if (!response.ok) {
          return;
        }
        const { status, customerEmail } = await response.json();
        if (status === "accepted" && customerEmail === contextEmail) {
          setFavorite(true);
        }
      } catch (error) {
        throw new Error("Could not fetch details for selected service");
      }
    }
    fetchContractData();
  }, [_id,contextEmail]);

  return (
    <Card
      sx={{
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Checkbox
        color="error"
        checked={favorite}
        icon={<Iconify icon="carbon:favorite" />}
        checkedIcon={<Iconify icon="carbon:favorite-filled" />}
        sx={{ position: 'absolute', right: 16, top: 16 }}
      />

      <Stack sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2.5}>
          <Image
            alt={companyName}
            src={companyLogo}
            sx={{ width: 48, height: 48, borderRadius: 1 }}
          />
        </Stack>

        <Stack spacing={0.5} sx={{ mt: 3, mb: 2 }}>
          <Link component={RouterLink} to={`/services/${job._id}`} color="inherit">
            <TextMaxLine variant="h6" line={1}>
              {title}
            </TextMaxLine>
          </Link>

          <Typography variant="body2" sx={{ color: 'info.main' }}>
            {companyName}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Iconify icon="carbon:location" width={18} sx={{ mr: 0.5 }} />
            {location}
          </Stack>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          Data postării: {fDate(createdAt)}
        </Typography>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      <Grid
        container
        spacing={1.5}
        sx={{
          p: 3,
          pt: 0,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
        }}
      >
        

        <Grid xs={6}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:time" sx={{ mr: 1 }} />
            {typeof duration=='string' ?  durationHandler(duration) : '-'}
          </Stack>
        </Grid>

        <Grid xs={6}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:money" sx={{ mr: 1 }} />
            { typeof price =='number' ? `${price} LEI` : '-'} 
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

ServiceItem.propTypes = {
  job: PropTypes.shape({
    companyLogo: PropTypes.string,
    companyName: PropTypes.string,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    experience: PropTypes.number,
    favorited: PropTypes.bool,
    isUrgent: PropTypes.bool,
    level: PropTypes.string,
    location: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    slug: PropTypes.string,
    type: PropTypes.string,
  }),
};
