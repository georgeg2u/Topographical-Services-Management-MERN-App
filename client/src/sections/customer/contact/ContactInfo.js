import {Typography, Stack, Container, Link, IconButton} from "@mui/material";
import {_socials} from "../../../../src/_mock/assets/text";
import Iconify from "../../../../src/components/iconify";

export default function ContactInfo() {
  return (
    <Container
      sx={{
        pt: 5,
        pb: {xs: 5, md: 10},
        textAlign: {xs: "center", md: "left"},
      }}
    >
      <Typography variant="h3">
        Ai o problemă? Nu ezita să ne contactezi!
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mt: 2,
          mb: {xs: 3, md: 5},
        }}
      >{`Ne-ar face plăcere să te putem ajuta.`}</Typography>

      <Stack spacing={{xs: 3, md: 5}} direction={{xs: "column", md: "row"}}>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Email</Typography>

          <Link
            variant="body2"
            color="inherit"
            href="mailto:contact@cadastru.ro"
          >
            contact@cadastru.ro
          </Link>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Telefon</Typography>

          <Typography variant="body2">0727 200 201</Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle2">Adresa</Typography>

          <Typography variant="body2">
            București, Sector 3, Bvd. Unirii, Nr. 1
          </Typography>
        </Stack>

        <Stack spacing={1} alignItems={{xs: "center", md: "flex-start"}}>
          <Typography variant="subtitle2">Social-Media</Typography>

          <Stack direction="row">
            {_socials.map(social => (
              <IconButton key={social.value} color="inherit">
                <Iconify icon={social.icon} />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
