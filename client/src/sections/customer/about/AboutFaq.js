import {useState} from "react";
import {
  Stack,
  Container,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import {_faqs, _answers} from "../../../_mock/assets/text";
import Iconify from "../../../components/iconify";

export default function AboutFaq() {
  const [expanded, setExpanded] = useState(false);

  const handleChangeExpanded = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      sx={{
        pt: {xs: 5, md: 10},
        pb: {xs: 10, md: 15},
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid xs={12} md={16} lg={16}>
          <Stack
            spacing={2}
            sx={{mb: 5, textAlign: {xs: "center", md: "center"}}}
          >
            <Typography variant="h2">Întrebări frecvente</Typography>
          </Stack>

          {_faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === faq}
              onChange={handleChangeExpanded(faq)}
            >
              <AccordionSummary>
                <Typography variant="h5" sx={{flexGrow: 1}}>
                  {faq}
                </Typography>
                <Iconify
                  width={24}
                  icon={expanded === faq ? "carbon:subtract" : "carbon:add"}
                />
              </AccordionSummary>

              <AccordionDetails>{_answers[index]}</AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
