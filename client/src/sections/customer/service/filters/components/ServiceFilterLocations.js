import PropTypes from 'prop-types';
// @mui
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
// assets
import { counties } from '../../../../../assets/data/counties';



import Iconify from '../../../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function ServiceFilterLocations({ filterLocation, onChangeLocation, sx }) {
  return (
    <Autocomplete
      sx={{ width: 1 }}
      options={counties}
      getOptionLabel={(option) => option}
      value={filterLocation}
      onChange={(event, value) => onChangeLocation(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          variant="filled"
          placeholder="Județe"
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Iconify width={24} icon="carbon:location" sx={{ color: 'text.disabled', mr: 1 }} />
              </InputAdornment>
            ),
            sx: { pb: 1, ...sx },
          }}
        />
      )}
    />
  );
}

ServiceFilterLocations.propTypes = {
  filterLocation: PropTypes.string,
  onChangeLocation: PropTypes.func,
  sx: PropTypes.object,
};
