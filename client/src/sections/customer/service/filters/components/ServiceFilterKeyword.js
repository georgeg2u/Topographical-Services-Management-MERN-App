import PropTypes from 'prop-types';
// @mui
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
// _mock
import { serviceTitle } from '../../../../../_mock/assets';
// components
import Iconify from '../../../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function ServiceFilterKeyword({ filterKeyword, onChangeKeyword, sx }) {
  return (
    <Autocomplete
      sx={{ width: 1 }}
      options={serviceTitle}
      getOptionLabel={(option) => option}
      value={filterKeyword}
      onChange={(event, value) => onChangeKeyword(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          variant="filled"
          placeholder="Cuvânt cheie..."
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
            startAdornment: (
              <InputAdornment position="start">
                <Iconify width={24} icon="carbon:search" sx={{ color: 'text.disabled', mr: 1 }} />
              </InputAdornment>
            ),
            sx: { pb: 1, ...sx },
          }}
        />
      )}
    />
  );
}

ServiceFilterKeyword.propTypes = {
  filterKeyword: PropTypes.string,
  onChangeKeyword: PropTypes.func,
  sx: PropTypes.object,
};
