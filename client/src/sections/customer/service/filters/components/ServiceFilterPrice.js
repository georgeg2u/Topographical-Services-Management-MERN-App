import PropTypes from "prop-types";
import {useState} from "react";
// @mui
import {Slider, FormControl, Typography, Popover, Select} from "@mui/material";
//
import {inputStyle} from "../styles";

// ----------------------------------------------------------------------

export default function ServiceFilterPrice({filterPrice, onChangePrice}) {
  const [open, setOpen] = useState(null);

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const minPrice = filterPrice[0];

  const maxPrice = filterPrice[1];

  return (
    <>
      <FormControl
        fullWidth
        hiddenLabel
        variant="filled"
        onClick={handleOpen}
        sx={inputStyle}
      >
        <Select
          open={false}
          displayEmpty
          value=""
          renderValue={() => {
            if (minPrice === 0 && maxPrice === 2500) {
              return (
                <Typography variant="body2" sx={{color: "text.disabled"}}>
                  Interval preț
                </Typography>
              );
            }
            return (
              <Typography
                variant="subtitle2"
                component="span"
              >{`${minPrice} - ${maxPrice}`}</Typography>
            );
          }}
        />
      </FormControl>

      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{vertical: "center", horizontal: "center"}}
        transformOrigin={{vertical: "center", horizontal: "center"}}
        PaperProps={{
          sx: {
            pt: 3,
            pb: 1,
            px: 5,
            width: 1,
            maxWidth: 360,
            overflow: "unset",
          },
        }}
      >
        <Typography
          variant="overline"
          sx={{mb: 8, display: "block", color: "text.disabled"}}
        >
          Valoare per serviciu
        </Typography>

        <Slider
          marks
          step={100}
          min={0}
          max={2500}
          valueLabelDisplay="on"
          valueLabelFormat={value => `${value} LEI`}
          value={filterPrice}
          onChange={onChangePrice}
        />
      </Popover>
    </>
  );
}

ServiceFilterPrice.propTypes = {
  filterPrice: PropTypes.array,
  onChangeSalary: PropTypes.func,
};
