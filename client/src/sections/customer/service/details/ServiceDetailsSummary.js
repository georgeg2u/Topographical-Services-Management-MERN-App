import PropTypes from "prop-types";
// @mui
import {Typography, Stack} from "@mui/material";
// components
import Markdown from "../../../../components/markdown/Markdown";
//
import ContactMap from "../../../../components/map";

// ----------------------------------------------------------------------

export default function ServiceDetailsSummary({serviceData}) {
  const {locationMap, content, documents, benefits, companyName} = serviceData;

  

  const serviceDescription = `<h5 id="one">Descrierea serviciului</h5>
      <p>${content}</p>
      <h5 id="two">Documente necesare</h5>
      <ul> 
      ${documents.map(document => "<li>" + document + "</li>").join("")} 
      </ul>
      <h5 id="three">Beneficii</h5>
      <ul>
      ${benefits.map((benefit) => "<li>" + benefit + "</li>").join("")} 
      </ul>
      `;

  return (
    <Stack spacing={5}>
      <Markdown content={serviceDescription} />

      {/* -- Location Map --- */}
      <div>
        <Typography variant="h5" sx={{mb: 3}}>
          Location
        </Typography>

        <ContactMap
          offices={locationMap}
          companyName={companyName}
          sx={{borderRadius: 2}}
        />
      </div>
    </Stack>
  );
}

ServiceDetailsSummary.propTypes = {
  job: PropTypes.shape({
    content: PropTypes.string,
    locationMap: PropTypes.array,
    otherBenefits: PropTypes.array,
    skills: PropTypes.array,
  }),
};
