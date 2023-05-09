import {useState} from "react";
// @mui
import {Stack, Button, Drawer, Box} from "@mui/material";
// config
import {NAV} from "../../../../../src/config-global";
// hooks
import useResponsive from "../../../../../src/hooks/useResponsive";
// components
import Iconify from "../../../../../src/components/iconify";
//
import {
  ServiceFilterPrice,
  ServiceFilterKeyword,
  ServiceFilterLocations,
} from "./components";

// ----------------------------------------------------------------------

const defaultValues = {
  filterKeyword: null,
  filterLocation: null,
  filterPrice: [0, 2500],
};

export default function ServiceFilters({onFiltersSubmit}) {
  const isMdUp = useResponsive("up", "md");

  const [mobileOpen, setMobileOpen] = useState(false);

  const [filters, setFilters] = useState(defaultValues);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const handleChangeKeyword = keyword => {
    setFilters({
      ...filters,
      filterKeyword: keyword,
    });
  };

  const handleChangeLocation = location => {
    setFilters({
      ...filters,
      filterLocation: location,
    });
  };

  const handleChangePrice = (event, newValue) => {
    setFilters({
      ...filters,
      filterPrice: newValue,
    });
  };

  const onReset = () => {
    setFilters({...defaultValues});
  };

  const onSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    onFiltersSubmit(filters);
  };

  const renderFilters = (
    <>
      <Stack
        spacing={2.5}
        direction={{xs: "column", md: "row"}}
        alignItems="center"
      >
        <ServiceFilterKeyword
          filterKeyword={filters.filterKeyword}
          onChangeKeyword={handleChangeKeyword}
        />

        <ServiceFilterLocations
          filterLocation={filters.filterLocation}
          onChangeLocation={handleChangeLocation}
        />
        {isMdUp && (
          <Button
            size="large"
            variant="contained"
            color="inherit"
            onClick={onReset}
            sx={{px: 0, minWidth: {md: 48}}}
          >
            <Iconify icon="carbon:delete" width={24} />
          </Button>
        )}

        {isMdUp && (
          <Button
            size="large"
            variant="contained"
            color="inherit"
            onClick={onSubmit}
            sx={{px: 0, minWidth: {md: 48}}}
          >
            <Iconify icon="carbon:filter" width={24} />
          </Button>
        )}
      </Stack>

      <Stack
        direction={{xs: "column", md: "row"}}
        spacing={{xs: 2.5, md: 1}}
        sx={{mt: 2.5}}
      >
        <ServiceFilterPrice
          filterPrice={filters.filterPrice}
          onChangePrice={handleChangePrice}
        />
      </Stack>

      <Stack
        spacing={2.5}
        direction={{xs: "column", md: "row"}}
        alignItems="center"
      >
        {!isMdUp && (
          <Button
            size="large"
            variant="contained"
            color="inherit"
            onClick={onSubmit}
            startIcon={<Iconify icon="carbon:filter" />}
            sx={{mt: 2.5}}
          >
            Filtrează
          </Button>
        )}

        {!isMdUp && (
          <Button
            size="large"
            variant="contained"
            color="inherit"
            onClick={onReset}
            startIcon={<Iconify icon="carbon:delete" />}
            sx={{mt: 2.5}}
          >
            Sterge Filtre
          </Button>
        )}
      </Stack>
    </>
  );

  if (isMdUp) {
    return <Box sx={{py: 5}}>{renderFilters}</Box>;
  }

  return (
    <>
      <Stack alignItems="flex-end" sx={{py: 3}}>
        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={handleMobileOpen}
        >
          Filters
        </Button>
      </Stack>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileClose}
        ModalProps={{keepMounted: true}}
        PaperProps={{
          sx: {pt: 5, px: 3, width: NAV.W_DRAWER},
        }}
      >
        {renderFilters}
      </Drawer>
    </>
  );
}
