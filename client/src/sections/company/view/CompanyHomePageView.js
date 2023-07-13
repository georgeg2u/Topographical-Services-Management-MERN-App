import {Box} from "@mui/material";

import ServicesCards from "../homepage/ServicesCards";

const CompanyHomePageView = () => {
  return (
    <Box
      sx={{
        display: {xs: "flex", md: "grid"},
        gridTemplateColumns: "repeat(3,1fr)",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
        
      }}
    >
      <ServicesCards />
    </Box>
  );
};

export default CompanyHomePageView;
