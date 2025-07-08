import {useLocation} from "react-router-dom";
// @mui

import {
  Link,
  Stack,
  Divider,
  Container,
  Typography,
  IconButton,
  Unstable_Grid2 as Grid,
} from "@mui/material";
// hooks
import useResponsive from "../../../../src/hooks/useResponsive";
// _mock
import {_socials} from "../../../../src/_mock/assets/text";
// components
import Logo from "../../../../src/components/logo";
import Iconify from "../../../../src/components/iconify";
//
import {pageLinks, footerMobileNav} from "../nav/config-navigation";
import ListDesktop from "./ListDesktop";
import ListMobile from "./ListMobile";
// ----------------------------------------------------------------------

export default function Footer() {
  const isMdUp = useResponsive("up", "md");

  const {pathname} = useLocation();

  const mobileList = footerMobileNav.find(i => i.title === "Pages")?.children || [];

  const desktopList = pageLinks.sort(
    (listA, listB) => Number(listA.order) - Number(listB.order)
  );

  const renderLists = isMdUp ? desktopList : mobileList;

  const isHome = pathname === "/" || pathname === '/company';

  const simpleFooter = (
    <Container sx={{py: 8, textAlign: "center"}}>
      <Logo single />

      <Typography
        variant="caption"
        component="div"
        sx={{color: "text.secondary"}}
      >
        © 2025. Toate drepturile rezervate.
      </Typography>
    </Container>
  );

  const mainFooter = (
    <>
      <Divider />

      <Container
        sx={{
          overflow: "hidden",
          py: {xs: 8, md: 10},
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: {xs: "column", md: "row"},
          }}
        >
          <Grid xs={12} md={4}>
            <Stack spacing={{xs: 3, md: 5}} sx={{flexGrow: 1}}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />
                <Typography variant="body2" sx={{color: "text.secondary"}}>
                  Dacă ai vreo nelămurire, nu ezita să ne contactezi la{" "}
                  <em style={{fontStyle: "italic"}}>contact@cadastru.ro</em>
                  <br /> sau pe rețelele de socializare!
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center">
                {isMdUp ? (
                  renderLists.map(list => (
                    <ListDesktop key={list.subheader} list={list} />
                  ))
                ) : (
                  <Stack spacing={1.5}>
                    {renderLists.map(list => (
                      <ListMobile key={list.subheader} list={list} />
                    ))}
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <Stack spacing={2}>
              <Typography variant="h6">Social</Typography>
              <Stack direction="row" alignItems="center">
                {_socials.map(social => (
                  <IconButton key={social.value} color="primary">
                    <Iconify icon={social.icon} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Container>
      </Container>

      <Divider />
      <Container>
        <Stack
          spacing={2.5}
          direction={{xs: "column", md: "row"}}
          justifyContent="space-between"
          sx={{py: 3, textAlign: "center"}}
        >
          <Typography variant="caption" sx={{color: "text.secondary"}}>
            © 2025. Toate drepturile rezervate.
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="caption" sx={{color: "text.secondary"}}>
              Ajutor
            </Link>

            <Link variant="caption" sx={{color: "text.secondary"}}>
              Termeni si condiții
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <footer>{isHome ? simpleFooter : mainFooter}</footer>;
  // return <footer>{mainFooter}</footer>;
}
