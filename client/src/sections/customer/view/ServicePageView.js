import {useState, useEffect} from "react";
// @mui
import {Stack, Container, Unstable_Grid2 as Grid} from "@mui/material";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import LoadingScreen from "../../../components/loading-screen/LoadingScreen";

import {
  ServiceDetailsHero,
  ServiceDetailsInfo,
  ServiceDetailsSummary,
  //   ServiceDetailsCompanySimilar,
} from "../service/details/";
import { CustomerDataProvider } from "../../../context/CustomerDataContext";


// ----------------------------------------------------------------------

export default function ServicePageView({data}) {
  const isMdUp = useResponsive("up", "md");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };
    fakeLoading();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <CustomerDataProvider >


        <ServiceDetailsHero serviceData={data} />

        <Container
          sx={{
            overflow: "hidden",
            pt: {xs: 5, md: 10},
            pb: 10,
          }}
        >
          <Grid container spacing={{xs: 5, md: 8}}>
            {!isMdUp && (
              <Grid xs={12} md={5} lg={4}>
                <ServiceDetailsInfo serviceData={data} />
              </Grid>
            )}

            <Grid xs={12} md={7} lg={8}>
              <ServiceDetailsSummary serviceData={data} />
            </Grid>

            <Grid xs={12} md={5} lg={4}>
              <Stack spacing={5}>
                {isMdUp && <ServiceDetailsInfo serviceData={data} />}
              </Stack>
            </Grid>
          </Grid>
        </Container>
        </CustomerDataProvider>
    </>
  );
}
